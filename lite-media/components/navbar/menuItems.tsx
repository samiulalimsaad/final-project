import { getAuth, signOut } from "@firebase/auth";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, memo } from "react";
import { GetState } from "../../state/stateProvider";
import { blurBase64, classNames } from "../../util";

const MenuItems = () => {
    const { displayName, uid, profilePic } = GetState();
    const logOut = () => {
        signOut(getAuth());
    };

    if (!uid) return null;

    return (
        <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none ring-1 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-blue-600 ">
                    <span className="sr-only">Open user menu</span>
                    <div className="relative h-8 w-8 overflow-hidden">
                        <Image
                            className="rounded-full bg-white overflow-hidden object-center object-cover"
                            src={profilePic || "/userIcon.png"}
                            alt=""
                            layout="fill"
                            // placeholder="blur"
                            blurDataURL={blurBase64}
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                            <div>
                                <Link href={`/profile`}>
                                    <a
                                        className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                    >
                                        {displayName}
                                        {/* Your Profile <span className="text-xs">{displayName}</span> */}
                                    </a>
                                </Link>
                            </div>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <div
                                className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                )}
                            >
                                <Link href="/settings">
                                    <a>Settings</a>
                                </Link>
                            </div>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <div
                                className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                )}
                            >
                                <Link href="/login">
                                    <a onClick={logOut}>Sign out</a>
                                </Link>
                            </div>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default memo(MenuItems);
