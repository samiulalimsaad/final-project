import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import useSWR from "swr";
import Layout from "../../components/Layout";
import Conversation from "../../components/message";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_ADD } from "../../state/types";
import { fetcher, NODE_SERVER } from "../../util";

const Index: NextPage = () => {
    const id = useRouter().query.id;
    const { dispatch } = GetState();

    const { data, error } = useSWR(NODE_SERVER(`/user/${id}`), fetcher);

    if (error) {
        dispatch({
            type: NOTIFICATION_ADD,
            payload: { type: "error", text: error },
        });
    }
    return (
        <Layout title={data?.user?.name?.fullName}>
            <Conversation
                conversationName={data?.user?.name?.fullName}
                conversationId={`${id!}`}
            />
        </Layout>
    );
};

export default memo(Index);
