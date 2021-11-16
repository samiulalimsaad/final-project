import React from "react";
import { postInterface } from "../util/interfaces";
import SinglePost from "./home/posts/singlePost";


const BookmarkBody = ({ bookmark }: { bookmark: postInterface[] }) => {
    console.log({bookmark})
    return (
        <>
        {bookmark?.map((v: postInterface) => (
                <SinglePost post={v} key={v._id} />
            ))}</>
    );
};

export default BookmarkBody;
