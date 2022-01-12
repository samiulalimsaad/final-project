import React, { memo, useEffect } from "react";
import { GetState } from "../../state/stateProvider";
import { PROGRESS } from "../../state/types";
import CreatePost from "../createPost";
import ShowOFModal from "./showOFModal";
import UploadCoverPic from "./UploadCoverPic";
import UploadProfilePic from "./UploadProfilePic";

const AllModals = () => {
    const { dispatch } = GetState();
    useEffect(() => {
        dispatch({ type: PROGRESS, payload: { progress: 0 } });
    }, [dispatch]);

    return (
        <>
            <CreatePost />
            <ShowOFModal />
            <UploadProfilePic />
            <UploadCoverPic />
        </>
    );
};

export default memo(AllModals);
