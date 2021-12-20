import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_ADD } from "../../state/types";
import { blurBase64, NODE_SERVER } from "../../util";

const AddComment = ({ postId }: { postId: string }) => {
    const { uid, dispatch } = GetState();
    const [comment, setComment] = useState("");
    const addComment = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                NODE_SERVER(`/post/comment/${uid}/${postId}`),
                {
                    body: comment,
                }
            );
            if (data.success) {
                dispatch({
                    type: NOTIFICATION_ADD,
                    payload: { type: "success", text: data.message },
                });
                setComment("");
            }
        } catch (error) {
            dispatch({
                type: NOTIFICATION_ADD,
                payload: { type: "error", text: (error as Error).message },
            });
        }
    };
    return (
        <form
            className="flex items-center justify-between ml-auto mr-auto w-full"
            onSubmit={addComment}
        >
            <div className="relative rounded-md shadow-sm w-full">
                <textarea
                    name="search"
                    id="search"
                    value={comment}
                    rows={3}
                    onChange={(e) => setComment(e?.target?.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md resize-none"
                    placeholder="write a comment"
                />
                <div className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer">
                    <button
                        type="submit"
                        className="px-1 flex items-center cursor-pointer"
                    >
                        <Image
                            src="/send.png"
                            alt="send"
                            className="transition-all duration-300 scale-90 hover:scale-110"
                            aria-hidden="true"
                            height={33}
                            width={33}
                            placeholder="blur"
                            blurDataURL={blurBase64}
                        />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddComment;
