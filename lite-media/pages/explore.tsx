import type { NextPage } from "next";
import React, { memo } from "react";
import useSWR from "swr";
import SuggestedUserBody from "../components/ExploreUser/suggestedUserBody";
import Layout from "../components/Layout";
import UserLoadingSkeleton from "../components/progress/UserLoadingSkeleton";
import { GetState } from "../state/stateProvider";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../util";

const Index: NextPage = () => {
    const { uid } = GetState();

    console.log({ uid });

    const { data, error } = useSWR(
        NODE_SERVER(`/suggested-user/${uid}`),
        fetcher,
        { refreshInterval: REFRESH_INTERVAL }
    );

    if (error) {
        alert(error);
    }

    return (
        <Layout title="Explore Something New">
            {data?.suggestedUser?.length > 0 ? (
                data?.suggestedUser?.map((user: any) => (
                    <div key={user._id}>
                        <SuggestedUserBody user={user} />
                        <hr className="border-b border-indigo-300" />
                    </div>
                ))
            ) : (
                <UserLoadingSkeleton />
            )}
        </Layout>
    );
};

export default memo(Index);
