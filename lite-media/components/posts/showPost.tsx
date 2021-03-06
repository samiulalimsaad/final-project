import Image from "next/image";
import React, { memo } from "react";
import { blurBase64 } from "../../util";
import { postInterface } from "../../util/interfaces";
import PostBody from "./postBody";
import PostFooter from "./postFooter";
import PostHeader from "./postHeader";

const ShowPost = ({ post }: { post: postInterface }) => {
    return (
        <div className="grid grid-cols-5 gap-x-4 h-full overflow-hidden">
            <div className="p-5 col-span-3 h-full w-full grid place-items-center">
                <Image
                    // className="fixed top-0 left-0"
                    src={post.postImage}
                    alt="display Image"
                    height={900}
                    width={1200}
                    objectFit="contain"
                    placeholder="blur"
                    blurDataURL={blurBase64}
                />
            </div>
            <div className="h-full p-4 col-span-2 space-y-10 bg-white ">
                <PostHeader
                    profilePic={post?.user?.profilePic || "/userIcon.png"}
                    createdAt={post?.createdAt}
                    userName={post?.user?.name.fullName}
                    bookmark={post?.user?.bookmark}
                    id={post?._id}
                    userId={post?.user?._id}
                />

                <div className="h-2/3 overflow-y-scroll">
                    <PostBody id={post?._id} post={post?.postBody} />
                </div>

                <PostFooter
                    id={post?._id}
                    like={post?.like}
                    comment={post?.comments}
                    share={post?.share}
                    userId={post?.user?._id}
                />
                <div>Post Comments</div>
            </div>
        </div>
    );
};

export default memo(ShowPost);
