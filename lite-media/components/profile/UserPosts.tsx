import React from "react";
import useSWR from "swr";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_ADD } from "../../state/types";
import { fetcher, NODE_SERVER } from "../../util";
import { postInterface } from "../../util/interfaces";
import SinglePost from "../posts/singlePost";

const UserPosts = ({ id }: { id?: string | string[] }) => {
    const { dispatch } = GetState();
    const { data, error } = useSWR(NODE_SERVER(`/user/posts/${id}`), fetcher);
    if (error) {
        dispatch({
            type: NOTIFICATION_ADD,
            payload: { type: "error", text: error },
        });
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
