import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { memo } from "react";
import useSWR from "swr";
import Home from "../../components/home/index";
import Navbar from "../../components/navbar";
import ProfileBody from "../../components/profile/profileBody";
import { GetState } from "../../state/stateProvider";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../../util";

const Index: NextPage = () => {
    const router = useRouter();
    const { uid } = GetState();
    const id = router.query.id;

    const { data, error } = useSWR(NODE_SERVER(`/user/${id}`), fetcher, {
        refreshInterval: REFRESH_INTERVAL,
    });
    if (error) {
        alert(error);
    }

    if (uid === id) {
        router.push("/profile");
        console.log(uid, id, uid === id);
        // return <Loading />;
    }
    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="max-w-7xl h-screen w-screen mx-auto px-2 sm:px-6 lg:px-8">
                <Home>
                    <div className="p-2 h-14 bg-indigo-700 text-white">
                        <h2 className="text-2xl font-medium capitalize ">
                            Profile
                        </h2>
                        <hr className="bg-gray-500 h-1 mt-2" />
                    </div>
                    <div className="h-screen overflow-y-scroll">
                    <ProfileBody id={id!} />
                    </div>
                </Home>
            </section>
        </>
    );
};

export default memo(Index);
