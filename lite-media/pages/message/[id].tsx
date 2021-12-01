import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import useSWR from "swr";
import Home from "../../components/home/index";
import Conversation from "../../components/message";
import Navbar from "../../components/navbar";
import { fetcher, NODE_SERVER } from "../../util";

const Index: NextPage = () => {
    const id = useRouter().query.id;

    const { data, error } = useSWR(NODE_SERVER(`/user/${id}`), fetcher);

    if (error) alert(error)
    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="max-w-7xl h-screen w-screen mx-auto px-2 sm:px-6 lg:px-8">
                <Home>
                    <Conversation
                        conversationName={data?.user?.name?.fullName}
                        conversationId={`${id!}`}
                    />
                </Home>
            </section>
        </>
    );
};

export default memo(Index);
