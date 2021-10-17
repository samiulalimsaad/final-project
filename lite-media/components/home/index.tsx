import { getAuth } from 'firebase/auth';
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { GetState } from "../../state/stateProvider";
import CreatPost from "../createPost";
import Loading from "../progress/Loading";
import LeftSide from "./left";
import RightSide from "./right";

const Home = ({ children }: { children: any }) => {
    const { loading } = GetState();
    const route = useRouter();
    
    useEffect(() => {
        const auth = getAuth()
        console.log(auth.currentUser?.uid);
        if (!auth.currentUser?.uid) {
            // route.push("/login");
        }
    }, [ route]);

    if (loading) return <Loading />;

    return (
        <section className="grid grid-cols-8 justify-center divide-x-8 divide-gray-50">
            <div className="col-span-2">
                <LeftSide />
            </div>
            <div className="col-span-4 h-[78%]">{children}</div>
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
