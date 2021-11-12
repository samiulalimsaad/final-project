import { getAuth } from "firebase/auth";
import React from "react";
import useSWR from "swr";
import { fetcher, NODE_SERVER } from "../../../util";
import SinglePost from "./singlePost";

const Posts = () => {
    const auth = getAuth();

    const { data, error } = useSWR(
        NODE_SERVER(`/post/all/${auth?.currentUser?.uid}`),
        fetcher
    );
    if (error) {
        alert(error)
    }
    return (
        <>
            {data?.posts.map((v: { _id: any; }) => (
                <SinglePost post={v} key={v._id} />
            ))}
        </>
    );
};

export default Posts;
