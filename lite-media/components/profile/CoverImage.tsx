import { PencilIcon } from "@heroicons/react/solid";
import axios from "axios";
import Image from "next/image";
import React, { memo, useCallback, useState } from "react";
import { GetState } from "../../state/stateProvider";
import { SHOW_IMAGE } from "../../state/types";
import { NODE_SERVER } from "../../util";

const CoverImage = ({ image, id }: { image: string; id: string }) => {
    const { uid, dispatch } = GetState();
    const [State, setState] = useState<File>();

    const uploadImage = useCallback(async () => {
        console.log("clicked");
        try {
            const following = await axios.put(NODE_SERVER(`/info/${uid}`), {});
            if (following.data.success) {
                alert("following removed");
            }
        } catch (error) {
            alert(error);
        }
    }, [uid]);

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
                    <div className="absolute bottom-0 right-0 bg-gray-700/80 text-white rounded-lg cursor-pointer px-4 py-1 z-50 hover:underline hover:bg-gray-700">
                        <label
                            htmlFor="coverImageFile"
                            className="flex items-center py-2 "
                        >
                            <PencilIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                        </label>
                        <input
                            type="file"
                            id="coverImageFile"
                            accept="image/*"
                            onChange={(e: any) =>
                                setState(e!.target!.files[0]!)
                            }
                            hidden
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(CoverImage);
