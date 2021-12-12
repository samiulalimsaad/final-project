import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import Image from "next/image";
import React, { Fragment, memo, useCallback, useState } from "react";
import { GetState } from "../../state/stateProvider";
import { CLOSE_COVER_IMAGE, PROGRESS } from "../../state/types";
import { NODE_SERVER } from "../../util";

const UploadCoverPic = () => {
    const { uploadCoverPic, dispatch, uid } = GetState();
    const [imageState, setImageState] = useState<File>();
    const [tempImage, setTempImage] = useState("");
    const storage = getStorage();

    const selectImage = (e: any) => {
        setTempImage(URL.createObjectURL(e.target.files[0]));
        setImageState(e!.target!.files[0]!);
    };

    const closeModal = useCallback(() => {
        dispatch({ type: CLOSE_COVER_IMAGE });
    }, [dispatch]);

    const uploadPost = useCallback(async () => {
        if (imageState?.name) {
            const storageRef = ref(
                storage,
                `coverPic/${uid}/${imageState!.name.replace(
                    imageState!.name,
                    Date.now().toString()
                )}`
            );
            const uploadTask = uploadBytesResumable(storageRef, imageState!);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    dispatch({ type: PROGRESS, payload: { progress } });
                    switch (snapshot.state) {
                        case "paused":
                            alert("Upload is paused");
                            break;
                    }
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => {
                            console.log("File available at", downloadURL, uid);
                            try {
                                const post = await axios.put(
                                    NODE_SERVER(`/info/${uid}`),
                                    {
                                        coverPic: downloadURL,
                                    }
                                );
                                if (post.data.success) {
                                    setImageState(undefined);
                                    closeModal();
                                }
                            } catch (error) {
                                alert(error);
                            }
                        }
                    );
                }
            );
        }
    }, [closeModal, dispatch, imageState, storage, uid]);

    const removeImage = async () => {
        try {
            const post = await axios.put(NODE_SERVER(`/info/${uid}`), {
                coverPic: null,
            });
            if (post.data.success) {
                setImageState(undefined);
                closeModal();
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Transition appear show={uploadCoverPic?.isShowing} as={Fragment}>
            <div
                className={`absolute inset-0 backdrop-blur-[1px] bg-gray-900/50 overflow-y-auto h-screen w-screen z-[51] ${
                    !uploadCoverPic?.isShowing && "hidden"
                }`}
            >
                <Dialog
                    as="div"
                    className="fixed inset-0 z-[51] overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen min-w-full px-4 text-center flex items-center justify-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-0"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-0"
                        >
                            <div className="flex flex-col w-1/3 h-[35rem] p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-xl font-medium leading-6 text-gray-900 flex items-center justify-between bg-white"
                                >
                                    <div className="w-1/3 flex justify-center items-center">
                                        <label
                                            htmlFor="file"
                                            className="flex flex-col justify-center py-2 "
                                        >
                                            <span className="py-2 px-4 transition ease-in-out duration-500 rounded-lg text-sm font-semibold hover:font-extrabold bg-green-300 text-green-900 hover:bg-green-900 active:bg-green-900 hover:text-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-3 cursor-pointer">
                                                Add new
                                            </span>
                                            <span className="break-all line-clamp-1">
                                                {imageState?.name}
                                            </span>
                                        </label>
                                        <input
                                            type="file"
                                            id="file"
                                            accept="image/*"
                                            onChange={selectImage}
                                            hidden
                                        />
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            className="transition ease-in-out duration-500 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                                            onClick={removeImage}
                                        >
                                            remove
                                        </button>
                                        <button
                                            type="button"
                                            className="transition ease-in-out duration-500 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={uploadPost}
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </Dialog.Title>
                                <div className="relative mt-6 h-full w-full flex justify-center items-center">
                                    <Image
                                        className="object-center object-cover "
                                        src={
                                            tempImage ||
                                            uploadCoverPic?.imageSrc ||
                                            "/userIcon.png"
                                        }
                                        alt="profile image"
                                        layout="fill"
                                    />
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </div>
        </Transition>
    );
};
export default memo(UploadCoverPic);
