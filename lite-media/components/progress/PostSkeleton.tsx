import {
    AnnotationIcon,
    BookmarkIcon,
    DotsHorizontalIcon,
    ThumbUpIcon,
} from "@heroicons/react/solid";
import { tempLoadingValue } from "../../util";
const PostSkeleton = () => {
    return (
        <div className="pt-2 space-y-2 h-full overflow-hidden">
            {tempLoadingValue.map((_, i) => (
                // {/* Header Start */}
                <div key={i} className="animate-pulse border border-gray-300">
                    <div className="flex items-center justify-between px-1 w-full ">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="relative h-12 w-12 rounded-full border-2 bg-gray-300 overflow-hidden" />
                            </div>
                            <div className="ml-2 flex-col space-y-1">
                                <div className="flex items-center">
                                    <h3 className="font-medium h-3 w-20 bg-gray-300 rounded-lg" />
                                    <h4 className="text-xs font-light ml-3 h-3 w-24 bg-gray-300 rounded-lg" />
                                </div>
                                <div className="flex">
                                    <time className="text-xs font-light text-left h-2 w-10 bg-gray-300 rounded-lg" />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="p-3">
                                <BookmarkIcon
                                    className="h-6 w-6 text-gray-300"
                                    aria-hidden="true"
                                />
                            </div>
                            <div>
                                <div className="p-3 text-gray-300">
                                    <DotsHorizontalIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Header End */}
                    {/* Body Start */}
                    <div className="p-4 border-b border-b-gray-200 space-y-3">
                        <div className="rounded-md h-3 bg-gray-300 w-full mt-3" />
                        <div className="rounded-md h-3 bg-gray-300 w-full mt-3" />
                        <div className="rounded-md h-3 bg-gray-300 w-full mt-3" />
                        <div className="rounded-md h-3 bg-gray-300 w-full mt-3" />
                        <div className="rounded-md h-3 bg-gray-300 w-full mt-3" />
                        <div className="rounded-md h-3 bg-gray-300 w-full mt-3" />
                        <div className="rounded-md h-3 bg-gray-300 w-full mt-3" />
                        <div className="rounded-md h-3 bg-gray-300 w-3/4 mt-3" />
                    </div>
                    {/* Body End */}
                    {/* Footer Start */}
                    <div className="flex items-center justify-between px-1 w-full divide-x divide-gray-300">
                        <div className="p-3 flex flex-1 justify-center items-center">
                            <ThumbUpIcon
                                className="h-5 w-5 ml-3 text-gray-300"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 flex flex-1 justify-center items-center">
                            <AnnotationIcon
                                className="h-5 w-5 ml-3 text-gray-300"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                    {/* Footer End */}
                </div>
            ))}
        </div>
    );
};

export default PostSkeleton;
