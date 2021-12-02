import React, { memo } from "react";
import CreatePost from "../createPost";
import ShowImage from "./showImage";
import UploadProfilePic from "./UploadProfilePic";

const AllModals = () => {
    return (
        <div className="inset-0">
            <CreatePost />
            <ShowImage />
            <UploadProfilePic />
        </div>
    );
};

export default memo(AllModals);
