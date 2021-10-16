import type { NextPage } from "next";
import { useRouter } from "next/router";
import Home from "../components/home/index";
import Conversation from "../components/message";
import Navbar from "../components/navbar";

const Index: NextPage = () => {
    const id = useRouter().query.id;
    console.log(id);

    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="max-w-7xl h-screen w-screen mx-auto px-2 sm:px-6 lg:px-8">
                <Home><Conversation/></Home>
            </section>
        </>
    );
};

export default Index;
