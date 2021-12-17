import type { NextPage } from "next";
import React, { memo } from "react";
import useSWR from "swr";
import BookmarkBody from "../components/BookmarkBody";
import Layout from "../components/Layout";
import PostSkeleton from "../components/progress/PostSkeleton";
import { GetState } from "../state/stateProvider";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../util";

const Index: NextPage = () => {
    const { uid } = GetState();

    const { data, error } = useSWR(NODE_SERVER(`/bookmark/${uid}`), fetcher, {
        refreshInterval: REFRESH_INTERVAL,
    });

    return (
        <Layout title="bookmarks">
            {error ? (
                <div>failed to load</div>
            ) : data?.bookmarks?.length > 0 ? (
                <BookmarkBody bookmark={data?.bookmarks.bookmark} />
            ) : data?.followings?.length === 0 ? (
                <div className="grid place-items-center h-5/6 font-semibold text-lg">
                    No Bookmarks
                </div>
            ) : (
                <PostSkeleton />
            )}
        </Layout>
    );
};

export default memo(Index);
