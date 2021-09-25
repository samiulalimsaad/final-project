import type { NextPage } from "next";
import React from "react";
import LeftSide from "./left";
import Main from "./main";
import RightSide from "./right";

const Home: NextPage = () => {
    return (
        <section className="grid grid-cols-3 justify-center gap-4">
            <LeftSide />
            <Main />
            <RightSide />
        </section>
    );
};

export default Home;
