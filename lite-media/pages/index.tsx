import type { NextPage } from "next";
import { memo } from "react";
import Home from "../components/home/index";
import Main from "../components/home/main";
import Navbar from "../components/navbar";

const Index: NextPage = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="max-w-7xl h-screen w-screen mx-auto px-2 sm:px-6 lg:px-8">
                <Home>
                    <Main />
                </Home>
            </section>
        </>
    );
};

export default memo(Index);
