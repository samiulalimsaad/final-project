import {
    AnnotationIcon,
    ShareIcon,
    ThumbUpIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import React from "react";
import { GetState } from "../../../state/stateProvider";
import { NODE_SERVER } from "../../../util";

interface postHeaderInterface {
    like: number;
    comment: number;
    share: number;
    id: string;
}

const PostFooter = ({ like, comment, share, id }: postHeaderInterface) => {

    const { uid } = GetState();

    const addLike = async () => {
        try {
            const {data} = await axios.post(
                NODE_SERVER(`/post/${uid}/like`),
                {
                    like: uid,
                    postId: id,
                }
            );
console.log({data})
            if (data.success) {
                alert("like added")
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="flex items-center justify-between px-1 w-full divide-x divide-gray-500">
            <button className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 flex flex-1 justify-center items-center" onClick={addLike}>
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
