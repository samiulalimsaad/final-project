import {
    AnnotationIcon,
    ShareIcon,
    ThumbUpIcon,
} from "@heroicons/react/outline";
import React from "react";

interface postHeaderInterface {
    userName: string;
    like: number;
    comment: number;
    share: number;
}

const PostFooter = ({ userName, like, comment,share }: postHeaderInterface) => {
    return (
        <div className="flex items-center justify-between px-1 w-full divide-x divide-gray-500">
            <button className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 flex flex-1 justify-center items-center">
                <span>{like}</span>
                <ThumbUpIcon className="h-5 w-5 ml-3" aria-hidden="true" />
            </button>
            <button className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 flex flex-1 justify-center items-center">
                <span>{comment}</span>
                <AnnotationIcon className="h-5 w-5 ml-3" aria-hidden="true" />
            </button>
            <button className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 flex flex-1 justify-center items-center">
                <span>{share}</span>
                <ShareIcon className="h-5 w-5 ml-3" aria-hidden="true" />
            </button>
        </div>
    );
};

export default PostFooter;
