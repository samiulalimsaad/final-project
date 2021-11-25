import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import useSWR from "swr";
import { GetState } from "../../state/stateProvider";
import { NODE_SERVER, fetcher, REFRESH_INTERVAL } from "../../util";
import trends from "../../util/trends.json";
const ActiveFriends = () => {

    const {uid} = GetState()

    console.log({uid})

    const { data, error } = useSWR(
        NODE_SERVER(`/active-user/${uid}`),
        fetcher,
        { refreshInterval: REFRESH_INTERVAL }
    );    
  

    return (
        <section className="bg-gray-200 border border-gray-500 rounded overflow-hidden mt-3">
            <div>
                <div className="px-2">
                    <h2 className="text-xl font-medium">Active Friends</h2>
                </div>
                <hr className="bg-gray-500 h-1" />
            </div>
            <div className="h-[20rem] overflow-y-scroll">
                {data?.activeUser?
                    .map((item) => (
                        <div key={item._id}>
                            <div className="flex items-center p-1 text-sm transition ease-in-out duration-500 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex truncate">
                                        <div className="pl-2 flex ">
                                            <Link
                                                href={`/message/${item._id}`}
                                                passHref
                                            >
                                                <h4 className="font-semibold flex">
                                                    <div className="overflow-hidden rounded-full border border-gray-500">
                                                        <div className="relative h-7 w-7">
                                                            <Image
                                                                className="object-center object-cover "
                                                                src={item?.profilePic || "/userIcon.png"}
                                                                alt={item.name.fullName}
                                                                layout="fill"
                                                            />
                                                        </div>
                                                    </div>
                                                    <a className="ml-3 capitalize">
                                                        {item.name.fullName}
                                                    </a>
                                                </h4>
                                            </Link>
                                        </div>
                                    </div>
                                    <span className="mr-3 h-2 w-2 bg-green-500 rounded-full">
                                        {/* <span className="h-11 w-11 bg-green-600 "></span> */}
                                    </span>
                                </div>
                            </div>
                            <hr className="border-b border-indigo-300" />
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default memo(ActiveFriends);
