import React from "react";
import posts from "../../../util/posts.json";
import PostBody from "./postBody";
import PostFooter from "./postFooter";
import PostHeader from "./postHeader";
import SinglePost from "./singlePost";



const Posts = () => {
    return (
        <>
            {posts.slice(0,20).map(v=>(<SinglePost post={v} key={v.userName}/>))}
        </>
    );
};

export default Posts;
