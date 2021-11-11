import type { NextPage } from "next";
import { memo } from "react";
import Posts from "./posts";
import Story from "./story";

const Main: NextPage = () => {
    return (
        <div>
            <section className="pt-2 pb-16 bg-gray-300 h-screen w-full drop-shadow-md rounded-sm shadow-lg overflow-y-scroll">
                <Story/>
                <Posts/>
            </section>
        </div>
    );
};

export default memo(Main);
