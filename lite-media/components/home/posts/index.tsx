import React from "react";
import posts from "../../../util/posts.json";
import PostBody from "./postBody";
import PostFooter from "./postFooter";
import PostHeader from "./postHeader";

interface postInterface{
    image: string|undefined;
    createdAt: string;
    userName: string;
    profilePic: string;
    post: string |undefined;
    like: number;
    comments: number;
    share: number;
}

const Posts = () => {
    return (
        <>
            {posts.slice(0,20).map(v=>(<Post post={v} key={v.userName}/>))}
        </>
    );
};
const Post = ({post}:any) => {
    return (
        <div className="my-2 px-2 py-3 space-y-3 bg-gray-50 h-auto rounded-md border-2 border-gray-400/80 shadow-md">
            <PostHeader
                profilePic={post.profilePic}
                createdAt={post.createdAt}
                userName={post.userName}
                post={post.post}
            />
            <PostBody
                userName={post.userName}
                image={post.image}
                post={post.post}
            />
            <PostFooter
                userName={post.userName}
                like={post.like}
                comment={post.comments}
                share={post.share}
            />
        </div>
    );
};

export default Posts;
