import type { NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import SettingBody from "../components/settings";

const Index: NextPage = () => {
    return (
        <Layout title="settings">
            <SettingBody />
        </Layout>
    );
};

export default Index;
