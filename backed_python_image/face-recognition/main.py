import base64
import os
import cv2
import face_recognition
import numpy as np

from config import get_input_type, get_output_type
from ontology_dc8f06af066e4a7880a5938933236037.face_output import FaceOutput
from ontology_dc8f06af066e4a7880a5938933236037.face_position import FacePosition

known_face_encodings = []
known_face_names = []

for fileName in os.listdir('images/'):
    known_face_names.append(os.path.splitext(fileName)[0])
    known_face_encodings.append(
        face_recognition.face_encodings(face_recognition.load_image_file('images/' + fileName))[0])


# Callback function representing the main execution entry point
def execute(input_object: get_input_type()) -> get_output_type():
    image = input_object.image.replace('data:image/jpeg;base64,', '')
    image = bytes(image, 'utf-8')
    data = base64.b64decode(image)

    frame = cv2.imdecode(np.frombuffer(data, np.uint8), -1)
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

    # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
    rgb_small_frame = small_frame[:, :, ::-1]

    #####
    face_locations = face_recognition.face_locations(rgb_small_frame)
    face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
    #####
    # face_locations = face_recognition.face_locations(frame)
    # face_encodings = face_recognition.face_encodings(frame, face_locations)

    face_outputs = []
    face_names = []

    for face_encoding in face_encodings:
        # See if the face is a match for the known face(s)
        name = "Unknown"
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)

        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
        best_match_index = np.argmin(face_distances)
        if matches[best_match_index]:
            name = known_face_names[best_match_index]
        face_names.append(name)

    for i in range(0, len(face_locations)):
        # (top, right, bottom, left)
        y = top = face_locations[i][0]
        right = face_locations[i][1]
        bottom = face_locations[i][2]
        x = left = face_locations[i][3]
        width = right - left
        height = bottom - top

        face_outputs.append(FacePosition(
            dict(name=face_names[i],
                 x=x * 4,
                 y=y * 4,
                 height=height * 4,
                 width=width * 4,
                 ))
        )

    output = FaceOutput(dict(faces=face_outputs))
    print(output)

    return output
