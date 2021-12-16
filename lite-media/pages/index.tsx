import type { NextPage } from "next";
import { memo } from "react";
import Main from "../components/home/main";
import Layout from "../components/Layout";

const Index: NextPage = () => {
    return (
        <Layout title={""}>
            <Main />
        </Layout>
    );
};

export default memo(Index);
