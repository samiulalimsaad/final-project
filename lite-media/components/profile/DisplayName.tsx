import Link from "next/link";
import React from "react";
import { userInterface } from "../../util/interfaces";

interface displayNameInterface {
    id: string;
    name: {
        firstName: string;
        lastName: string;
        fullName: string;
    };
    following: userInterface[];
    follower: userInterface[];
}

const DisplayName = ({
    name,
    id,
    follower,
    following,
}: displayNameInterface) => {
    return (
        <>
            <div>
                <h1 className="flex space-x-2 font-semibold text-4xl">
                    <span className="capitalize">{name?.firstName}</span>
                    {/* {data?.user?.name?.midName && <h2 className='capitalize'>{data?.user?.name?.midName}</h2>} */}
                    <span className="capitalize">{name?.lastName}</span>
                </h1>
                <h3 className="text-xs text-gray-600">
                    @{name?.fullName?.split(" ").join("_")}
                </h3>
            </div>
            {!id ? (
                <div className="flex flex-col justify-center pr-2">
                    <Link href="/followers" passHref>
                        <a className="text-blue-600 hover:underline active:text-red-400">
                            {follower?.length} Follower
                        </a>
                    </Link>
                    <Link href="/followings" passHref>
                        <a className="text-blue-600 hover:underline active:text-red-400">
                            {following?.length} Following
                        </a>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col justify-center pr-2">
                    <span className="text-blue-600">
                        {`${follower?.length} ${
                            follower?.length > 1 ? "Followers" : "Follower"
                        }`}
                    </span>
                    <span className="text-blue-600">
                        {`${following?.length} ${
                            following?.length > 1 ? "Followings" : "Following"
                        }`}
                    </span>
                </div>
            )}
        </>
    );
};

export default DisplayName;
