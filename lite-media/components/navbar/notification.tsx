import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import { onValue, ref, remove } from "firebase/database";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, memo, useCallback, useEffect, useState } from "react";
import Moment from "react-moment";
import { database } from "../../firebase";
import { GetState } from "../../state/stateProvider";
import { blurBase64 } from "../../util";

const Notification = () => {
    const { uid, dispatch } = GetState();
    const [state, setState] = useState([]);

    useEffect(() => {
        uid &&
            onValue(ref(database, `users/${uid}/notifications`), (snapshot) => {
                const data = snapshot.val();
                setState(data);
            });
    }, [dispatch, uid]);
    const read = useCallback(
        (v) => {
            uid && remove(ref(database, `users/${uid}/notifications/${v}`));
        },
        [uid]
    );

    return (
        <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                </Menu.Button>
                {state && Object?.keys(state) && (
                    <sub className="absolute animate-bounce right-0 top-0 bg-pink-500 text-gray-100 h-4 w-4 rounded-full flex items-center justify-center">
                        {Object?.keys(state)?.length}
                    </sub>
                )}
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 min-w-max w-auto max-h-96 overflow-y-scroll rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {state ? (
                        Object?.keys(state) &&
                        Object?.keys(state)
                            ?.reverse()
                            ?.map((v: string) => (
                                <Menu.Item key={v}>
                                    {({ active }) => (
                                        <div>
                                            <Link
                                                href={state[v]?.postLink}
                                                passHref
                                            >
                                                <a
                                                    onClick={() => read(v)}
                                                    className={`
                                            ${active ? "bg-gray-100" : ""}
                                            p-2 text-sm text-gray-700 flex items-center justify-between
                                            `}
                                                >
                                                    <div className="flex truncate">
                                                        <div className="flex">
                                                            <h4 className="font-semibold flex items-center justify-center space-x-2">
                                                                <div className="overflow-hidden rounded-full border border-gray-500">
                                                                    <div className="relative h-7 w-7 flex items-center justify-center">
                                                                        <Image
                                                                            className="object-center object-cover "
                                                                            src={
                                                                                state[
                                                                                    v
                                                                                ]
                                                                                    ?.profilePic ||
                                                                                "/userIcon.png"
                                                                            }
                                                                            alt={`${state[v]?.text}`}
                                                                            layout="fill"
                                                                            placeholder="blur"
                                                                            blurDataURL={
                                                                                blurBase64
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col wrap">
                                                                    <span>
                                                                        {
                                                                            state[
                                                                                v
                                                                            ]
                                                                                ?.text
                                                                        }
                                                                    </span>
                                                                    <time className="text-xs font-light">
                                                                        <Moment
                                                                            fromNow
                                                                        >
                                                                            {
                                                                                state[
                                                                                    v
                                                                                ]
                                                                                    ?.createdAt
                                                                            }
                                                                        </Moment>
                                                                    </time>
                                                                </div>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                    )}
                                </Menu.Item>
                            ))
                    ) : (
                        <p className="font-semibold text-sm text-gray-500 flex items-center justify-center p-8">
                            No Notifications
                        </p>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default memo(Notification);
