import React from "react";
import PostBody from "./postBody";
import PostFooter from "./postFooter";
import PostHeader from "./postHeader";

const SinglePost = ({ post }: any) => {
    return (
        <div className="my-2 px-2 py-3 space-y-3 bg-gray-50 h-auto rounded-md border-2 border-gray-400/80 shadow-md">
            <PostHeader
                profilePic={post?.user?.profilePic}
                createdAt={post?.createdAt}
                userName={post?.user?.name.fullName}
                post={post?.post}
            />
            <PostBody
                id={post?._id}
                image={post?.postImage}
                post={post?.postBody}
                />
            <PostFooter
                id={post?._id}
                like={post?.like?.length}
                comment={post?.comments}
                share={post?.share}
            />
        </div>
    );
};

export default SinglePost;
