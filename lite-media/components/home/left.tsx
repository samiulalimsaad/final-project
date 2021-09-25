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
        name: "Follows",
        icon: <UserAddIcon className="h-6 w-6" aria-hidden="true" />,
        link: "/follows",
    },
    {
        name: "Followers",
        icon: <UserGroupIcon className="h-6 w-6" aria-hidden="true" />,
        link: "/followers",
    },
];

const LeftSide = () => {
    return (
        <section className="mt-6">
            {bar.map((item) => (
                <div
                    className="flex items-center space-x-4 pb-3"
                    key={item.name}
                >
                    <span className="self-center font-semibold">
                        {item.icon}
                    </span>
                    <span className="self-center font-semibold">
                        {item.name}
                    </span>
                </div>
            ))}
            <div>
                <button className="group relative w-1/2 mt-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    New Post
                </button>
            </div>
        </section>
    );
};

export default LeftSide;
