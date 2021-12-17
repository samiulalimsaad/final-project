import React from "react";
import { tempLoadingValue } from "../../util";

const UserLoadingSkeleton = () => {
    return (
        <div className="h-full overflow-hidden">
            {tempLoadingValue.map((_, i) => (
                <div key={i}>
                    <div className="flex items-center p-1 rounded-full">
                        <div className="flex items-center justify-between w-full animate-pulse">
                            <div className="flex">
                                <div className="pl-2 flex">
                                    <h4 className="font-semibold flex items-center justify-center">
                                        <div className="overflow-hidden rounded-full border bg-gray-300">
                                            <div className="relative h-7 w-7 rounded-full flex items-center justify-center" />
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            <span className="ml-3 h-3 w-20 bg-gray-300 rounded-lg" />
                                            <span className="ml-3 h-3 w-14 bg-gray-300 rounded-lg" />
                                        </div>
                                    </h4>
                                </div>
                            </div>
                            <div className="flex items-center mr-2">
                                <button className="group w-12 flex py-1 px-3 h-6 bg-gray-300 rounded-md" />
                            </div>
                        </div>
                    </div>
                    <hr className="border-b border-gray-200" />
                </div>
            ))}
        </div>
    );
};

export default UserLoadingSkeleton;
