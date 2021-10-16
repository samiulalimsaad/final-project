import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment } from "react";
import { GetState } from "../../state/stateProvider";
import { classNames } from "../../util";

const MenuItems = () => {
    const { displayName } = GetState();
    return (
        <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button className="bg-gray-800 flex px-2 items-center text-sm rounded-full active:outline-none active:ring-2 active:ring-offset-2 active:ring-offset-gray-800 active:ring-white">
                    <span className="sr-only">Open user menu</span>
                    <h4 className="text-white mr-3">{"displayName"}</h4>
                    <div className="relative h-8 w-8">
                        <Image
                            className="rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            layout="fill"
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
                            <a
                                href="#"
                                className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                )}
                            >
                                Your Profile
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href="#"
                                className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                )}
                            >
                                Settings
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href="#"
                                className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                )}
                            >
                                Sign out
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default MenuItems;
