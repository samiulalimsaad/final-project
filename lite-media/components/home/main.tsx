import type { NextPage } from "next";
import { memo } from "react";
import Posts from "../posts";

const Main: NextPage = () => {
    return (
        <div>
            <section className="pb-32 bg-gray-300 h-screen w-full drop-shadow-md rounded-sm shadow-lg overflow-y-scroll">
                <Posts />
            </section>
        </div>
    );
};

export default memo(Main);
