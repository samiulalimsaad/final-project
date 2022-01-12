import useSWR from "swr";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_ADD } from "../../state/types";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../../util";
import AddComment from "./AddComment";
import Comments from "./Comments";
import SinglePost from "./singlePost";

const DetailsPost = ({ postId }: { postId: string | string[] }) => {
    const { uid, dispatch } = GetState();

    const { data, error } = useSWR(
        NODE_SERVER(`/post/${uid}/${postId}`),
        fetcher,
        {
            refreshInterval: REFRESH_INTERVAL,
        }
    );

    if (error) {
        console.log(error);
        dispatch({
            type: NOTIFICATION_ADD,
            payload: { type: "error", text: error },
        });
    }

    console.log({ uid, postId });

    return (
        <div>
            {data?.post?._id ? (
                <div className="relative pb-16 h-screen overflow-y-hidden">
                    <div className="h-full overflow-y-scroll pb-24">
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
                            <div className="grid place-items-center h-1/3">
                                <h1 className="text-2xl font-semibold text-gray-400">
                                    No Comments
                                </h1>
                            </div>
                        )}
                    </div>
                    <div className="absolute left-0 right-0 bottom-[7rem]">
                        <AddComment
                            postId={data?.post?._id}
                            userId={data?.post?.user?._id}
                        />
                    </div>
                </div>
            ) : (
                <div className="h-screen overflow-y-hidden">
                    <h1 className="text-2xl font-semibold grid place-items-center h-4/5 text-gray-400">
                        No post here
                    </h1>
                </div>
            )}
        </div>
    );
};

export default DetailsPost;
