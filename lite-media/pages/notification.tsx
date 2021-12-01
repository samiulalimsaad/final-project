import type { NextPage } from "next";
import { useRouter } from "next/router";
import Home from "../components/home/index";
import Navbar from "../components/navbar";

const Index: NextPage = () => {

    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="max-w-7xl h-screen w-screen mx-auto px-2 sm:px-6 lg:px-8">
                <Home>Notification</Home>
            </section>
        </>
    );
};

export default Index;
