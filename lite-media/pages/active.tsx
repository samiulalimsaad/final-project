import React from "react";
import useSWR from "swr";
import ActiveFriendsBody from "../components/ActiveFriends/activeFriendsBody";
import Layout from "../components/Layout";
import ActiveFriendsBodySkeleton from "../components/progress/activeFriendsBodySkeleton";
import { GetState } from "../state/stateProvider";
import { NOTIFICATION_ADD } from "../state/types";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../util";
import { userInterface } from "../util/interfaces";

const Active = () => {
    const { uid, dispatch } = GetState();

    const { data, error } = useSWR(
        NODE_SERVER(`/active-user/${uid}`),
        fetcher,
        { refreshInterval: REFRESH_INTERVAL }
    );
    if (error) {
        dispatch({
            type: NOTIFICATION_ADD,
            payload: { type: "error", text: error },
        });
    }

    return (
        <Layout title="Active Friends">
            {data?.activeUser?.length > 0 ? (
                data?.activeUser?.map((item: userInterface) => (
                    <ActiveFriendsBody key={item?._id} item={item} />
                ))
            ) : (
                <ActiveFriendsBodySkeleton />
            )}
        </Layout>
    );
};

export default Active;
