import type { NextPage } from "next";
import React, { memo } from "react";
import useSWR from "swr";
import SuggestedUserBody from "../../components/home/ExploreUser/suggestedUserBody";
import Home from "../../components/home/index";
import Navbar from "../../components/navbar";
import Loading from "../../components/progress/Loading";
import { GetState } from "../../state/stateProvider";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../../util";

const Index: NextPage = () => {
    const {uid} = GetState()

    console.log({uid})

    const { data, error } = useSWR(
        NODE_SERVER(`/suggested-user/${uid}`),
        fetcher,
        { refreshInterval: REFRESH_INTERVAL }
    );

    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="max-w-7xl h-screen w-screen mx-auto px-2 sm:px-6 lg:px-8">
                <Home>
                    <div className="relative">
                        <div className="absolute inset-0 p-2 bg-white">
                            <h2 className="text-xl font-medium capitalize">
                                Explore something new
                            </h2>
                            <hr className="bg-gray-500 h-1 mt-2" />
                        </div>
                    </div>
                    <div className="relative mt-12 h-screen overflow-y-scroll space-y-5">
                        {error ? (
                            <div>failed to load</div>
                        ) : data?.suggestedUser ? (
                            data?.suggestedUser?.map((item: any) => (
                                <div key={item._id}>
                                    <SuggestedUserBody item={item} />
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
