import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { memo } from "react";
import SuggestedUserBody from "../components/home/ExploreUser/suggestedUserBody";
import Home from "../components/home/index";
import Navbar from "../components/navbar";
import suggestedUser from "../util/suggestedUser.json";
const Index: NextPage = () => {
    const id = useRouter().query.id;

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
                                Following
                            </h2>
                            <hr className="bg-gray-500 h-1 mt-2" />
                        </div>
                    </div>
                    <div className="mt-12 h-screen overflow-y-scroll space-y-5">
                        {suggestedUser.splice(0, 500).map((item) => (
                            <div key={item.userName}>
                                <SuggestedUserBody item={item} />
                                <hr className="border-b border-gray-300/50" />
                            </div>
                        ))}
                    </div>
                </Home>
            </section>
        </>
    );
};

export default memo(Index);
