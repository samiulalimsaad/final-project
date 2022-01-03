import { ArrowLeftIcon } from "@heroicons/react/outline";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import Home from "../components/home/index";
import Navbar from "../components/navbar";
import { GetState } from "../state/stateProvider";
import { LOADING, LOGIN } from "../state/types";
import { NODE_SERVER } from "../util";
import Loading from "./progress/Loading";

const Layout = ({ children, title }: { title: string; children: any }) => {
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
                    NODE_SERVER("/user/" + user?.uid)
                );
                if (data.success) {
                    dispatch({
                        type: LOGIN,
                        payload: {
                            displayName: data?.user?.name?.fullName,
                            profilePic:
                                data?.user?.profilePic || "/userIcon.png",
                            uid: auth?.currentUser?.uid,
                        },
                    });
                }
            } catch (error) {
            } finally {
                dispatch({ type: LOADING });
            }
        });
    }, [dispatch, isAuth, route]);

    if (!uid) {
        return <Loading />;
    }
    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="max-w-7xl w-screen mx-auto px-2 sm:px-6 lg:px-8">
                <Home>
                    {title && (
                        <div className="h-14 bg-indigo-700 text-white flex items-center space-x-4">
                            <button
                                className="hover:bg-indigo-900/70 p-4"
                                onClick={() => router.back()}
                            >
                                <ArrowLeftIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                            <h2 className="text-2xl font-medium capitalize ">
                                {title}
                            </h2>
                        </div>
                    )}
                    <div className="h-[96vh] overflow-y-hidden">{children}</div>
                </Home>
            </section>
        </>
    );
};

export default Layout;
