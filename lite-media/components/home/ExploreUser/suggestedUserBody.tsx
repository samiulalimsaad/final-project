import Image from "next/image";
import Link from "next/link";
import React from "react";

interface itemInterface {
    item: {
        userName: string;
        profileImage: string;
    };
}

const SuggestedUserBody = ({ item }: itemInterface) => {
    return (
            <div className="flex items-center p-1 text-sm transition ease-in-out duration-500 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
                <div className="flex items-center justify-between w-full">
                    <Link href={`/profile/${item.userName}`} passHref>
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
                                <h4 className="font-medium">{item.userName}</h4>
                                <span className="font-thin text-sm">
                                    @{item.userName.split(" ").join("_")}
                                </span>
                            </div>
                        </div>
                    </Link>
                    <div className=" flex items-center">
                        <button className="group w-full flex justify-center py-2 px-4 transition ease-in-out duration-500 border border-indigo-700 text-sm font-medium rounded-full text-indigo-500 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Follow
                        </button>
                    </div>
            </div>
        </div>
    );
};

export default SuggestedUserBody;
