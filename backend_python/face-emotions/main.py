import os
import cv2
import logging
import argparse
import numpy as np
import mxnet as mx
from pathlib import Path
import model.emotion.detectemotion as ime
from mxnet_moon.lightened_moon import lightened_moon_feature
import base64

logger = logging.getLogger()
logger.setLevel(logging.INFO)

from config import get_input_type, get_output_type
from ontology_dc8f06af066e4a7880a5938933236037.face_emotion import FaceEmotion

# Load path from .env
faceProto = "./model/facenet/opencv_face_detector.pbtxt"
faceModel = "./model/facenet/opencv_face_detector_uint8.pb"
ageProto = "./model/age/age_deploy.prototxt"
ageModel = "./model/age/age_net.caffemodel"
genderProto = "./model/gender/gender_deploy.prototxt"
genderModel = "./model/gender/gender_net.caffemodel"

# Load face detection model
faceNet = cv2.dnn.readNet(faceModel, faceProto)
# Load age detection model
ageNet = cv2.dnn.readNet(ageModel, ageProto)
# Load gender detection model
genderNet = cv2.dnn.readNet(genderModel, genderProto)
# create instance for emotion detection
ed = ime.Emotional()
parser = argparse.ArgumentParser()
parser.add_argument('--gpus', type=str)
parser.add_argument('--size', type=int, default=128)
parser.add_argument('--pad', type=float, nargs='+')
parser.add_argument('--model-load-prefix', dest='model_load_prefix', type=str,
                    default='model/lightened_moon/lightened_moon_fuse')
args = parser.parse_args()
symbol = lightened_moon_feature(num_classes=40, use_fuse=True)
devs = mx.cpu() if args.gpus is None else [mx.gpu(int(i)) for i in args.gpus.split(',')]
_, arg_params, aux_params = mx.model.load_checkpoint('model/lightened_moon/lightened_moon_fuse', 82)


def getFaceBox(net, image, conf_threshold=0.7):
    image = image.copy()
    imageHeight = image.shape[0]
    imageWidth = image.shape[1]
    blob = cv2.dnn.blobFromImage(image, 1.0, (300, 300), [104, 117, 123], True, False)
    net.setInput(blob)
    detections = net.forward()
    faceBoxes = []
    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > conf_threshold:
            x1 = int(detections[0, 0, i, 3] * imageWidth)
            y1 = int(detections[0, 0, i, 4] * imageHeight)
            x2 = int(detections[0, 0, i, 5] * imageWidth)
            y2 = int(detections[0, 0, i, 6] * imageHeight)
            faceBoxes.append([x1, y1, x2, y2])
            cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), int(round(imageHeight / 150)), 8)
    return faceBoxes


def genderAge(image, faceBox):
    MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
    ageList = ['(0-2)', '(4-6)', '(8-12)', '(15-20)', '(25-32)', '(38-43)', '(48-53)', '(60-100)']
    genderList = ['Male', 'Female']

    padding = 20
    face = image[max(0, faceBox[1] - padding):
                 min(faceBox[3] + padding, image.shape[0] - 1), max(0, faceBox[0] - padding)
                                                                :min(faceBox[2] + padding, image.shape[1] - 1)]
    blob = cv2.dnn.blobFromImage(face, 1.0, (227, 227), MODEL_MEAN_VALUES, swapRB=False)

    # Predict the gender
    genderNet.setInput(blob)
    genderPreds = genderNet.forward()
    gender = genderList[genderPreds[0].argmax()]
    # Predict the age
    ageNet.setInput(blob)
    agePreds = ageNet.forward()
    age = ageList[agePreds[0].argmax()]
    # Return
    return gender, age


# Callback function representing the main execution entry point
def execute(_input: get_input_type()) -> get_output_type():
    imageData = _input.image.replace('data:image/jpeg;base64,', '')
    im_bytes = base64.b64decode(imageData)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)

    with open("faceImgSave.jpg", "wb") as fh:
        fh.write(im_bytes)
    savedImage = str("faceImgSave.jpg")
    image = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)

    if len(image):
        faceBoxes = getFaceBox(faceNet, image)
        if not faceBoxes:
            print("no face detected")

        if faceBoxes:
            for faceBox in faceBoxes:
                gender, age = genderAge(image, faceBox)
                emotionList = ed.emotionalDet(savedImage, faceBox)

                # Detect the facial attributes using mxnet
                left = faceBox[0]
                width = faceBox[2] - faceBox[0]
                top = faceBox[1]
                height = faceBox[3] - faceBox[1]
                right = faceBox[2]
                bottom = faceBox[3]

                gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
                pad = [0.25, 0.25, 0.25, 0.25] if args.pad is None else args.pad
                left = int(max(0, left - width * float(pad[0])))
                top = int(max(0, top - height * float(pad[1])))
                right = int(min(gray.shape[1], right + width * float(pad[2])))
                bottom = int(min(gray.shape[0], bottom + height * float(pad[3])))
                gray = gray[left:right, top:bottom]
                # resizing image and increasing the image size
                gray = cv2.resize(gray, (args.size, args.size)) / 255.0
                img = np.expand_dims(np.expand_dims(gray, axis=0), axis=0)
                # get image parameter from mxnet
                arg_params['data'] = mx.nd.array(img, devs)
                exector = symbol.bind(devs, arg_params, args_grad=None, grad_req="null", aux_states=aux_params)
                exector.forward(is_train=False)
                exector.outputs[0].wait_to_read()
                output = exector.outputs[0].asnumpy()
                # 40 facial attributes
                text = ["5_o_Clock_Shadow", "Arched_Eyebrows", "Attractive", "Bags_Under_Eyes", "Bald", "Bangs",
                        "Big_Lips", "Big_Nose",
                        "Black_Hair", "Blond_Hair", "Blurry", "Brown_Hair", "Bushy_Eyebrows", "Chubby", "Double_Chin",
                        "Eyeglasses", "Goatee",
                        "Gray_Hair", "Heavy_Makeup", "High_Cheekbones", "Male", "Mouth_Slightly_Open", "Mustache",
                        "Narrow_Eyes", "No_Beard",
                        "Oval_Face", "Pale_Skin", "Pointy_Nose", "Receding_Hairline", "Rosy_Cheeks", "Sideburns",
                        "Smiling", "Straight_Hair",
                        "Wavy_Hair", "Wearing_Earrings", "Wearing_Hat", "Wearing_Lipstick", "Wearing_Necklace",
                        "Wearing_Necktie", "Young"]

                # Predict the results
                pred = np.ones(40)
                # create a list based on the attributes generated.
                attrDict = {}
                detectedAttributeList = []
                for i in range(40):
                    attr = text[i].rjust(20)
                    if output[0][i] < 0:
                        attrDict[attr] = 'No'
                    else:
                        attrDict[attr] = 'Yes'
                        detectedAttributeList.append(text[i])

                features = ''
                index = 0
                separator = ''
                for attribute in detectedAttributeList:
                    if index > 0:
                        separator = ', '
                    features += separator + attribute
                    index += 1

            payload = dict(age=age, gender=gender, emotion=emotionList, features=features)

        else:
            payload = dict(age=None, gender=None, emotion=None, features=None)
    else:
        payload = dict(age=None, gender=None, emotion=None, features=None)

    return FaceEmotion(payload)
