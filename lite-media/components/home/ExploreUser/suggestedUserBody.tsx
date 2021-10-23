import Image from "next/image";
import Link from "next/link";
import React,{memo} from "react";

interface itemInterface {
    item: {
        userId: string;
        profilePic: string;
        name: {
            fullName: string;
        };
    };
}

const SuggestedUserBody = ({ item }: itemInterface) => {
    return (
        <div className="flex items-center p-1 text-sm transition ease-in-out duration-500 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
            <div className="flex items-center justify-between w-full">
                <div className="flex truncate">
                    <div className="pl-2 flex ">
                        <Link href={`/profile/${item.userId}`} passHref>
                            <h4 className="font-semibold flex">
                                <div className="overflow-hidden rounded-full border border-gray-500">
                                    <div className="relative h-8 w-8">
                                        <Image
                                            className="object-center object-cover "
                                            src="/userIcon.png"
                                            alt={item?.name?.fullName || "fake"}
                                            layout="fill"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <a className="ml-3 capitalize text-sm">
                                        {item.name.fullName}
                                    </a>
                                    <a className="ml-3 capitalize text-xs font-light">
                                        @{item.userId}
                                    </a>
                                </div>
                            </h4>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center mr-2">
                    <button className="group w-full flex justify-center py-1 px-3 transition ease-in-out duration-500 border border-indigo-700 text-sm font-medium rounded-full text-indigo-500 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Follow
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(SuggestedUserBody);
