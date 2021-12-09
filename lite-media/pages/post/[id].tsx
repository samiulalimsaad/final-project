import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { memo } from "react";
import Layout from "../../components/Layout";
import DetailsPost from "../../components/posts/DetailsPost";

const Index: NextPage = () => {
    const router = useRouter();
    const id = router.query.id;
    return (
        <Layout title="Post">
            <DetailsPost postId={id} />
        </Layout>
    );
};

export default memo(Index);
