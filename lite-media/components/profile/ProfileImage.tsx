import { PencilIcon } from "@heroicons/react/solid";
import axios from "axios";
import Image from "next/image";
import React, { memo, useCallback, useState } from "react";
import { GetState } from "../../state/stateProvider";
import {
    NOTIFICATION_ADD,
    SHOW_IMAGE,
    SHOW_PROFILE_IMAGE,
} from "../../state/types";
import { blurBase64, NODE_SERVER } from "../../util";

const ProfileImage = ({ image, id }: { image: string; id: string }) => {
    const { uid, dispatch } = GetState();
    const [State, setState] = useState<File>();

    const removeFollow = useCallback(async () => {
        console.log("clicked");
        try {
            const following = await axios.delete(
                NODE_SERVER(`/following/${uid}}`)
            );
            if (following.data.success) {
                dispatch({
                    type: NOTIFICATION_ADD,
                    payload: { type: "warning", text: following.data.message },
                });
            }
        } catch (error) {
            dispatch({
                type: NOTIFICATION_ADD,
                payload: { type: "error", text: (error as Error).message },
            });
        }
    }, [dispatch, uid]);

    return (
        <div className="relative inline-block h-28 w-28 rounded-full border-2 border-gray-500 bg-white overflow-hidden">
            <div
                className="relative h-28 w-28 rounded-full bg-white  z-40"
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
                    src={image}
                    alt="post image"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurBase64}
                />
            </div>
            {uid === id && (
                <div
                    className="absolute bottom-0 flex justify-center w-full bg-gray-700/80 text-white rounded-lg cursor-pointer z-50 hover:underline hover:bg-gray-700"
                    onClick={() => {
                        dispatch({
                            type: SHOW_PROFILE_IMAGE,
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
    );
};

export default memo(ProfileImage);
