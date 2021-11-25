import { Menu, Transition } from "@headlessui/react";
import {
    BookmarkIcon,
    DotsHorizontalIcon,
    StopIcon,
    VolumeUpIcon,
} from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/solid";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import React, { Fragment, useCallback, useState } from "react";
import { GetState } from "../../../state/stateProvider";
import { classNames, NODE_SERVER } from "../../../util";

const tt = `Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by humans or animals. Leading AI textbooks define the field as the study of "intelligent agents": any system that perceives its environment and takes actions that maximize its chance of achieving its goals. Some popular accounts use the term "artificial intelligence" to describe machines that mimic "cognitive" functions that humans associate with the human mind, such as "learning" and "problem solving", however this definition is rejected by major AI researchers.AI applications include advanced web search engines (i.e. Google), recommendation systems (used by YouTube, Amazon and Netflix), understanding human speech (such as Siri or Alexa), self-driving cars (e.g. Tesla), and competing at the highest level in strategic game systems (such as chess and Go)`;

interface postHeaderInterface {
    userName: string;
    id: string;
    bookmark: string[];
    createdAt: string;
    profilePic: string;
    postBody: undefined | string;
}

const PostHeader = ({
    userName,
    createdAt,
    profilePic,
    postBody,
    id,
    bookmark,
}: postHeaderInterface) => {
    const { uid } = GetState();
    const [stop, setStop] = useState(false);
    const [text, setText] = useState("");
    // const synthRef = useRef(window.speechSynthesis);

    // useEffect(() => {
    //     // msg.text = text;
    //     setStop(false);
    // }, [text]);

    const ttsx = () => {
        setStop((p) => !p);
        !stop && speechSynthesis.pause();
        speechSynthesis.speak(new SpeechSynthesisUtterance("Hello World"));
    };

    const addBookmark = useCallback(async () => {
        alert("addbookmark called");
        try {
            if (bookmark.includes(id!)) {
                const { data } = await axios.delete(
                    NODE_SERVER(`/bookmark/${uid}/${id}`)
                );
                if (data.success) {
                    console.log("bookmark removed");
                }
            } else {
                const { data } = await axios.post(
                    NODE_SERVER(`/bookmark/${uid}/${id}`)
                );
                if (data.success) {
                    console.log("bookmark added");
                }
            }
        } catch (error) {
            alert(error);
        }
    }, [bookmark, id, uid]);

    const deletePost = useCallback(async () => {
        try {
            const { data } = await axios.delete(
                NODE_SERVER(`/post/${uid}/${id}`)
            );
            if (data.success) {
                alert(data.message);
            }else{
                alert(data.message);
            }
        } catch (error) {
            alert(error);
        }
    }, [id, uid]);

    return (
        <div className="flex items-center justify-between px-1 w-full ">
            <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full border-2 border-gray-500 overflow-hidden">
                    <Image
                        className="object-center object-cover "
                        src={profilePic || "/userIcon.png"}
                        alt={userName}
                        layout="fill"
                    />
                </div>
                <div className="ml-2 flex-col">
                    <div className="flex items-center">
                        <h3 className="font-medium">{userName}</h3>
                        <h4 className="text-xs font-light ml-3">
                            @{userName?.split(" ").join("_")}
                        </h4>
                    </div>
                    <div>
                        <time className="text-xs font-light text-left">
                            {moment(createdAt).fromNow()}
                        </time>
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                {postBody && (
                    <button
                        className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 rounded-full"
                        onClick={ttsx}
                    >
                        {stop ? (
                            <StopIcon className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <VolumeUpIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                            />
                        )}
                    </button>
                )}
                <button
                    className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 rounded-full"
                    onClick={addBookmark}
                >
                    {bookmark?.includes(id!) ? (
                        <BookmarkIconSolid
                            className="h-6 w-6"
                            aria-hidden="true"
                        />
                    ) : (
                        <BookmarkIcon className="h-6 w-6" aria-hidden="true" />
                    )}
                </button>
                <Menu as="div" className="ml-3 relative">
                    <div>
                        <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <div className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 rounded-full">
                                <DotsHorizontalIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </div>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 z-50 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        onClick={deletePost}
                                        className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                        )}
                                    >
                                        Delete
                                    </div>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
};

export default PostHeader;
