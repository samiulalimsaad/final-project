import type { NextPage } from "next";
import Head from "next/head";
import Posts from "./posts";
import Story from "./story";

const Main: NextPage = () => {
    return (
        <div>
            {/* <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head> */}
            <section className="pt-2 bg-gray-300 h-screen w-full drop-shadow-md rounded-sm shadow-lg overflow-y-scroll">
                <Story/>
                <Posts/>
                <Posts/>
                <Posts/>
                <Posts/>
                <Posts/>
                <Posts/>
                <Posts/>
                <Posts/>
                <Posts/>
                <Posts/>
                <Posts/>
                <Posts/>
            </section>
        </div>
    );
};

export default Main;
