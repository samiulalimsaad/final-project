import type { NextPage } from "next";
import { memo } from "react";
import Layout from "../../components/Layout";
import Conversation from "../../components/message";

const Index: NextPage = () => {
    return (
        <Layout>
            <Conversation conversationName={""} conversationId={""} />
        </Layout>
    );
};

export default memo(Index);
