import { AnnotationIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { ThumbUpIcon as ThumbUpIconSolid } from "@heroicons/react/solid";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { GetState } from "../../state/stateProvider";
import { NODE_SERVER } from "../../util";

interface postHeaderInterface {
    like: string[];
    comment: string[];
    share: string[];
    id: string;
}

const PostFooter = ({ like, comment, share, id }: postHeaderInterface) => {
    const { uid } = GetState();

    const addLike = async () => {
        try {
            if (like.includes(uid!)) {
                const { data } = await axios.delete(
                    NODE_SERVER(`/post/like/${uid}/${id}`)
                );
                console.log({ data });
                if (data.success) {
                    console.log("like removed");
                }
            } else {
                const { data } = await axios.post(
                    NODE_SERVER(`/post/like/${uid}`),
                    {
                        like: uid,
                        postId: id,
                    }
                );
                console.log({ data });
                if (data.success) {
                    console.log("like added");
                }
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="flex items-center justify-between px-1 w-full divide-x divide-gray-500">
            <button
                className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 flex flex-1 justify-center items-center"
                onClick={addLike}
            >
                {like?.length > 0 && <span>{like?.length}</span>}
                {like?.includes(uid!) ? (
                    <ThumbUpIconSolid
                        className="h-5 w-5 ml-3"
                        aria-hidden="true"
                    />
                ) : (
                    <ThumbUpIcon className="h-5 w-5 ml-3" aria-hidden="true" />
                )}
            </button>
            <Link href={`/post/${id}`} passHref>
                <a className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 flex flex-1 justify-center items-center">
                    {comment?.length && <span>{comment.length}</span>}
                    <AnnotationIcon
                        className="h-5 w-5 ml-3"
                        aria-hidden="true"
                    />
                </a>
            </Link>
        </div>
    );
};

export default PostFooter;
