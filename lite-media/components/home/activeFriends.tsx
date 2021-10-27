import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import trends from "../../util/trends.json";
const ActiveFriends = () => {
    return (
        <section className="bg-gray-200 border border-gray-500 rounded overflow-hidden mt-3">
            <div>
                <div className="px-2">
                    <h2 className="text-xl font-medium">Active Friends</h2>
                </div>
                <hr className="bg-gray-500 h-1" />
            </div>
            <div className="h-[20rem] overflow-y-scroll">
                {trends
                    .splice(0, 20)
                    .sort((a, b) => b.posts - a.posts)
                    .map((item, i) => (
                        <div key={item.trends}>
                            <div className="flex items-center p-1 text-sm transition ease-in-out duration-500 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex truncate">
                                        <div className="pl-2 flex ">
                                            <Link
                                                href={`/explore/${item.trends}`}
                                                passHref
                                            >
                                                <h4 className="font-semibold flex">
                                                    <div className="overflow-hidden rounded-full border border-gray-500">
                                                        <div className="relative h-7 w-7">
                                                            <Image
                                                                className="object-center object-cover "
                                                                src="/userIcon.png"
                                                                alt="{temp.userName}"
                                                                layout="fill"
                                                            />
                                                        </div>
                                                    </div>
                                                    <a className="ml-3 capitalize">
                                                        {item.trends}
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
