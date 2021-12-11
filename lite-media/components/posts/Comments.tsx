import { Menu, Transition } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useCallback } from "react";
import { GetState } from "../../state/stateProvider";
import { classNames, NODE_SERVER } from "../../util";
import { userInterface } from "../../util/interfaces";

interface commentInterface {
    body: string;
    user: userInterface;
    _id: string;
}

const Comments = ({ comments }: any) => {
    console.log({ comments });
    const { uid } = GetState();
    const deleteComment = useCallback(
        async (id) => {
            try {
                const { data } = await axios.delete(
                    NODE_SERVER(`/post/${uid}/${id}`)
                );
                if (data.success) {
                    alert(data.message);
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert(error);
            }
        },
        [uid]
    );
    return (
        <div>
            {comments?.map((v: commentInterface) => (
                <div
                    key={v?._id}
                    className="flex items-center justify-between px-1 w-full "
                >
                    <div className="flex items-center">
                        <Link href={`/profile/${v?.user?._id}`} passHref>
                            <button className="flex items-center">
                                <div className="relative h-12 w-12 rounded-full border-2 border-gray-500 overflow-hidden">
                                    <Image
                                        className="object-center object-cover "
                                        src={
                                            v?.user?.profilePic ||
                                            "/userIcon.png"
                                        }
                                        alt={v?.user?.name.fullName}
                                        layout="fill"
                                    />
                                </div>
                            </button>
                        </Link>
                        <div className="ml-2 flex-col">
                            <Link href={`/profile/${v?.user?._id}`} passHref>
                                <button className="flex items-center">
                                    <h3 className="font-medium">
                                        {v?.user?.name.fullName}
                                    </h3>
                                    <h4 className="text-xs font-light ml-3">
                                        @
                                        {v?.user?.name.fullName
                                            ?.split(" ")
                                            .join("_")}
                                    </h4>
                                </button>
                            </Link>
                            <div>
                                <time className="text-xs font-light text-left">
                                    {moment(v?.user?.createdAt).fromNow()}
                                </time>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end">
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
                                                onClick={deleteComment}
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
                        </Menu>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;
