import { Menu, Transition } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useCallback } from "react";
import useSWR from "swr";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_ADD } from "../../state/types";
import {
    blurBase64,
    classNames,
    fetcher,
    NODE_SERVER,
    REFRESH_INTERVAL,
} from "../../util";
import { userInterface } from "../../util/interfaces";
interface commentInterface {
    body: string;
    user: userInterface;
    _id: string;
    createdAt: Date;
}

const Comments = ({ postId }: any) => {
    const { uid, dispatch } = GetState();

    const { data, error } = useSWR(
        NODE_SERVER(`/post/comment/${uid}/${postId}`),
        fetcher,
        {
            refreshInterval: REFRESH_INTERVAL,
        }
    );
    if (error) {
        dispatch({
            type: NOTIFICATION_ADD,
            payload: { type: "error", text: error },
        });
    }
    console.log({ data });
    const deleteComment = useCallback(
        async (id) => {
            try {
                const { data } = await axios.delete(
                    NODE_SERVER(`/post/comment/${uid}/${postId}/${id}`)
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
        },
        [dispatch, postId, uid]
    );
    return (
        <div className="pb-10">
            {data?.comment?.map((v: commentInterface) => (
                // <div key={v?._id}>{JSON.stringify(v?.body, null, 4)}</div>
                <div
                    key={v?._id}
                    className="flex items-center justify-between px-1 w-full mt-4"
                >
                    <div className="flex">
                        <Link href={`/profile/${v?.user?._id}`} passHref>
                            <button className="flex mt-1">
                                <div className="relative h-8 w-8 rounded-full border-2 border-gray-500 overflow-hidden">
                                    <Image
                                        className="object-center object-cover"
                                        src={
                                            v?.user?.profilePic ||
                                            "/userIcon.png"
                                        }
                                        alt={v?.user?.name?.fullName}
                                        layout="fill"
                                        placeholder="blur"
                                        blurDataURL={blurBase64}
                                    />
                                </div>
                            </button>
                        </Link>
                        <div className="bg-gray-200 rounded-lg p-2 pl-1 ml-2">
                            <div className="ml-2 flex-col">
                                <div className="flex items-center">
                                    <Link
                                        href={`/profile/${v?.user?._id}`}
                                        passHref
                                    >
                                        <a className="font-medium">
                                            {v?.user?.name?.fullName}
                                        </a>
                                    </Link>
                                    <h4 className="text-xs font-light ml-3">
                                        <time className="text-xs font-light text-left">
                                            {moment(v?.createdAt).fromNow()}
                                        </time>
                                    </h4>
                                </div>
                            </div>
                            <div className="flex items-center ml-2">
                                <p>{v?.body}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        {v?.user?._id === uid && (
                            <Menu as="div" className="ml-3 relative">
                                <div>
                                    <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <div className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 rounded-full">
                                            <DotsHorizontalIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </Menu.Button>
                                </div>
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
                                                    onClick={() => {
                                                        deleteComment(v?._id);
                                                    }}
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-100"
                                                            : "",
                                                        "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                                    )}
                                                >
                                                    Delete
                                                </div>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;
