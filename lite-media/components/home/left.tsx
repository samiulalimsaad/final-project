import {
    BellIcon,
    BookmarkIcon,
    ChatIcon,
    HashtagIcon,
    HomeIcon,
    UserAddIcon,
    UserGroupIcon,
} from "@heroicons/react/outline";
import React from "react";

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
        name: "Notification",
        icon: <BellIcon className="h-6 w-6" aria-hidden="true" />,
        link: "/notification",
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
    return (
        <section className="py-6 px-5 bg-gray-200 h-screen drop-shadow-md">
            {bar.map((item) => (
                <div
                    className="flex items-center space-x-4 p-3 transition ease-in-out duration-500 hover:bg-indigo-700 active:bg-indigo-900 hover:text-gray-50 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-semibold hover:font-extrabold"
                    key={item.name}
                >
                    <span className="self-center">{item.icon}</span>
                    <span className="self-center">{item.name}</span>
                </div>
            ))}
            <div>
                <button className="group relative w-full mt-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    New Post
                </button>
            </div>
        </section>
    );
};

export default LeftSide;
