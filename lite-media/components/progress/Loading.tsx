/* This example requires Tailwind CSS v2.0+ */
import React,{memo} from "react";

const Loading = () => {
    return (
        <div className={`absolute inset-0 h-full w-full z-50 bg-gray-500/50 `}>
            <div className="flex items-center justify-center h-full w-full">
                <div className="flex items-center justify-center">
                    <h4 className="text-4xl">Loading</h4>
                    <div>
                        <span className="animate-ping absolute inline-flex items-center justify-center h-3 w-3 rounded-full bg-purple-900 ml-5"></span>
                        <span className="animate-ping absolute inline-flex items-center justify-center h-3 w-3 rounded-full bg-purple-900 ml-10"></span>
                        <span className="animate-ping absolute inline-flex items-center justify-center h-3 w-3 rounded-full bg-purple-900 ml-15"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Loading);
