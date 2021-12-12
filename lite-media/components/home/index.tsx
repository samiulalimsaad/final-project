import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { memo, useEffect } from "react";
import { GetState } from "../../state/stateProvider";
import { LOADING, LOGIN } from "../../state/types";
import { NODE_SERVER } from "../../util";
import AllModals from "../AllModals";
import Loading from "../progress/Loading";
import LeftSide from "./left";
import RightSide from "./right";

const Home = ({ children }: { children: any }) => {
    const { loading, dispatch, isAuth, uid } = GetState();
    const route = useRouter();

    useEffect(() => {
        dispatch({ type: LOADING });
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (!user?.uid) {
                route.push("/login");
            }
            try {
                const { data } = await axios.get(
                    NODE_SERVER("/user/" + auth?.currentUser?.uid)
                );
                if (!data.success) {
                    // setError(data.message);
                    // alert(data?.message);
                } else {
                    dispatch({
                        type: LOGIN,
                        payload: {
                            displayName: data?.user?.name?.fullName,
                            profilePic: data?.user?.profilePic,
                            uid: auth?.currentUser?.uid,
                        },
                    });
                }
            } catch (e) {
                // alert(`Error adding document: ${e}`);
            } finally {
                dispatch({ type: LOADING });
            }
        });
    }, [dispatch, isAuth, route]);

    if (!loading && isAuth)
        return (
            <section className="grid grid-cols-8 justify-center divide-x-8 divide-gray-50">
                <div className="col-span-2">
                    <LeftSide />
                </div>
                <div className="col-span-4 h-[78%]">{uid && children}</div>
                <div className="col-span-2">
                    <RightSide />
                </div>
                <div className="inset-0">
                    <AllModals />
                </div>
            </section>
        );
    return (
        <section className="grid grid-cols-8 justify-center divide-x-8 divide-gray-50">
            <div className="col-span-2">
                <LeftSide />
            </div>
            <div className="relative col-span-4 h-[78%]">
                <Loading />
            </div>
            <div className="col-span-2">
                <RightSide />
            </div>
            <AllModals />
        </section>
    );
};

export default memo(Home);
