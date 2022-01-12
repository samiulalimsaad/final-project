import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { GetState } from "../../state/stateProvider";
import { CLOSE_OF_MODAL } from "../../state/types";
import { OF_Widget } from "../OF";

const ShowOFModal = () => {
    const { OFModal, dispatch } = GetState();

    const closeModal = () => {
        dispatch({ type: CLOSE_OF_MODAL });
    };

    return (
        <Transition appear show={OFModal.isShowing} as={Fragment}>
            <div
                className={`absolute inset-0 backdrop-blur-[1px] bg-transparent z-[51] overflow-y-auto h-screen w-screen ${
                    !OFModal.isShowing && "hidden"
                }`}
            >
                <Dialog
                    as="div"
                    className="fixed inset-0 z-[951] overflow-y-auto"
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
                            <div className="w-[75vw] h-[75vh] overflow-auto transition-all transform  shadow-xl rounded-2xl bg-white">
                                <Dialog.Title
                                    as="h3"
                                    className="text-xl font-medium leading-6 text-gray-900 flex items-center justify-between bg-white"
                                >
                                    <h3 className="text-2xl p-4 text-center w-full bg-blue-600 text-white">
                                        {OF_Widget[OFModal.index].name}
                                    </h3>
                                </Dialog.Title>
                                <Dialog.Description as="div">
                                    {OF_Widget[OFModal.index].component}
                                </Dialog.Description>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </div>
        </Transition>
    );
};

export default ShowOFModal;
