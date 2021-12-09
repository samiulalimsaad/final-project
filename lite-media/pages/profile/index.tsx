import type { NextPage } from "next";
import React, { memo } from "react";
import Layout from "../../components/Layout";
import ProfileBody from "../../components/profile/profileBody";

const Index: NextPage = () => {
    return (
        <Layout title="profile">
            <ProfileBody />
        </Layout>
    );
};

export default memo(Index);
