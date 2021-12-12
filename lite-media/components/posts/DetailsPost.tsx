import useSWR from "swr";
import { GetState } from "../../state/stateProvider";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../../util";
import AddComment from "./AddComment";
import Comments from "./Comments";
import SinglePost from "./singlePost";

const DetailsPost = ({ postId }: any) => {
    const { uid } = GetState();

    const { data, error } = useSWR(
        NODE_SERVER(`/post/${uid}/${postId}`),
        fetcher,
        {
            refreshInterval: REFRESH_INTERVAL,
        }
    );
    if (error) {
        alert(error);
    }
    return (
        <div>
            {data?.post?._id ? (
                <div className="h-screen relative pb-16">
                    <div className="h-[96%] overflow-y-scroll pb-16">
                        <SinglePost
                            post={data?.post!}
                            userName={data?.post?.user?.name?.fullName!}
                            userId={data?.post?.user?._id!}
                            noBorder
                        />
                        {data?.post?.comments?.length ? (
                            <Comments
                                comments={data?.post?.comments}
                                postId={postId}
                            />
                        ) : (
                            <div className="grid place-items-center h-1/2">
                                <h1 className="text-2xl font-semibold">
                                    No Comments
                                </h1>
                            </div>
                        )}
                    </div>
                    <div className="absolute left-0 right-0 bottom-[7rem]">
                        <AddComment postId={data?.post?._id} />
                    </div>
                </div>
            ) : (
                <div className="grid place-items-center h-full">
                    <h1 className="text-2xl font-semibold">No post here</h1>
                </div>
            )}
        </div>
    );
};

export default DetailsPost;
