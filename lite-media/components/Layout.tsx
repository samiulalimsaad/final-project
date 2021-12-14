import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React from "react";
import Home from "../components/home/index";
import Navbar from "../components/navbar";

const Layout = ({ children, title }: { title: string; children: any }) => {
    const router = useRouter();
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
                    <div className="h-screen overflow-y-scroll">{children}</div>
                </Home>
            </section>
        </>
    );
};

export default Layout;
