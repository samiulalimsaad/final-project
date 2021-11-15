import { getAuth } from "firebase/auth";
import React from "react";
import useSWR from "swr";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../../../util";
import { postInterface } from "../../../util/interfaces";
import SinglePost from "./singlePost";

const Posts = () => {
    const auth = getAuth();

    const { data, error } = useSWR(
        NODE_SERVER(`/post/all/${auth?.currentUser?.uid}`),
        fetcher,
        { refreshInterval: REFRESH_INTERVAL }
    );
    if (error) {
        alert(error)
    }
    return (
        <>
            {data?.posts.map((v: postInterface) => (
                <SinglePost post={v} key={v._id} />
            ))}
        </>
    );
};

export default Posts;
