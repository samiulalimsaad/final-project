import React, { memo } from "react";
import { GetState } from "../../state/stateProvider";
import AllModals from "../AllModals";
import LeftSide from "./left";
import RightSide from "./right";

const Home = ({ children }: { children: any }) => {
    const { uid } = GetState();

    return (
        <section className="grid grid-cols-8 justify-center h-[90vh] sm:divide-x-8 divide-gray-50">
            <div className="hidden sm:block sm:col-span-2 h-full">
                <LeftSide />
            </div>
            <div className="col-span-full sm:col-span-4 h-full">
                {uid && children}
            </div>
            <div className="hidden sm:block sm:col-span-2 h-full">
                <RightSide />
            </div>
            <div className="inset-0">
                <AllModals />
            </div>
        </section>
    );
};

export default memo(Home);
