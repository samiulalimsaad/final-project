import { useRouter } from "next/router";
import useSWR from "swr";
import { GetState } from "../../state/stateProvider";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../../util";
import AddComment from "./AddComment";
import Comments from "./Comments";
import SinglePost from "./singlePost";

const DetailsPost = ({ postId }: any) => {
    const { uid } = GetState();
    const router = useRouter();

    const { data, error } = useSWR(
        NODE_SERVER(`/post/${uid}/${postId}`),
        fetcher,
        {
            refreshInterval: REFRESH_INTERVAL,
        }
    );
    console.log({ data });
    if (error) {
        alert(error);
    }
    if (!data?.post?._id) {
        router.replace("/");
    }
    return (
        <div className="h-screen relative">
            {data?.post?._id && (
                <div>
                    <SinglePost
                        post={data?.post!}
                        userName={data?.post?.user?.name?.fullName!}
                        userId={data?.post?.user?._id!}
                        noBorder
                    />
                    <div className="h-32">
                        <Comments comments={data?.post?.comments} />
                    </div>
                    <AddComment postId={data?.post?._id} />
                </div>
            )}
        </div>
    );
};

export default DetailsPost;
