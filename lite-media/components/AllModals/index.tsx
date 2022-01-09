import React, { memo, useEffect } from "react";
import { GetState } from "../../state/stateProvider";
import { PROGRESS } from "../../state/types";
import CreatePost from "../createPost";
import ShowImage from "./showImage";
import UploadCoverPic from "./UploadCoverPic";
import UploadProfilePic from "./UploadProfilePic";

const AllModals = () => {
    const { dispatch, notification } = GetState();
    useEffect(() => {
        dispatch({ type: PROGRESS, payload: { progress: 0 } });
    }, [dispatch]);

    return (
        <div className="inset-0">
            <CreatePost />
            <ShowImage />
            <UploadProfilePic />
            <UploadCoverPic />
            {/* <NotificationBody /> */}
        </div>
    );
};

export default memo(AllModals);
