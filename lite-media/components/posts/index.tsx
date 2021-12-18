import React, { memo } from "react";
import useSWR from "swr";
import { GetState } from "../../state/stateProvider";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../../util";
import PostSkeleton from "../progress/PostSkeleton";

const Posts = () => {
    const { uid } = GetState();

    const { data, error } = useSWR(NODE_SERVER(`/post/all/${uid}`), fetcher, {
        refreshInterval: REFRESH_INTERVAL,
    });
    if (error) {
        alert(error);
    }
    return (
        <div>
            {/* {!data ? ( */}
            <PostSkeleton />
            {/* ) : (
                data?.posts?.map((v: postInterface) => (
                    <SinglePost
                        post={v}
                        key={v._id}
                        userName={""}
                        userId={""}
                    />
                ))
            )} */}
        </div>
    );
};

export default memo(Posts);
