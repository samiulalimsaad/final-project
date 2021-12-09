import axios from "axios";
import { useEffect, useState } from "react";
import { GetState } from "../../state/stateProvider";
import { NODE_SERVER } from "../../util";
import { postInterface } from "../../util/interfaces";
import AddComment from "./AddComment";
import Comments from "./Comments";
import SinglePost from "./singlePost";

const DetailsPost = ({ postId }: any) => {
    const { uid } = GetState();
    const [post, setPost] = useState<postInterface>();
    useEffect(() => {
        (async function () {
            const { data } = await axios.get(
                NODE_SERVER(`/post/${uid}/${postId}`)
            );
            console.log(data?.post);
            setPost(data?.post);
        })();
    }, [postId, uid]);
    return (
        <div className="h-screen relative">
            {post?._id && (
                <>
                    <SinglePost
                        post={post!}
                        userName={post?.user?.name?.fullName!}
                        userId={post?.user?._id!}
                        noBorder
                    />
                    <div className="h-32">
                        <Comments />
                    </div>
                    <AddComment postId={post?._id} />
                </>
            )}
        </div>
    );
};

export default DetailsPost;
