import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import useSWR from "swr";
import Layout from "../../components/Layout";
import Conversation from "../../components/messageCopy";
import { fetcher, NODE_SERVER } from "../../util";

const Index: NextPage = () => {
    const id = useRouter().query.id;

    const { data, error } = useSWR(NODE_SERVER(`/user/${id}`), fetcher);

    if (error) alert(error);
    return (
        <Layout>
            <Conversation
                conversationName={data?.user?.name?.fullName}
                conversationId={`${id!}`}
            />
        </Layout>
    );
};

export default memo(Index);
