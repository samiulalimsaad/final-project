import Image from "next/image";
import React from "react";
import { postInterface } from "../../../util/interfaces";
import PostBody from "./postBody";
import PostFooter from "./postFooter";
import PostHeader from "./postHeader";

const ShowPost = ({ post }: { post: postInterface }) => {
    return (
        <div className="grid grid-cols-5 gap-x-4">
            <div className="col-span-3 flex justify-center items-center">
                <Image
                    src={post.postImage}
                    alt="display Image"
                    height={500}
                    width={900}
                    objectFit="contain"
                />
            </div>
            <div className="p-4 col-span-2 space-y-10 bg-white ">
                <PostHeader
                    profilePic={post?.user?.profilePic}
                    createdAt={post?.createdAt}
                    userName={post?.user?.name.fullName}
                    postBody={post?.postBody}
                />
                <div className="h-1/2 overflow-y-scroll">
                <PostBody id={post?._id} post={post?.postBody} />
                </div>
                    
                <PostFooter
                    id={post?._id}
                    like={post?.like}
                    comment={post?.comments}
                    share={post?.share}
                />
                <div>Post Comments</div>
            </div>
        </div>
    );
};

export default ShowPost;
