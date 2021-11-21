import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { memo,useCallback } from "react";
import { GetState } from "../../../state/stateProvider";
import { NODE_SERVER } from "../../../util";

interface itemInterface {
    item: {
        _id: string;
        profilePic: string;
        following:[string];
        name: {
            fullName: string;
        };
    };
}

const SuggestedUserBody = ({ item }: itemInterface) => {
    const { uid } = GetState();
    
    const addFollow = useCallback(async () => {
       try {
            const follower = await axios.post(NODE_SERVER(`/follower/${item._id}`), {
            following: uid,
        });
        const following = await axios.post(NODE_SERVER(`/following/${uid}`), {
            follower: item._id,
        });
        if (follower.data.success && following.data.success) {
        }
       } catch (error) {
         alert(error)  
       }
    },[])

    const removeFollow = useCallback(async () => {
        console.log("clicked")
       try {
            const follower = await axios.delete(NODE_SERVER(`/follower/${item._id}`), {
            following: uid,
        });
        const following = await axios.delete(NODE_SERVER(`/following/${uid}`), {
            follower: item._id,
        });
        if (follower.data.success && following.data.success) {
            alert(follower.data.message)  
        }
       } catch (error) {
         alert(error)  
       }
    },[])

    console.log({item})

    return (
        <div className="flex items-center p-1 text-sm transition ease-in-out duration-500 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
            <div className="flex items-center justify-between w-full">
                <div className="flex truncate">
                    <div className="pl-2 flex ">
                        <Link href={`/profile/${item._id}`} passHref>
                            <h4 className="font-semibold flex">
                                <div className="overflow-hidden rounded-full border border-gray-500">
                                    <div className="relative h-8 w-8">
                                        <Image
                                            className="object-center object-cover "
                                            src={
                                                item?.profilePic ||
                                                "/userIcon.png"
                                            }
                                            alt={item?.name?.fullName || "fake"}
                                            layout="fill"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <a className="ml-3 capitalize text-sm">
                                        {item.name.fullName}
                                    </a>
                                    <a className="ml-3 lowercase text-xs font-light">
                                        @
                                        {item.name.fullName
                                            .split(" ")
                                            .join("_")}
                                    </a>
                                </div>
                            </h4>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center mr-2">
                    {item?.follower?.includes(uid)?(<button
                        className="group w-full flex justify-center py-1 px-3 transition ease-in-out duration-500 border border-indigo-700 text-sm font-medium rounded-full text-indigo-500 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={removeFollow}
                    >
                        Following
                    </button>):(<button
                        className="group w-full flex justify-center py-1 px-3 transition ease-in-out duration-500 border border-indigo-700 text-sm font-medium rounded-full text-indigo-500 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={addFollow}
                    >
                        Follow
                    </button>)}
                </div>
            </div>
        </div>
    );
};

export default memo(SuggestedUserBody);
