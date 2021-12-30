import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import { onValue, ref, update } from "firebase/database";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, memo, useCallback, useEffect, useState } from "react";
import Moment from "react-moment";
import { database } from "../../firebase";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_ADD } from "../../state/types";
import { blurBase64 } from "../../util";

const Notification = () => {
    const { uid, dispatch } = GetState();
    const [state, setState] = useState([]);

    useEffect(() => {
        uid &&
            onValue(ref(database, `users/${uid}/notifications`), (snapshot) => {
                const data = snapshot.val();
                setState(data);
                console.log({ data });
                dispatch({
                    type: NOTIFICATION_ADD,
                    payload: Object?.values(data)[0],
                });
            });
    }, [dispatch, uid]);
    const read = useCallback(() => {
        uid &&
            update(
                ref(database, `users/${uid}/notifications`),
                (snapshot: { val: () => any }) => {
                    const data = snapshot.val();
                    setState(data);
                    console.log({ data });
                    dispatch({
                        type: NOTIFICATION_ADD,
                        payload: Object?.values(data)[0],
                    });
                }
            );
    }, [dispatch, uid]);

    return (
        <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-64 max-h-96 overflow-y-scroll rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {state ? (
                        Object?.values(state) &&
                        Object?.values(state)
                            ?.reverse()
                            ?.map((v: any, i) => (
                                <Menu.Item key={i}>
                                    {({ active }) => (
                                        <div>
                                            <Link href={v?.postLink} passHref>
                                                <a
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
                                                                                v?.profilePic ||
                                                                                "/userIcon.png"
                                                                            }
                                                                            alt={`${v?.text}`}
                                                                            layout="fill"
                                                                            placeholder="blur"
                                                                            blurDataURL={
                                                                                blurBase64
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span>
                                                                        {
                                                                            v?.text
                                                                        }
                                                                    </span>
                                                                    <time className="text-xs font-light">
                                                                        <Moment
                                                                            fromNow
                                                                        >
                                                                            {
                                                                                v?.createdAt
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
                            Your notifications will be shown here...
                        </p>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default memo(Notification);
