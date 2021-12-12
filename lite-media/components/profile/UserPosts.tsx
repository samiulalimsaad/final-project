import React from "react";
import useSWR from "swr";
import { fetcher, NODE_SERVER } from "../../util";
import { postInterface } from "../../util/interfaces";
import SinglePost from "../posts/singlePost";

const UserPosts = ({ id }: { id?: string | string[] }) => {
    const { data, error } = useSWR(NODE_SERVER(`/user/posts/${id}`), fetcher);
    if (error) {
        alert(error);
    }

    return (
        <>
            {data?.post &&
                [...data?.post].map((v: postInterface) => (
                    <SinglePost
                        post={v}
                        userId={v?.user?._id}
                        userName={v?.user?.name?.fullName}
                        key={v._id}
                    />
                ))}
        </>
    );
};

export default UserPosts;
