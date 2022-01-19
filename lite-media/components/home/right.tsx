import type { NextPage } from "next";
import React, { memo } from "react";
import ActiveFriends from "../ActiveFriends";
import Suggested from "../ExploreUser";

const RightSide: NextPage = () => {
    return (
        <div>
            <section className="pt-1 drop-shadow-md">
                <Suggested />
                <ActiveFriends />
            </section>
        </div>
    );
};

export default memo(RightSide);
