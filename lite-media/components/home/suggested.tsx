import Image from "next/image";
import Link from "next/link";
import React from "react";
import suggestedUser from "../../utils/suggestedUser.json";
const Suggested = () => {
    return (
        <section className="bg-gray-200 border border-gray-500 rounded overflow-hidden">
            <div>
                <div className="px-2">
                    <h2 className="text-xl font-medium">Suggested</h2>
                </div>
                <hr className="bg-gray-500 h-1" />
            </div>
            <div className="h-72 overflow-y-scroll">
                {suggestedUser.splice(0, 10).map((item) => (
                    <div key={item.userName}>
                        <div className="flex items-center p-1 text-sm transition ease-in-out duration-500 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex truncate">
                                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-500">
                                        <Image
                                            className="w-full h-full object-center object-cover "
                                            src={item.profileImage}
                                            alt={item.userName}
                                            layout="fill"
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-medium">
                                            {item.userName}
                                        </h4>
                                        <span className="font-thin text-sm">
                                            @
                                            {item.userName.split(" ").join("_")}
                                        </span>
                                    </div>
                                </div>
                                <div className=" flex items-center">
                                    <button className="group w-full flex justify-center py-2 px-4 transition ease-in-out duration-500 border border-indigo-700 text-sm font-medium rounded-full text-indigo-500 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Follow
                                    </button>
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

export default Suggested;
