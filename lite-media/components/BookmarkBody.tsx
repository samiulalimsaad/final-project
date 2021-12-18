import React from "react";
import { postInterface } from "../util/interfaces";
import SinglePost from "./posts/singlePost";

const BookmarkBody = ({ bookmark }: { bookmark: postInterface[] }) => {
    return (
        <section>
            {[...bookmark]?.reverse().map((v: postInterface) => (
                <SinglePost post={v} key={v._id} userName={""} userId={""} />
            ))}
        </section>
    );
};

export default BookmarkBody;
