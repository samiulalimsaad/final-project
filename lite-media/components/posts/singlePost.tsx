import React from "react";
import { postInterface } from "../../util/interfaces";
import PostBody from "./postBody";
import PostFooter from "./postFooter";
import PostHeader from "./postHeader";

interface postLocalInterface {
    post: postInterface;
    userName: string;
    userId: string;
    noBorder?: boolean;
}

const SinglePost = ({
    post,
    userName,
    userId,
    noBorder,
}: postLocalInterface) => {
    console.log({ post });
    return (
        <div
            className={`my-2 px-2 py-3 space-y-3 bg-gray-50 h-auto rounded-md border-gray-400/80 shadow-md ${
                !noBorder && "border-2"
            }`}
        >
            <PostHeader
                profilePic={post?.user?.profilePic || "/userIcon.png"}
                createdAt={post?.createdAt}
                userName={post?.user?.name?.fullName || userName}
                userId={post?.user?._id || userId}
                bookmark={post?.user?.bookmark}
                id={post?._id}
            />
            <PostBody
                id={post?._id}
                image={post?.postImage}
                post={post?.postBody}
            />
            <PostFooter
                id={post?._id}
                like={post?.like}
                comment={post?.comments}
                share={post?.share}
            />
        </div>
    );
};

export default SinglePost;
