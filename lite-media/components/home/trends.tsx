import Link from "next/link";
import React from "react";
import trends from "../../util/trends.json";
const Trends = () => {
    return (
        <section className="bg-gray-200 border border-gray-500 rounded overflow-hidden mt-3">
            <div>
                <div className="px-2">
                    <h2 className="text-xl font-medium">Top Trends</h2>
                </div>
                <hr className="bg-gray-500 h-1" />
            </div>
            <div className="h-64 overflow-y-scroll">
                {trends
                    .splice(0, 100)
                    .sort((a, b) => b.posts - a.posts)
                    .map((item, i) => (
                        <div key={item.trends}>
                            <div className="flex items-center p-1 text-sm transition ease-in-out duration-500 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex truncate">
                                        <div className="pl-2 flex">
                                            <h4 className="font-semibold">
                                                <span>{i + 1}</span>
                                                <Link href={`trends/${item.trends}`} passHref>
                                                    <a className="ml-3 capitalize">
                                                        #{item.trends}
                                                    </a>
                                                </Link>
                                            </h4>
                                            <span className="pl-5 text-sm">
                                                {item.posts}K
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-b border-indigo-300" />
                        </div>
                    ))}
            </div>
            <div className="border-t border-gray-500 p-1">
                <Link href="/suggested">
                    <a className="py-2 px-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        See more
                    </a>
                </Link>
            </div>
        </section>
    );
};

export default Trends;
