import {
    AnnotationIcon,
    BookmarkIcon,
    DotsHorizontalIcon,
    ShareIcon,
    ThumbUpIcon,
    VolumeUpIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import React from "react";

interface postHeaderInterface {
    userName: string;
    like: number;
    comment: number;
    share: number;
}

const PostFooter = ({
    userName,
    like,
    comment,
}: postHeaderInterface) => {
    
    return (
        <div className="flex items-center justify-between px-1 w-full divide-x divide-gray-500">
                <button className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 flex flex-1 justify-center">
                    <ThumbUpIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <button className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 flex flex-1 justify-center">
                    <AnnotationIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <button className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 flex flex-1 justify-center">
                    <ShareIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                    />
                </button>
        </div>
    );
};

export default PostFooter;
