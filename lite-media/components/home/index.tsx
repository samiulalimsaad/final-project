import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { memo, useEffect } from "react";
import { GetState } from "../../state/stateProvider";
import { LOADING, LOGIN, NOTIFICATION_ADD } from "../../state/types";
import { NODE_SERVER } from "../../util";
import AllModals from "../AllModals";
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
                    dispatch({
                        type: NOTIFICATION_ADD,
                        payload: { type: "error", text: data?.message },
                    });
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
            } catch (error) {
                dispatch({
                    type: NOTIFICATION_ADD,
                    payload: { type: "error", text: error },
                });
            } finally {
                dispatch({ type: LOADING });
            }
        });
    }, [dispatch, isAuth, route]);

    return (
        <section className="grid grid-cols-8 justify-center h-[90vh] divide-x-8 divide-gray-50">
            <div className="col-span-2 h-full">
                <LeftSide />
            </div>
            <div className="col-span-4 h-full">{uid && children}</div>
            <div className="col-span-2 h-full">
                <RightSide />
            </div>
            <div className="inset-0">
                <AllModals />
            </div>
        </section>
    );
};

export default memo(Home);
