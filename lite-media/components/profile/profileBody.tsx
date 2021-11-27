import { ChatAltIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { GetState } from "../../state/stateProvider";
import { SHOW_IMAGE } from "../../state/types";
import { fetcher, NODE_SERVER } from "../../util";
import { postInterface, userInterface } from "../../util/interfaces";
import SinglePost from "../home/posts/singlePost";

const ProfileBody = () => {
    const { uid, dispatch } = GetState();

    const { data, error } = useSWR(NODE_SERVER(`/user/${uid}`), fetcher);
    if (error) {
        alert(error);
    }
    // data && const { coverPic, profilePic, name, data?.user?.follower, bio } = data?.user?. as userInterface;
    return (
        <div>
            {/* Cover photo Start */}
            <div className="relative mb-16">
                <div
                    className="relative h-48 w-full bg-gray-500/50"
                    onClick={() =>
                        dispatch({
                            type: SHOW_IMAGE,
                            payload: { imageSrc: data?.user?.coverPic || "/cover.jpg" },
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
                                    imageSrc: data?.user?.profilePic || "/userIcon.png",
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

                   <div className='mt-16 flex items-center justify-center'>
                        <button className="items-center mr-2 group w-full flex justify-center py-1 px-3 transition ease-in-out duration-500 border border-indigo-700 text-sm font-medium rounded-full text-indigo-500 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <ChatAltIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="flex items-center mr-2">
                        {data?.user?.follower?.includes(uid!) ? (
                            <button
                                className="group w-full text-xl flex justify-center py-1 px-3 transition ease-in-out duration-500 border border-indigo-700 font-medium rounded-full text-white bg-indigo-500 hover:text-indigo-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                // onClick={removeFollow}
                            >
                                Following
                            </button>
                        ) : (
                            <button
                                className="group w-full text-xl flex justify-center py-1 px-3 transition ease-in-out duration-500 border border-indigo-700 font-medium rounded-full text-indigo-500 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                // onClick={addFollow}
                            >
                                Follow
                            </button>
                        )}
                    </div>
            {/* Message Follow Section End */}

                   </div>
                </div>
            {/* Profile photo End */}

            </div>
            {/* Cover photo End */}

            {/* Name Start */}
            <div className='flex items-center justify-between px-2'>
            <div>
                <h1 className="flex space-x-2 font-semibold text-4xl">
                    <h2 className="capitalize">{data?.user?.name.firstName}</h2>
                    {/* {data?.user?.name.midName && <h2 className='capitalize'>{data?.user?.name.midName}</h2>} */}
                    <h2 className="capitalize">{data?.user?.name.lastName}</h2>
                </h1>
                <h3 className="text-xs text-gray-600">
                    @{data?.user?.name.fullName.split(" ").join("_")}
                </h3>
            </div>
            <div className="flex flex-col justify-center pr-2">
                <Link href="/followers" passHref>
                <a className="text-blue-600 hover:underline active:text-red-400">
                    {data?.user?.follower?.length} Follower
                </a>
                </Link>

                <Link href="/followings" passHref>
                <a className="text-blue-600 hover:underline active:text-red-400">
                    {data?.user?.following?.length} Following
                </a></Link>
                
            </div>
            </div>
            {/* Bio End*/}
            {/* Bio Start */}
            <div
                className="flex space-x-2 py-4 px-2">
            {data?.user?.bio ?
                    <p className="capitalize">{data?.user?.bio}</p>:
                    <p className="capitalize">add bio</p>
                }
            </div>
            <div
                className="flex justify-between space-x-4 py-4 px-2">
                    <p className="capitalize">{data?.user?.contact?.tel || "add tel"}</p>
                    <p className="capitalize">{data?.user?.contact?.email || "add email"}</p>
                    <p className="capitalize">{data?.user?.createdAt || "add joined"}</p>
            </div>
            <div
                className="flex space-x-4 py-4 px-2">
                    <p className="capitalize">{data?.user?.contact?.houseNumber || "add houseNumber"}</p>
                    <p className="capitalize">{data?.user?.contact?.street || "add street"}</p>
                    <p className="capitalize">{data?.user?.contact?.city || "add city"}</p>
            </div>
            <div>
                {data?.user?.post && [...data?.user?.post].reverse().map((v: postInterface) => (
                <SinglePost post={v} key={v._id} />
            ))}
            </div>
        </div>
    );
};

export default ProfileBody;
