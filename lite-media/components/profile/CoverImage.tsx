import { PencilIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React, { memo } from "react";
import { GetState } from "../../state/stateProvider";
import { SHOW_COVER_IMAGE, SHOW_IMAGE } from "../../state/types";

const CoverImage = ({ image, id }: { image: string; id: string }) => {
    const { uid, dispatch } = GetState();

    return (
        <div className="relative mb-16 z-48">
            <div>
                <div
                    className="relative h-48 w-full bg-gray-500/50 "
                    onClick={() =>
                        dispatch({
                            type: SHOW_IMAGE,
                            payload: {
                                imageSrc: image,
                            },
                        })
                    }
                >
                    <Image
                        className="object-center object-cover "
                        src={image!}
                        alt="post image"
                        layout="fill"
                    />
                </div>
                {id === uid && (
                    <div
                        className="absolute bottom-0 right-0 bg-gray-700/80 text-white rounded-lg cursor-pointer px-4 py-1 z-50 hover:underline hover:bg-gray-700"
                        onClick={() => {
                            dispatch({
                                type: SHOW_COVER_IMAGE,
                                payload: {
                                    imageSrc: image,
                                },
                            });
                        }}
                    >
                        <PencilIcon className="h-4 w-4" aria-hidden="true" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(CoverImage);
