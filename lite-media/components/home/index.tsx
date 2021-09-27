import type { NextPage } from "next";
import React from "react";
import LeftSide from "./left";
import Main from "./main";
import RightSide from "./right";

const Home: NextPage = ({children}) => {
    return (
        <section className="grid grid-cols-8 justify-center divide-x-8 divide-gray-50">
            <div className="col-span-2">
            <LeftSide />
            </div>
            <div className="col-span-4">
                {children}
            </div>
            <div className="col-span-2">
            <RightSide />
            </div>
        </section>
    );
};

export default Home;
