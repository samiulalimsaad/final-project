import Link from "next/link";
import React, { memo } from "react";
import useSWR from "swr";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_ADD } from "../../state/types";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../../util/index";
import UserLoadingSkeleton from "../progress/UserLoadingSkeleton";
import SuggestedUserBody from "./suggestedUserBody";

const Suggested = () => {
    const { uid, dispatch } = GetState();

    const { data, error } = useSWR(
        NODE_SERVER(`/suggested-user/${uid}`),
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
        <section className=" h-1/2 bg-gray-100 rounded overflow-hidden">
            <div>
                <div className="p-1 flex justify-center">
                    <h2 className="text-xl font-medium">Suggested</h2>
                </div>
                <hr className="bg-blue-300 h-[.1rem]" />
            </div>
            <div className="h-72 relative overflow-y-scroll">
                {error ? (
                    <div>failed to load</div>
                ) : data?.suggestedUser?.length > 0 ? (
                    data?.suggestedUser?.map((user: any) => (
                        <div key={user._id}>
                            <SuggestedUserBody user={user} />
                            <hr className="border-b border-indigo-300" />
                        </div>
                    ))
                ) : (
                    <UserLoadingSkeleton />
                )}
            </div>
            <div className="border-t border-blue-300 p-1">
                <Link href="/explore">
                    <a className="py-2 px-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        See more
                    </a>
                </Link>
            </div>
        </section>
    );
};

export default memo(Suggested);
