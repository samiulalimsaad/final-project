import { getAuth } from "@firebase/auth";
import Link from "next/link";
import React, { memo } from "react";
import useSWR from "swr";
import { fetcher, NODE_SERVER, REFRESH_INTERVAL } from "../../util/index";
import Loading from "../progress/Loading";
import SuggestedUserBody from "./suggestedUserBody";

const Suggested = () => {
    const auth = getAuth();

    const { data, error } = useSWR(
        NODE_SERVER(`/suggested-user/${auth?.currentUser?.uid}`),
        fetcher,
        { refreshInterval: REFRESH_INTERVAL }
    );

    return (
        <section className="min-h-[18rem] bg-gray-100 rounded overflow-hidden">
            <div>
                <div className="p-1 flex justify-center">
                    <h2 className="text-xl font-medium">Suggested</h2>
                </div>
                <hr className="bg-blue-300 h-[.1rem]" />
            </div>
            <div className="h-72 relative overflow-y-scroll">
                {error ? (
                    <div>failed to load</div>
                ) : data?.suggestedUser?.length ? (
                    data?.suggestedUser?.map((user: any) => (
                        <div key={user._id}>
                            <SuggestedUserBody user={user} />
                            <hr className="border-b border-indigo-300" />
                        </div>
                    ))
                ) : (
                    <Loading transparent />
                )}
            </div>
            <div className="border-t border-blue-300 p-1">
                <Link href="/explore">
                    <a className="py-2 px-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        See more
                    </a>
                </Link>
            </div>
        </section>
    );
};

export default memo(Suggested);
