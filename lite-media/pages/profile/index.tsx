import type { NextPage } from "next";
import React, { memo } from "react";
import Home from "../../components/home/index";
import Navbar from "../../components/navbar";
import ProfileBody from "../../components/profile/profileBody";

const Index: NextPage = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="max-w-7xl h-screen w-screen mx-auto px-2 sm:px-6 lg:px-8">
                <Home>
                    <div className="p-2 h-14 bg-indigo-800 text-white">
                        <h2 className="text-2xl font-medium capitalize ">
                            Profile
                        </h2>
                        <hr className="bg-gray-500 h-1 mt-2" />
                    </div>
                    <div className="h-screen overflow-y-scroll">
                        <ProfileBody />
                    </div>
                </Home>
            </section>
        </>
    );
};

export default memo(Index);
