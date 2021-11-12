import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment } from "react";
import { GetState } from "../state/stateProvider";
import { CLOSE_IMAGE } from "../state/types";

const ShowImage = () => {
    const { displayImage, dispatch } = GetState();

    const closeModal = () => {
        dispatch({ type: CLOSE_IMAGE });
    };

    return (
        <Transition appear show={displayImage.isShowing} as={Fragment}>
            <div
                className={`absolute inset-0 backdrop-blur-[1px] bg-gray-900/50 z-50 overflow-y-auto h-screen w-screen ${
                    !displayImage.isShowing && "hidden"
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
                            <div className="w-[80vw] h-full px-5 overflow-hidden transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Description as="div">
                                    {displayImage.imageSrc && (
                                        <Image
                                            className="object-center object-cover "
                                            src={displayImage.imageSrc}
                                            alt="display Image"
                                            // layout="fill"
                                            width="100%"
                                            height="100%"
                                            layout="responsive"
                                            objectFit="contain"
                                        />
                                    )}
                                </Dialog.Description>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </div>
        </Transition>
    );
};
export default ShowImage;
