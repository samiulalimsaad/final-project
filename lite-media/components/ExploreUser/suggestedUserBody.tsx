import axios from "axios";
import { serverTimestamp } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback } from "react";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_ADD } from "../../state/types";
import { addFollowingNotification, blurBase64, NODE_SERVER } from "../../util";

interface userInterface {
    user: {
        _id: string;
        profilePic: string;
        follower: [string];
        name: {
            fullName: string;
        };
    };
}

const SuggestedUserBody = ({ user }: userInterface) => {
    const { uid, displayName, profilePic, dispatch } = GetState();
    const addFollow = useCallback(async () => {
        try {
            const follower = await axios.post(
                NODE_SERVER(`/follower/${user?._id}/${uid}`)
            );
            const following = await axios.post(
                NODE_SERVER(`/following/${uid}/${user?._id}`)
            );
            if (follower.data.success && following.data.success) {
                dispatch({
                    type: NOTIFICATION_ADD,
                    payload: {
                        type: "success",
                        text: follower?.data?.message,
                    },
                });
                user._id !== uid &&
                    addFollowingNotification(
                        user._id,
                        displayName,
                        `/profile/${uid}`,
                        profilePic,
                        serverTimestamp(),
                        dispatch
                    );
            }
        } catch (error) {
            dispatch({
                type: NOTIFICATION_ADD,
                payload: { type: "error", text: (error as Error).message },
            });
        }
    }, [dispatch, displayName, profilePic, uid, user._id]);

    const removeFollow = useCallback(async () => {
        try {
            const follower = await axios.delete(
                NODE_SERVER(`/follower/${user?._id}/${uid}`)
            );
            const following = await axios.delete(
                NODE_SERVER(`/following/${uid}/${user?._id}`)
            );
            if (follower.data.success && following.data.success) {
                dispatch({
                    type: NOTIFICATION_ADD,
                    payload: {
                        type: "warning",
                        text: following?.data?.message,
                    },
                });
            }
        } catch (error) {
            dispatch({
                type: NOTIFICATION_ADD,
                payload: { type: "error", text: (error as Error).message },
            });
        }
    }, [dispatch, uid, user?._id]);

    return (
        <div className="flex items-center p-1 text-sm transition ease-in-out duration-500 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
            <div className="flex items-center justify-between w-full">
                <div className="flex truncate">
                    <div className="pl-2 flex ">
                        <h4 className="font-semibold flex items-center justify-center">
                            <div className="overflow-hidden rounded-full border border-gray-500">
                                <Link
                                    href={`${
                                        user?._id === uid
                                            ? "/profile/"
                                            : `/profile/${user?._id}`
                                    }`}
                                    passHref
                                >
                                    <div className="relative h-7 w-7 flex items-center justify-center">
                                        <Image
                                            className="object-center object-cover "
                                            src={
                                                user?.profilePic ||
                                                "/userIcon.png"
                                            }
                                            alt={`${user?.name?.fullName!}`}
                                            layout="fill"
                                            placeholder="blur"
                                            blurDataURL={blurBase64}
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="flex flex-col">
                                <a className="ml-3 capitalize text-sm">
                                    {user?.name.fullName}
                                </a>
                                <a className="ml-3 lowercase text-xs font-light truncate w-20">
                                    @{user._id}
                                </a>
                            </div>
                        </h4>
                    </div>
                </div>
                <div className="flex items-center mr-2">
                    {user?.follower?.includes(uid!) ? (
                        <button
                            className="group w-full flex justify-center py-1 px-3 transition ease-in-out duration-500 border border-indigo-700 text-sm font-medium rounded-full text-white bg-indigo-500 hover:text-indigo-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={removeFollow}
                        >
                            Following
                        </button>
                    ) : (
                        <button
                            className="group w-full flex justify-center py-1 px-3 transition ease-in-out duration-500 border border-indigo-700 text-sm font-medium rounded-full text-indigo-500 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={addFollow}
                        >
                            Follow
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuggestedUserBody;
