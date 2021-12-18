import React, { memo } from "react";
import useSWR from "swr";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_ADD } from "../../state/types";
import { fetcher, NODE_SERVER } from "../../util";
import CoverImage from "./CoverImage";
import DisplayName from "./DisplayName";
import FollowUnfollow from "./FollowUnfollow";
import ProfileImage from "./ProfileImage";
import UserSelf from "./UserInfo";
import UserPosts from "./UserPosts";

const ProfileBody = ({ id }: { id?: string | string[] }) => {
    const { uid, dispatch } = GetState();

    const { data, error } = useSWR(NODE_SERVER(`/user/${id || uid}`), fetcher);
    if (error) {
        dispatch({
            type: NOTIFICATION_ADD,
            payload: { type: "error", text: error },
        });
    }

    return (
        <div className="mb-32">
            <div className="relative mb-16">
                <CoverImage
                    image={data?.user?.coverPic || "/cover.jpg"}
                    id={data?.user?._id}
                />
                <div className="absolute z-40 -bottom-12 px-2 w-full flex justify-between">
                    <ProfileImage
                        image={data?.user?.profilePic || "/userIcon.png"}
                        id={data?.user?._id}
                    />
                    {id && (
                        <FollowUnfollow
                            id={data?.user?._id}
                            following={data?.user?.follower}
                        />
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between px-2 mb-3">
                <DisplayName
                    id={data?.user?._id}
                    name={data?.user?.name}
                    following={data?.user?.following}
                    follower={data?.user?.follower}
                />
            </div>
            <hr className="h-1 bg-gray-100" />
            <div className="mb-4">
                <UserSelf
                    id={data?.user?._id}
                    contact={data?.user?.contact}
                    bio={data?.user?.bio}
                    createdAt={data?.user?.createdAt}
                    email={data?.user?.email}
                />
            </div>
            <hr className="h-1 bg-gray-300" />
            <div className="pb-18 mt-4">
                <UserPosts id={id || uid!} />
            </div>
        </div>
    );
};

export default memo(ProfileBody);
