import { Menu, Transition } from "@headlessui/react";
import { BookmarkIcon, DotsHorizontalIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/solid";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useCallback } from "react";
import Moment from "react-moment";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_ADD } from "../../state/types";
import { blurBase64, classNames, NODE_SERVER } from "../../util";

interface postHeaderInterface {
    userName: string;
    id: string;
    userId: string;
    bookmark: string[];
    createdAt: Date;
    profilePic: string;
}

const PostHeader = ({
    userName,
    createdAt,
    profilePic,
    id,
    userId,
    bookmark,
}: postHeaderInterface) => {
    const { uid, dispatch } = GetState();

    const addBookmark = useCallback(async () => {
        try {
            if (bookmark.includes(id!)) {
                const { data } = await axios.delete(
                    NODE_SERVER(`/bookmark/${uid}/${id}`)
                );
                if (data.success) {
                    dispatch({
                        type: NOTIFICATION_ADD,
                        payload: { type: "warning", text: data.message },
                    });
                }
            } else {
                const { data } = await axios.post(
                    NODE_SERVER(`/bookmark/${uid}/${id}`)
                );
                if (data.success) {
                    dispatch({
                        type: NOTIFICATION_ADD,
                        payload: { type: "success", text: data.message },
                    });
                }
            }
        } catch (error) {
            dispatch({
                type: NOTIFICATION_ADD,
                payload: { type: "error", text: (error as Error).message },
            });
        }
    }, [bookmark, dispatch, id, uid]);

    const deletePost = useCallback(async () => {
        try {
            const { data } = await axios.delete(
                NODE_SERVER(`/post/${uid}/${id}`)
            );
            if (data.success) {
                dispatch({
                    type: NOTIFICATION_ADD,
                    payload: { type: "success", text: data.message },
                });
            } else {
                dispatch({
                    type: NOTIFICATION_ADD,
                    payload: { type: "error", text: data.message },
                });
            }
        } catch (error) {
            dispatch({
                type: NOTIFICATION_ADD,
                payload: { type: "error", text: (error as Error).message },
            });
        }
    }, [dispatch, id, uid]);

    return (
        <div className="flex items-center justify-between px-1 w-full ">
            <div className="flex items-center">
                <Link
                    href={`${
                        userId === uid ? "/profile/" : `/profile/${userId}`
                    }`}
                    passHref
                >
                    <button className="flex items-center">
                        <div className="relative h-12 w-12 rounded-full border-2 border-gray-500 overflow-hidden">
                            <Image
                                className="object-center object-cover "
                                src={profilePic}
                                alt={userName}
                                layout="fill"
                                placeholder="blur"
                                blurDataURL={blurBase64}
                            />
                        </div>
                    </button>
                </Link>
                <div className="ml-2 flex-col">
                    <Link
                        href={`${
                            userId === uid ? "/profile/" : `/profile/${userId}`
                        }`}
                        passHref
                    >
                        <button className="flex items-center">
                            <h3 className="font-medium">{userName}</h3>
                            <h4 className="text-xs font-light ml-3">
                                {`about post type`}
                            </h4>
                        </button>
                    </Link>
                    <div className="flex">
                        <time className="text-xs font-light text-left">
                            <Moment fromNow>{createdAt}</Moment>
                        </time>
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                <button
                    className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 rounded-full"
                    onClick={addBookmark}
                >
                    {bookmark?.includes(id!) ? (
                        <BookmarkIconSolid
                            className="h-6 w-6"
                            aria-hidden="true"
                        />
                    ) : (
                        <BookmarkIcon className="h-6 w-6" aria-hidden="true" />
                    )}
                </button>
                <Menu as="div" className="ml-3 relative">
                    <div>
                        <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <div className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 rounded-full">
                                <DotsHorizontalIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </div>
                        </Menu.Button>
                    </div>
                    {uid === userId && (
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 z-50 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <div
                                            onClick={deletePost}
                                            className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                            )}
                                        >
                                            Delete
                                        </div>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    )}
                </Menu>
            </div>
        </div>
    );
};

export default PostHeader;
