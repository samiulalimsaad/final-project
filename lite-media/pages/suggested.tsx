import type { NextPage } from "next";
import Home from "../components/home/index";
import Layout from "../components/Layout";

const Index: NextPage = () => {
    return (
        <Layout title="Suggested">
            <Home>Suggested</Home>
        </Layout>
    );
};

export default Index;
