import React, { memo } from "react";
import PostSkeleton from "./PostSkeleton";

const ProfileLoading = () => {
    return (
        <div className="pb-24 h-full overflow-y-scroll animate-puls">
            <div className="relative mb-16">
                <div className="bg-gray-300 h-44 w-full" />
                <div className="absolute z-40 -bottom-12 px-2 w-full flex justify-between">
                    <div className="h-28 w-28 rounded-full z-50 bg-gray-300 border-white border-2" />
                    <div className="mt-16 flex items-center justify-center">
                        <span className="items-center mr-2 group w-full flex justify-center rounded-full py-4 px-8 bg-gray-300" />
                        <div className="flex items-center mr-2">
                            <span className="w-full flex justify-center py-4 px-8 rounded-full bg-gray-300 " />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between px-2 mb-3">
                <>
                    <div>
                        <h1 className="flex space-x-2 font-semibold text-3xl">
                            <span className="px-8 py-4 bg-gray-300 rounded-full" />
                            <span className="px-8 py-4 bg-gray-300 rounded-full" />
                        </h1>
                        <h3 className="text-xs text-gray-600" />
                    </div>
                    <div className="flex flex-col justify-center pr-2">
                        <span className="px-8 py-2 bg-gray-300 rounded-full" />
                        <span className="px-8 py-2 mt-1 bg-gray-300 rounded-full" />
                    </div>
                </>
            </div>
            <hr className="h-1 bg-gray-100" />
            <div className="mb-4">
                <div>
                    <div className="flex items-center space-x-2 py-4 px-2">
                        <a className="bg-gray-300 px-8 py-2 rounded-full" />
                    </div>
                    <div className="flex flex-col justify-between space-y-2 py-4 px-2">
                        <p className="bg-gray-300 px-8 py-2 rounded-full flex space-y-2 items-center" />
                        <p className="bg-gray-300 px-8 py-2 rounded-full flex space-y-2 items-center" />
                        <p className="bg-gray-300 px-8 py-2 rounded-full flex space-y-2 items-center" />
                    </div>
                    <div className="flex items-center space-x-1 px-2 ">
                        <p className="h-4 w-4 ml-0 mr-2" />
                        <p className="bg-gray-300 px-8 py-2 rounded-full ml-0" />
                        <p className="bg-gray-300 px-8 py-2 rounded-full" />
                        <p className="bg-gray-300 px-8 py-2 rounded-full" />
                        <p className="bg-gray-300 px-8 py-2 rounded-full" />
                        <p className="bg-gray-300 px-8 py-2 rounded-full" />
                    </div>
                </div>
            </div>
            <hr className="h-1 bg-gray-300" />
            <div className="pb-18 mt-4">
                <PostSkeleton />
            </div>
        </div>
    );
};

export default memo(ProfileLoading);
