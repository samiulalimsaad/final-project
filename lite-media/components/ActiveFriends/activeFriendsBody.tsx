import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GetState } from "../../state/stateProvider";
import { blurBase64 } from "../../util";
import { userInterface } from "../../util/interfaces";

const ActiveFriendsBody = ({ item }: { item: userInterface }) => {
    const { uid } = GetState();
    return (
        <div>
            <div className="flex items-center p-1 text-sm transition ease-in-out duration-500 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
                <div className="flex items-center justify-between w-full">
                    <div className="flex truncate">
                        <div className="pl-2 flex ">
                            <Link href={`/message/${item?._id}`} passHref>
                                <h4 className="font-semibold flex items-center justify-center">
                                    <div className="overflow-hidden rounded-full border border-gray-500">
                                        <Link
                                            href={`${
                                                item?._id === uid
                                                    ? "/profile/"
                                                    : `/profile/${item?._id}`
                                            }`}
                                            passHref
                                        >
                                            <div className="relative h-7 w-7">
                                                <Image
                                                    className="object-center object-cover "
                                                    src={
                                                        item?.profilePic ||
                                                        "/userIcon.png"
                                                    }
                                                    alt={`${item?.name
                                                        ?.fullName!}`}
                                                    layout="fill"
                                                    placeholder="blur"
                                                    blurDataURL={blurBase64}
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                    <a className="ml-3 capitalize">
                                        {item?.name.fullName}
                                    </a>
                                </h4>
                            </Link>
                        </div>
                    </div>
                    <span className="mr-3 h-2 w-2 bg-green-500 rounded-full" />
                </div>
            </div>
            <hr className="border-b border-gray-300" />
        </div>
    );
};

export default ActiveFriendsBody;
