import {
    BookmarkIcon,
    ChatIcon,
    HashtagIcon,
    HomeIcon,
    UserAddIcon,
    UserGroupIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo } from "react";
import { GetState } from "../../state/stateProvider";
import { CREATE_POST } from "../../state/types";
import Assistant from "./assistant";

const bar = [
    {
        name: "Home",
        icon: <HomeIcon className="h-6 w-6" aria-hidden="true" />,
        link: "/",
    },
    {
        name: "Explore",
        icon: <HashtagIcon className="h-6 w-6" aria-hidden="true" />,
        link: "/explore",
    },
    {
        name: "Message",
        icon: <ChatIcon className="h-6 w-6" aria-hidden="true" />,
        link: "/message",
    },
    {
        name: "Bookmarks",
        icon: <BookmarkIcon className="h-6 w-6" aria-hidden="true" />,
        link: "/bookmarks",
    },
    {
        name: "Following",
        icon: <UserAddIcon className="h-6 w-6" aria-hidden="true" />,
        link: "/following",
    },
    {
        name: "Followers",
        icon: <UserGroupIcon className="h-6 w-6" aria-hidden="true" />,
        link: "/followers",
    },
];

const LeftSide = () => {
    const { dispatch } = GetState();
    const router = useRouter();

    return (
        <section className="py-1 px-5 bg-gray-200 h-screen drop-shadow-md">
            {bar.map((item) => (
                <Link href={item.link} passHref key={item.name}>
                    <div
                        className={`flex items-center space-x-4 p-2 transition ease-in-out duration-500 cursor-pointer rounded-full font-semibold hover:font-extrabold ${
                            router.pathname === item.link
                                ? "bg-gray-300 text-gray-900 hover:bg-gray-300"
                                : "hover:bg-indigo-700 active:bg-indigo-900 hover:text-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        }`}
                    >
                        <span className="self-center">{item.icon}</span>
                        <span className="self-center">{item.name}</span>
                    </div>
                </Link>
            ))}
            <div>
                <button
                    className="group relative w-full mt-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => dispatch({ type: CREATE_POST })}
                >
                    New Post
                </button>
            </div>
            <Assistant />
        </section>
    );
};

export default memo(LeftSide);
