import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import React, { Fragment,memo } from "react";
import { classNames } from "../../util";

const Notification = () => {
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {"origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        .split(" ")
                        .map((v) => (
                            <Menu.Item key={v}>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "px-4 py-2 text-sm text-gray-700 flex items-center justify-between"
                                        )}
                                    >
                                        <span>{v}</span>
                                        <span className="text-xs">10 min ago</span>
                                    </a>
                                )}
                            </Menu.Item>
                        ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default memo(Notification);
