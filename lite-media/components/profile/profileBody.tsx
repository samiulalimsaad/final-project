import { ChatAltIcon } from "@heroicons/react/outline";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useCallback } from "react";
import useSWR from "swr";
import { GetState } from "../../state/stateProvider";
import { SHOW_IMAGE } from "../../state/types";
import { fetcher, NODE_SERVER } from "../../util";
import { postInterface } from "../../util/interfaces";
import SinglePost from "../home/posts/singlePost";

const ProfileBody = ({ id }: { id?: string | string[] }) => {
    const { uid, dispatch } = GetState();

    const { data, error } = useSWR(NODE_SERVER(`/user/${id || uid}`), fetcher);
    if (error) {
        alert(error);
    }
        const addFollow = useCallback(async () => {
        try {
            const follower = await axios.post(
                NODE_SERVER(`/follower/${data?.user?._id}/${uid}`)
            );
            const following = await axios.post(
                NODE_SERVER(`/following/${uid}/${data?.user?._id}`)
            );
            if (follower.data.success && following.data.success) {
                alert('following added');
            }
        } catch (error) {
            alert(error);
        }
    }, [uid, data?.user?._id]);

    const removeFollow = useCallback(async () => {
        console.log("clicked");
        try {
            const follower = await axios.delete(
                NODE_SERVER(`/follower/${data?.user?._id}/${uid}`)
            );
            const following = await axios.delete(
                NODE_SERVER(`/following/${uid}/${data?.user?._id}`)
            );
            if (follower.data.success && following.data.success) {
                alert("following removed");
            }
        } catch (error) {
            alert(error);
        }
    }, [uid, data?.user?._id]);


    return (
        <div>
            {/* Cover photo Start */}
            <div className="relative mb-16">
                <div
                    className="relative h-48 w-full bg-gray-500/50"
                    onClick={() =>
                        dispatch({
                            type: SHOW_IMAGE,
                            payload: {
                                imageSrc: data?.user?.coverPic || "/cover.jpg",
                            },
                        })
                    }
                >
                    <Image
                        className="object-center object-cover "
                        src={data?.user?.coverPic || "/cover.jpg"}
                        alt="post image"
                        layout="fill"
                    />
                </div>
                {/* Profile photo Start */}

                <div className="absolute -bottom-12 px-2 w-full flex justify-between">
                    <div
                        className="relative h-28 w-28 rounded-full border-2 border-gray-500 bg-white overflow-hidden"
                        onClick={() =>
                            dispatch({
                                type: SHOW_IMAGE,
                                payload: {
                                    imageSrc:
                                        data?.user?.profilePic ||
                                        "/userIcon.png",
                                },
                            })
                        }
                    >
                        <Image
                            className="object-center object-cover "
                            src={data?.user?.profilePic || "/userIcon.png"}
                            alt="post image"
                            layout="fill"
                        />
                    </div>
                    {/* Message Follow Section Start */}

                    {id && (
                        <div className="mt-16 flex items-center justify-center">
                            <button className="items-center mr-2 group w-full flex justify-center py-1 px-3 transition ease-in-out duration-500 border border-indigo-700 text-sm font-medium rounded-full text-indigo-500 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <ChatAltIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                            <div className="flex items-center mr-2">
                                {data?.user?.following?.map((v: { _id: string; })=>v._id).includes(uid!) ? (
                                    <button
                                        className="group w-full text-xl flex justify-center py-1 px-3 transition ease-in-out duration-500 border border-indigo-700 font-medium rounded-full text-white bg-indigo-500 hover:text-indigo-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={removeFollow}
                                    >
                                        Following
                                    </button>
                                ) : (
                                    <button
                                        className="group w-full text-xl flex justify-center py-1 px-3 transition ease-in-out duration-500 border border-indigo-700 font-medium rounded-full text-indigo-500 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={addFollow}
                                    >
                                        Follow
                                    </button>
                                )}
                            </div>
                            {/* Message Follow Section End */}
                        </div>
                    )}
                </div>
                {/* Profile photo End */}
            </div>
            {/* Cover photo End */}

            {/* Name Start */}
            <div className="flex items-center justify-between px-2">
                <div>
                    <h1 className="flex space-x-2 font-semibold text-4xl">
                        <h2 className="capitalize">
                            {data?.user?.name.firstName}
                        </h2>
                        {/* {data?.user?.name.midName && <h2 className='capitalize'>{data?.user?.name.midName}</h2>} */}
                        <h2 className="capitalize">
                            {data?.user?.name.lastName}
                        </h2>
                    </h1>
                    <h3 className="text-xs text-gray-600">
                        @{data?.user?.name.fullName.split(" ").join("_")}
                    </h3>
                </div>
                {!id ? (
                    <div className="flex flex-col justify-center pr-2">
                        <Link href="/followers" passHref>
                            <a className="text-blue-600 hover:underline active:text-red-400">
                                {data?.user?.follower?.length} Follower
                            </a>
                        </Link>
                        <Link href="/followings" passHref>
                            <a className="text-blue-600 hover:underline active:text-red-400">
                                {data?.user?.following?.length} Following
                            </a>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center pr-2">
                        <span className="text-blue-600">
                            {`${data?.user?.follower?.length} ${
                                data?.user?.follower?.length > 1
                                    ? "Followers"
                                    : "Follower"
                            }`}
                        </span>
                        <span className="text-blue-600">
                            {`${data?.user?.following?.length} ${
                                data?.user?.following?.length > 1
                                    ? "Followings"
                                    : "Following"
                            }`}
                        </span>
                    </div>
                )}
            </div>
            {/* Name End*/}
            {/* Bio Start */}
            <div className="flex space-x-2 py-4 px-2">
                {data?.user?.bio ? (
                    <p className="capitalize">{data?.user?.bio}</p>
                ) : (
                    <p className="capitalize">add bio</p>
                )}
            </div>
            <div className="flex justify-between space-x-4 py-4 px-2">
                <p className="capitalize">
                    {data?.user?.contact?.tel || "add tel"}
                </p>
                <p className="capitalize">
                    {data?.user?.contact?.email || "add email"}
                </p>
                <p className="capitalize">
                    {data?.user?.createdAt || "add joined"}
                </p>
            </div>
            <div className="flex space-x-4 py-4 px-2">
                <p className="capitalize">
                    {data?.user?.contact?.houseNumber || "add houseNumber"}
                </p>
                <p className="capitalize">
                    {data?.user?.contact?.street || "add street"}
                </p>
                <p className="capitalize">
                    {data?.user?.contact?.city || "add city"}
                </p>
            </div>
            <hr className="h-1" />
            <div className="pb-18">
                {data?.user?.post &&
                    [...data?.user?.post]
                        .reverse()
                        .map((v: postInterface) => (
                            <SinglePost post={v} userId={data?.user?._id} userName={data?.user?.name?.fullName} key={v._id} />
                        ))}
            </div>
        </div>
    );
};

export default memo(ProfileBody);
