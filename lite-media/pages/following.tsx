import type { NextPage } from "next";
import React, { memo } from "react";
import useSWR from "swr";
import SuggestedUserBody from "../components/ExploreUser/suggestedUserBody";
import Layout from "../components/Layout";
import Loading from "../components/progress/Loading";
import { GetState } from "../state/stateProvider";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../util";

const Index: NextPage = () => {
    const { uid } = GetState();
    const { data, error } = useSWR(NODE_SERVER(`/following/${uid}`), fetcher, {
        refreshInterval: REFRESH_INTERVAL,
    });

    return (
        <Layout title="Followings">
            {error ? (
                <div>failed to load</div>
            ) : data?.followings ? (
                data?.followings?.map((user: any) => (
                    <div key={user._id}>
                        <SuggestedUserBody user={user} />
                        <hr className="border-b border-indigo-300" />
                    </div>
                ))
            ) : (
                <Loading transparent />
            )}
        </Layout>
    );
};

export default memo(Index);
