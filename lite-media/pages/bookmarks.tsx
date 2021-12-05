import type { NextPage } from "next";
import React, { memo } from "react";
import useSWR from "swr";
import BookmarkBody from "../components/bookmark/BookmarkBody";
import Layout from "../components/Layout";
import Loading from "../components/progress/Loading";
import { GetState } from "../state/stateProvider";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../util";

const Index: NextPage = () => {
    const { uid } = GetState();

    const { data, error } = useSWR(NODE_SERVER(`/bookmark/${uid}`), fetcher, {
        refreshInterval: REFRESH_INTERVAL,
    });

    return (
        <Layout title="Bookmarks">
            {error ? (
                <div>failed to load</div>
            ) : data?.bookmarks ? (
                <BookmarkBody bookmark={data?.bookmarks.bookmark} />
            ) : (
                <Loading transparent />
            )}
        </Layout>
    );
};

export default memo(Index);
