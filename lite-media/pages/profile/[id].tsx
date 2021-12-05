import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { memo } from "react";
import useSWR from "swr";
import Layout from "../../components/Layout";
import ProfileBody from "../../components/profile/profileBody";
import { GetState } from "../../state/stateProvider";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../../util";

const Index: NextPage = () => {
    const router = useRouter();
    const { uid } = GetState();
    const id = router.query.id;

    const { data, error } = useSWR(NODE_SERVER(`/user/${id}`), fetcher, {
        refreshInterval: REFRESH_INTERVAL,
    });
    if (error) {
        alert(error);
    }

    if (uid === id) {
        router.push("/profile");
        console.log(uid, id, uid === id);
        // return <Loading />;
    }
    return (
        <Layout title="Profile">
            <ProfileBody id={id!} />
        </Layout>
    );
};

export default memo(Index);
