import type { NextPage } from "next";
import Home from "../components/home/index";
import Navbar from "../components/navbar";

const Index: NextPage = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8 bg-red-200">
                <Home />
                <h1>Hello</h1>
            </section>
        </>
    );
};

export default Index;
