import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import useSWR from "swr";
import { GetState } from "../../state/stateProvider";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../../util";

const ActiveFriends = () => {
    const { uid } = GetState();

    const { data, error } = useSWR(
        NODE_SERVER(`/active-user/${uid}`),
        fetcher,
        { refreshInterval: REFRESH_INTERVAL }
    );
    if (error) alert(error);

    return (
        <section className="bg-gray-100 rounded overflow-hidden mt-3">
            <div>
                <div className="p-2 flex justify-center">
                    <h2 className="text-xl font-medium">Active Friends</h2>
                </div>
                <hr className="bg-green-300 h-[.15rem]" />
            </div>
            <div className="h-[20rem] overflow-y-scroll">
                {data?.activeUser?.map(
                    (item: {
                        _id: React.Key | null | undefined;
                        profilePic: any;
                        name: { fullName: {} | null | undefined };
                    }) => (
                        <div key={item?._id}>
                            <div className="flex items-center p-1 text-sm transition ease-in-out duration-500 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex truncate">
                                        <div className="pl-2 flex ">
                                            <Link
                                                href={`/message/${item?._id}`}
                                                passHref
                                            >
                                                <h4 className="font-semibold flex items-center justify-center">
                                                    <div className="overflow-hidden rounded-full border border-gray-500">
                                                        <Link
                                                            href={`${
                                                                item?._id ===
                                                                uid
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
                                                                    alt={`${item
                                                                        ?.name
                                                                        ?.fullName!}`}
                                                                    layout="fill"
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
                    )
                )}
            </div>
        </section>
    );
};

export default memo(ActiveFriends);
