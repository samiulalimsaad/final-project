import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { GetState } from "../../state/stateProvider";
import { CLOSE_MODAL } from "../../state/types";
import MyEditor from "./TextEditor";

export default function CreatPost() {
    const { createPost, dispatch } = GetState();
    const [editorState, setEditorState] = React.useState("");

    const closeModal = () => {
        dispatch({ type: CLOSE_MODAL });
    };

    const uploadPost=()=>{
        console.log(editorState)
    }


    return (
        <Transition appear show={createPost} as={Fragment}>
            <div
                className={`absolute inset-0 backdrop-blur-[1px] bg-gray-900/50 z-50 overflow-y-auto h-screen w-screen ${
                    !createPost && "hidden"
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
                                {/* <div className="absolute inset-0 p-5"> */}
                                <div className="flex items-center justify-between bg-white">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-medium leading-6 text-gray-900"
                                    >
                                        Create a Post
                                    </Dialog.Title>
                                    <div className="">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={uploadPost}
                                        >
                                            Post
                                        </button>
                                        {/* </div> */}
                                    </div>
                                </div>
                                <div className="mt-6 h-full w-full">
                                    <MyEditor editorState={editorState} setEditorState={setEditorState} />
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </div>
        </Transition>
    );
}
