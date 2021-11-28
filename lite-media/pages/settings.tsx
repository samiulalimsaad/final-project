import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import Home from "../components/home/index";
import Navbar from "../components/navbar";
import { GetState } from "../state/stateProvider";

const Index: NextPage = () => {
    const router = useRouter();
    const { uid } = GetState();
    const id = router.query.id;

    // const { data, error } = useSWR(
    //     NODE_SERVER(`/user/${id}`),
    //     fetcher,
    //     { refreshInterval: REFRESH_INTERVAL }
    // );
    // if (error) {
    //     alert(error)
    // }

    // if (uid === id) {
    //     router.push("/Settings");
    //     return <Loading />;
    // }
    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="max-w-7xl h-screen w-screen mx-auto px-2 sm:px-6 lg:px-8">
                <Home>
                    <div className="p-2 h-14 bg-indigo-700 text-white">
                        <h2 className="text-2xl font-medium capitalize ">
                            Settings
                        </h2>
                        <hr className="bg-gray-500 h-1 mt-2" />
                    </div>
                    {/* <SettingsBody id={id!}/> */}
                </Home>
            </section>
        </>
    );
};

export default Index;
