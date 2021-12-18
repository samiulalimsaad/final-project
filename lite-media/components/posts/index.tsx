import React, { memo } from "react";
import useSWR from "swr";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_ADD } from "../../state/types";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../../util";
import { postInterface } from "../../util/interfaces";
import PostSkeleton from "../progress/PostSkeleton";
import SinglePost from "./singlePost";

const Posts = () => {
    const { uid, dispatch } = GetState();

    const { data, error } = useSWR(NODE_SERVER(`/post/all/${uid}`), fetcher, {
        refreshInterval: REFRESH_INTERVAL,
    });
    if (error) {
        dispatch({
            type: NOTIFICATION_ADD,
            payload: { type: "error", text: error },
        });
    }
    return (
        <div>
            {!data ? (
                <PostSkeleton />
            ) : (
                data?.posts?.map((v: postInterface) => (
                    <SinglePost
                        post={v}
                        key={v._id}
                        userName={""}
                        userId={""}
                    />
                ))
            )}
        </div>
    );
};

export default memo(Posts);
