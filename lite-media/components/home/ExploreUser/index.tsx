import Link from "next/link";
import React from "react";
import suggestedUser from "../../../util/suggestedUser.json";
import SuggestedUserBody from "./suggestedUserBody";
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
                {suggestedUser.splice(0, 100).map((item) => (
                    <div key={item.userName}>
                        <SuggestedUserBody item={item} />
                        <hr className="border-b border-indigo-300" />
                    </div>
                ))}
            </div>
            <div className="border-t border-gray-500 p-1">
                <Link href="/explore">
                    <a className="py-2 px-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        See more
                    </a>
                </Link>
            </div>
        </section>
    );
};

export default Suggested;
