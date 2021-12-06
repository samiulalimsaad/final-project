import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, memo } from "react";
import useSWR from "swr";
import { GetState } from "../../state/stateProvider";
import { CLOSE_IMAGE } from "../../state/types";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../../util";
import ShowPost from "../posts/showPost";

const ShowImage = () => {
    const { displayImage, dispatch, uid } = GetState();

    const { data, error } = useSWR(
        NODE_SERVER(`/post/${uid}/${displayImage?.imageSrc}`),
        fetcher,
        { refreshInterval: REFRESH_INTERVAL }
    );

    if (error) {
        alert(error);
    }
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
                            <div className="w-[75vw] h-[75vh] overflow-hidden transition-all transform bg-black/95 shadow-xl rounded-2xl">
                                <Dialog.Description as="div">
                                    {data?.success && (
                                        <ShowPost post={data.post} />
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
export default memo(ShowImage);
