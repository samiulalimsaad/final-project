import type { NextPage } from "next";
import React, { memo } from "react";
import useSWR from "swr";
import BookmarkBody from "../components/BookmarkBody";
import Layout from "../components/Layout";
import PostSkeleton from "../components/progress/PostSkeleton";
import { GetState } from "../state/stateProvider";
import { NOTIFICATION_ADD } from "../state/types";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../util";

const Index: NextPage = () => {
    const { uid, dispatch } = GetState();

    const { data, error } = useSWR(NODE_SERVER(`/bookmark/${uid}`), fetcher, {
        refreshInterval: REFRESH_INTERVAL,
    });

    if (error) {
        dispatch({
            type: NOTIFICATION_ADD,
            payload: { type: "error", text: error },
        });
    }

    return (
        <Layout title="bookmarks">
            <div className="h-full overflow-y-scroll pb-24">
                {!data ? (
                    <PostSkeleton />
                ) : data?.bookmarks?.bookmark?.length > 0 ? (
                    <BookmarkBody bookmark={data?.bookmarks?.bookmark} />
                ) : (
                    <div className="grid place-items-center h-5/6 font-semibold text-lg text-gray-400">
                        No Bookmarks
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default memo(Index);
