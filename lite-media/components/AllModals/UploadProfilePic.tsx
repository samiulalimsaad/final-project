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
import { CLOSE_PROFILE_IMAGE, PROGRESS } from "../../state/types";
import { NODE_SERVER } from "../../util";

const UploadProfilePic = () => {
    const { uploadProfilePic, dispatch, uid } = GetState();
    const [editorState, setEditorState] = useState("");
    const [imageState, setImageState] = useState<File>();
    const storage = getStorage();

    const closeModal = useCallback(() => {
        dispatch({ type: CLOSE_PROFILE_IMAGE });
    }, [dispatch]);

    const uploadPost = useCallback(async () => {
        console.log({ editorState });
        if (imageState?.name) {
            const storageRef = ref(
                storage,
                `profilePic/${uid}/${imageState!.name.replace(
                    imageState!.name,
                    Date.now().toString()
                )}`
            );
            console.log({ storageRef });
            const uploadTask = uploadBytesResumable(storageRef, imageState!);
            console.log({ uploadTask });

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    dispatch({ type: PROGRESS, payload: { progress } });
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    console.log("error", error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => {
                            console.log("File available at", downloadURL, uid);
                            try {
                                const post = await axios.put(
                                    NODE_SERVER(`/info/${uid}`),
                                    {
                                        profilePic: downloadURL,
                                    }
                                );
                                if (post.data.success) {
                                    console.log({ post });
                                    setEditorState("");
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
    }, [closeModal, dispatch, editorState, imageState, storage, uid]);
    console.log("...........object..............");
    return (
        <Transition appear show={uploadProfilePic?.isShowing} as={Fragment}>
            <div
                className={`absolute inset-0 backdrop-blur-[1px] bg-gray-900/50 overflow-y-auto h-screen w-screen z-[51] ${
                    !uploadProfilePic?.isShowing && "hidden"
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
                            <div className="flex flex-col w-1/3 h-96 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-xl font-medium leading-6 text-gray-900 flex items-center justify-between bg-white"
                                >
                                    <>
                                        <label
                                            htmlFor="file"
                                            className="flex items-center py-2 "
                                        >
                                            <span className="flex items-center py-2 px-4 transition ease-in-out duration-500 cursor-pointer rounded-full font-semibold hover:font-extrabold bg-gray-300 text-gray-900 hover:bg-indigo-900 active:bg-indigo-900 hover:text-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3">
                                                Add a Photo
                                            </span>
                                            <span>{imageState?.name}</span>
                                        </label>
                                        <input
                                            type="file"
                                            id="file"
                                            accept="image/*"
                                            onChange={(e: any) =>
                                                setImageState(
                                                    e!.target!.files[0]!
                                                )
                                            }
                                            hidden
                                        />
                                    </>
                                    <div className="">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            // onClick={uploadPost}
                                        >
                                            Post
                                        </button>
                                    </div>
                                </Dialog.Title>
                                <div className="relative mt-6 h-full w-full">
                                    <Image
                                        src="/userIcon.png"
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
export default memo(UploadProfilePic);
