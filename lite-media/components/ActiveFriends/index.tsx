import React from "react";
import useSWR from "swr";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_ADD } from "../../state/types";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../../util";
import { userInterface } from "../../util/interfaces";
import ActiveFriendsBodySkeleton from "../progress/activeFriendsBodySkeleton";
import ActiveFriendsBody from "./activeFriendsBody";

const ActiveFriends = () => {
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
        <section className="bg-gray-100 rounded h-1/2 overflow-hidden mt-3">
            <div>
                <div className="p-2 flex justify-center">
                    <h2 className="text-xl font-medium">Active Friends</h2>
                </div>
                <hr className="bg-green-300 h-[.15rem]" />
            </div>
            <div className="h-[20rem] overflow-y-scroll">
                {data?.activeUser?.length > 0 ? (
                    data?.activeUser?.map((item: userInterface) => (
                        <ActiveFriendsBody key={item?._id} item={item} />
                    ))
                ) : (
                    <ActiveFriendsBodySkeleton />
                )}
            </div>
        </section>
    );
};

export default ActiveFriends;
