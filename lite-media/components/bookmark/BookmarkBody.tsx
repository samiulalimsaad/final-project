import React from "react";
import { postInterface } from "../../util/interfaces";
import SinglePost from "../posts/singlePost";

const BookmarkBody = ({ bookmark }: { bookmark: postInterface[] }) => {
    if (!bookmark.length) {
        return (
            <section className="h-full grid place-items-center">
                <h3 className="text-2xl font-semibold">Bookmark is empty</h3>
            </section>
        );
    }
    return (
        <section>
            {[...bookmark]?.reverse().map((v: postInterface) => (
                <SinglePost post={v} key={v._id} userName={""} userId={""} />
            ))}
        </section>
    );
};

export default BookmarkBody;
