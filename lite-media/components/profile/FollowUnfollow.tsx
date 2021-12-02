import { ChatAltIcon } from "@heroicons/react/outline";
import axios from "axios";
import Link from "next/link";
import React, { useCallback } from "react";
import { GetState } from "../../state/stateProvider";
import { NODE_SERVER } from "../../util";
import { userInterface } from "../../util/interfaces";

interface followUnfollowInterface {
    id: string;
    following: userInterface[];
}

const FollowUnfollow = ({ id, following }: followUnfollowInterface) => {
    const { uid, dispatch } = GetState();

    const addFollow = useCallback(async () => {
        try {
            const follower = await axios.post(
                NODE_SERVER(`/follower/${id}/${uid}`)
            );
            const following = await axios.post(
                NODE_SERVER(`/following/${uid}/${id}`)
            );
            if (follower.data.success && following.data.success) {
                alert("following added");
            }
        } catch (error) {
            alert(error);
        }
    }, [uid, id]);

    const removeFollow = useCallback(async () => {
        console.log("clicked");
        try {
            const follower = await axios.delete(
                NODE_SERVER(`/follower/${id}/${uid}`)
            );
            const following = await axios.delete(
                NODE_SERVER(`/following/${uid}/${id}`)
            );
            if (follower.data.success && following.data.success) {
                alert("following removed");
            }
        } catch (error) {
            alert(error);
        }
    }, [uid, id]);
    return (
        <div className="mt-16 flex items-center justify-center">
            <Link href={`/message/${id}`} passHref><a className="items-center mr-2 group w-full flex justify-center py-1 px-3 transition ease-in-out duration-500 border border-indigo-700 text-sm font-medium rounded-full text-indigo-500 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <ChatAltIcon className="h-6 w-6" aria-hidden="true" />
            </a></Link>
            <div className="flex items-center mr-2">
                {following?.map((v) => v._id).includes(uid!) ? (
                    <button
                        className="group w-full text-xl flex justify-center py-1 px-3 transition ease-in-out duration-500 border border-indigo-700 font-medium rounded-full text-white bg-indigo-500 hover:text-indigo-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={removeFollow}
                    >
                        Following
                    </button>
                ) : (
                    <button
                        className="group w-full text-xl flex justify-center py-1 px-3 transition ease-in-out duration-500 border border-indigo-700 font-medium rounded-full text-indigo-500 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={addFollow}
                    >
                        Follow
                    </button>
                )}
            </div>
            {/* Message Follow Section End */}
        </div>
    );
};

export default FollowUnfollow;
