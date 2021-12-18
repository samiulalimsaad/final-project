import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { memo } from "react";
import Layout from "../../components/Layout";
import ProfileBody from "../../components/profile/profileBody";
import Loading from "../../components/progress/Loading";
import { GetState } from "../../state/stateProvider";

const Index: NextPage = () => {
    const router = useRouter();
    const { uid } = GetState();
    const id = router.query.id;

    if (uid === id) {
        router.replace("/profile");
        return <Loading />;
    }
    return (
        <Layout title="profile">
            <ProfileBody id={id!} />
        </Layout>
    );
};

export default memo(Index);
