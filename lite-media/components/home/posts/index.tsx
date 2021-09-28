import React, { useEffect, useState } from "react";
import posts from "../../../util/posts.json";
import PostBody from "./postBody";
import PostFooter from "./postFooter";
import PostHeader from "./postHeader";

const temp = posts[0];
const Posts = () => {
    const [say, setSay] = useState("")
    useEffect(() => {
        var msg = new SpeechSynthesisUtterance();
        msg.text = "Hello World";
        window.speechSynthesis.speak(msg);
    }, [say])
    return (
        <div className="my-2 px-2 py-3 space-y-3 bg-gray-50 h-auto rounded-md border-2 border-gray-400/80 shadow-md">
            <PostHeader profilePic={temp.profilePic} createdAt={temp.createdAt} userName={temp.userName} post={temp.post}/>
            <PostBody userName={temp.userName} image={temp.image} post={temp.post} />
            <PostFooter userName={temp.userName} like={temp.like} comment={temp.comments} share={temp.share} />
        </div>
    );
};

export default Posts;
