/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import { SearchIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useEffect } from "react";
import { GetState } from "../../state/stateProvider";
import { NODE_SERVER } from "../../util";
import Progressbar from "../progress/progressbar";
import MenuItems from "./menuItems";
import Notification from "./notification";

const setActive = async (id: string) => {
    await axios.post(NODE_SERVER(`/active-user/${id}`));
};

const setDeactive = async (id: string) => {
    await axios.delete(NODE_SERVER(`/active-user/${id}`));
};

const Navbar = () => {
    const { createPost, uploadCoverPic, uploadProfilePic, uid } = GetState();

    useEffect(() => {
        setActive(uid);
        return () => {
            setDeactive(uid);
        };
    }, [uid]);

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center ">
                        <div className="ml-4 flex-shrink-0 flex items-center">
                            <Link href="/" passHref>
                                <a className="relative h-12 w-12">
                                    <Image
                                        className="cursor-pointer rounded-full"
                                        src="/logo.svg"
                                        alt="Workflow"
                                        layout="fill"
                                    />
                                </a>
                            </Link>
                        </div>
                        <form className="hidden sm:flex items-center justify-between ml-auto mr-auto">
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none">
                                    <SearchIcon
                                        className="h-6 w-6 text-gray-600"
                                        aria-hidden="true"
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-10 sm:text-sm border-gray-300 rounded-md bg-gray-300"
                                    placeholder="Search"
                                />
                                <button
                                    type="reset"
                                    className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer"
                                >
                                    <XIcon
                                        className="h-6 w-6 text-gray-600"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="mr-4 absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 z-10">
                        <Notification />
                        <MenuItems />
                    </div>
                </div>
            </div>
            {(createPost ||
                uploadProfilePic.isShowing ||
                uploadCoverPic.imageSrc) && <Progressbar />}
        </Disclosure>
    );
};
export default memo(Navbar);
