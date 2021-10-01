import { PlusCircleIcon } from "@heroicons/react/outline";
import Image from "next/image";
import story from "../../util/story2.json";
const temp = story[0];
const Story = () => {
    return (
        <section className="flex bg-gray-200 space-x-1 px-2 overflow-x-scroll w-full">
            <div className="h-36 w-24 bg-blue-500 rounded-md bg-gray-900/50">
                <div className="relative">
                    <div className="relative h-20 w-24">
                        <Image
                            className="w-24 h-32 object-center object-cover "
                            src={temp.image}
                            alt={temp.userName}
                            layout="fill"
                        />
                    </div>
                    <div className="absolute flex justify-center text-blue-700 -mt-3 w-full ">
                        <PlusCircleIcon
                            className="h-8 w-8"
                            aria-hidden="true"
                        />
                    </div>
                    <div className="flex items-end justify-center h-10 ">
                        <h4 className="text-xs text-white">Create Story</h4>
                    </div>
                </div>
            </div>
            {story.splice(0, 100).map((item) => (
                <div
                    className="h-32 w-24 bg-blue-500 rounded-md bg-gray-900/50"
                    key={item.userName}
                >
                    <div className="relative h-32 w-24">
                        <div className="relative h-10 w-10 ml-2 mt-2 rounded-full border-2 border-blue-700 overflow-hidden z-20 ">
                            <Image
                                className="absolute inline-block left-8 top-8 w-12 h-12 object-center object-cover z-10 bg-gray-100"
                                src={item.profilePic}
                                alt={item.userName}
                                layout="fill"
                            />
                        </div>
                        <Image
                            className="absolute w-full h-full top-0 left-0 object-center object-cover inset-0 bg-blend-overlay"
                            src={item.image}
                            alt={item.userName}
                            layout="fill"
                        />
                        <div className="absolute inline-block left-0 bottom-0 w-12 h-12 z-10 px-2 ">
                            <h4 className="text-xs text-white font-medium">
                                {item.userName}
                            </h4>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Story;
