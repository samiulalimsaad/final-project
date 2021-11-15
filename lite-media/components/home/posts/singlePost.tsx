import React from "react";
import { postInterface } from "../../../util/interfaces";
import PostBody from "./postBody";
import PostFooter from "./postFooter";
import PostHeader from "./postHeader";


const SinglePost = ({ post }: {post:postInterface}) => {
    return (
        <div className="my-2 px-2 py-3 space-y-3 bg-gray-50 h-auto rounded-md border-2 border-gray-400/80 shadow-md">
            <PostHeader
                profilePic={post?.user?.profilePic}
                createdAt={post?.createdAt}
                userName={post?.user?.name.fullName}
                postBody={post?.postBody}
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
