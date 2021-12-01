import type { NextPage } from "next";
import React, { memo } from "react";
import useSWR from "swr";
import SuggestedUserBody from "../components/home/ExploreUser/suggestedUserBody";
import Home from "../components/home/index";
import Navbar from "../components/navbar";
import Loading from "../components/progress/Loading";
import { GetState } from "../state/stateProvider";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../util";

const Index: NextPage = () => {
    const { uid } = GetState();
    const { data, error } = useSWR(NODE_SERVER(`/following/${uid}`), fetcher, {
        refreshInterval: REFRESH_INTERVAL,
    });

    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="max-w-7xl h-screen w-screen mx-auto px-2 sm:px-6 lg:px-8">
                <Home>
                    <div className="p-2 h-14 bg-indigo-700 text-white">
                        <h2 className="text-2xl font-medium capitalize ">
                            Followings
                        </h2>
                        <hr className="bg-gray-500 h-1 mt-2" />
                    </div>
                    <div className="mt-2 h-screen overflow-y-scroll space-y-5">
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
                    </div>
                </Home>
            </section>
        </>
    );
};

export default memo(Index);
