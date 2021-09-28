import {
    BookmarkIcon,
    DotsHorizontalIcon,
    StopIcon,
    VolumeUpIcon
} from "@heroicons/react/outline";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface postHeaderInterface {
    userName: string;
    createdAt: string;
    profilePic: string;
    post: undefined | string;
}

const PostHeader = ({
    userName,
    createdAt,
    profilePic,
    post,
}: postHeaderInterface) => {
    const [stop, setStop] = useState(false)
    const [text, setText] = useState("")

    useEffect(() => {
        var msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        setStop(false)
    }, [text])

    const ttsx=(t:string)=>{
        setStop(p=>!p)
        setText(t)
    console.log({stop,t})

    }

    return (
        <div className="flex items-center justify-between px-1 w-full ">
            <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full border-2 border-gray-500 overflow-hidden">
                    <Image
                        className="object-center object-cover "
                        src={profilePic}
                        alt={userName}
                        layout="fill"
                    />
                </div>
                <div className="ml-2">
                    <div className="flex items-center">
                        <h3 className="font-medium">{userName}</h3>
                        <h4 className="text-xs font-light ml-3">
                            @{userName.split(" ").join("_")}
                        </h4>
                    </div>
                    <time className="text-xs font-light">{createdAt}</time>
                </div>
            </div>
            <div className="flex items-center">
                {post && (
                    <button
                        className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 rounded-full"
                        onClick={() => ttsx(post)}
                    >
                        {stop ?
                        <StopIcon className="h-6 w-6" aria-hidden="true" />:
                        <VolumeUpIcon className="h-6 w-6" aria-hidden="true" />
                        }
                    </button>
                )}
                <button className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 rounded-full">
                    <BookmarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <button className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 rounded-full">
                    <DotsHorizontalIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                    />
                </button>
            </div>
        </div>
    );
};

export default PostHeader;
