import Image from "next/image";
import Link from "next/link";
import React from "react";

interface itemInterface {
    item: {
        userId: string;
        profilePic: string;
        name:{
            fullName:string;
        }
    };
}

const SuggestedUserBody = ({ item }: itemInterface) => {
    return (
            <div className="flex items-center p-1 text-sm transition ease-in-out duration-500 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
                <div className="flex items-center justify-between w-full">
                    <Link href={`/profile/${item.userId}`} passHref>
                        <div className="flex truncate">
                            <div className="overflow-hidden rounded-full border border-gray-500">
                                <Image
                                    // className="absolute inset-0 h-full w-full object-center object-cover "
                                    // src={item.profilePic || "/userIcon.png"}
                                    src="/userIcon.png"
                                    alt={item.name.fullName}
                                    // layout="fill"
                                    height={50}
                                    width={50}
                                />
                            </div>
                            <div className="ml-4">
                                <h4 className="font-medium">{item.name.fullName}</h4>
                                <span className="font-thin text-sm">
                                    @{item.userId}
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
