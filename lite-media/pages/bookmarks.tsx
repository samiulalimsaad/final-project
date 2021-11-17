import type { NextPage } from "next";
import React, { memo } from "react";
import useSWR from "swr";
import Home from "../components/home/index";
import SinglePost from "../components/home/posts/singlePost";
import Navbar from "../components/navbar";
import Loading from "../components/progress/Loading";
import { GetState } from "../state/stateProvider";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../util";
import BookmarkBody from '../components/BookmarkBody';

const Index: NextPage = () => {
    const { uid } = GetState();

    const { data, error } = useSWR(NODE_SERVER(`/bookmark/${uid}`), fetcher, {
        refreshInterval: REFRESH_INTERVAL,
    });
    console.log({ data });

    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="max-w-7xl h-screen w-screen mx-auto px-2 sm:px-6 lg:px-8">
                <Home>
                    <div className="relative">
                        <div className="absolute inset-0 p-2 h-14 bg-indigo-800 text-white">
                            <h2 className="text-2xl font-medium capitalize ">
                                Bookmarks
                            </h2>
                            <hr className="bg-gray-500 h-1 mt-2" />
                        </div>
                    </div>
                    <div className="relative mt-12 pb-32 h-screen overflow-y-scroll space-y-5">
                        {error ? (
                            <div>failed to load</div>
                        ) : data?.bookmarks ? (
                            <BookmarkBody bookmark={data?.bookmarks.bookmark} />
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
