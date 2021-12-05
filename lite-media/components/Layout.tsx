import React, { memo } from "react";
import Home from "../components/home/index";
import Navbar from "../components/navbar";

const Layout = ({ title, children }: { title?: string; children: any }) => {
    console.log({ title });
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <section className="max-w-7xl h-screen w-screen mx-auto px-2 sm:px-6 lg:px-8">
                {title && (
                    <div className="p-2 h-14 bg-indigo-700 text-white">
                        <h2 className="text-2xl font-medium capitalize ">
                            {title}
                        </h2>
                        <hr className="bg-gray-500 h-1 mt-2" />
                    </div>
                )}
                <div className="h-screen overflow-y-scroll">
                    <Home>
                        <div>{children}</div>
                    </Home>
                </div>
            </section>
        </div>
    );
};

export default memo(Layout);
