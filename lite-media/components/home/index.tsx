import type { NextPage } from "next";
import React from "react";
import CreatPost from "../createPost";
import LeftSide from "./left";
import RightSide from "./right";

const Home: NextPage = ({ children }) => {
    return (
        <section className="grid grid-cols-8 justify-center divide-x-8 divide-gray-50">
            <div className="col-span-2">
                <LeftSide />
            </div>
            <div className="col-span-4">{children}</div>
            <div className="col-span-2">
                <RightSide />
            </div>
            <div className="inset-0">
                <CreatPost />
            </div>
        </section>
    );
};

export default Home;
