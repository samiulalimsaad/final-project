import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import Explore from "../../components/explore";
import Home from "../../components/home/index";
import Navbar from "../../components/navbar";

const Index: NextPage = () => {
    const id = useRouter().query.id;

    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="max-w-7xl h-screen w-screen mx-auto px-2 sm:px-6 lg:px-8">
                <Home>
                    <div className="p-2 h-14 bg-indigo-700 text-white">
                        <h2 className="text-2xl font-medium capitalize ">
                            Explore
                        </h2>
                        <hr className="bg-gray-500 h-1 mt-2" />
                    </div>
                    <Explore />
                </Home>
            </section>
        </>
    );
};

export default memo(Index);
