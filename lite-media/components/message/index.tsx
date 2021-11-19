import axios from "axios";
import Image from "next/image";
import React, { memo, useEffect } from "react";
import { GetState } from "../../state/stateProvider";
import { PYTHON_SERVER } from "../../util";
import MessageBody from "./messageBody";

interface conversationInterface {
    conversationName: string;
    conversationId: string;
}

const Conversation = ({
    conversationName,
    conversationId,
}: conversationInterface) => {
        const { displayName } = GetState();

        useEffect(() => {
            const getData = async () => {
                const data = (await axios.get(
                    PYTHON_SERVER(`/?name=${displayName}`)
                )) as any;
                console.log({ data: data });
            };
            displayName && getData();
        }, [displayName]);
        
    return (
        <div className="relative rounded h-full">
            <h4 className="bg-blue-500 text-white p-2 text-xl rounded">
                {conversationName}
            </h4>
            <div className="h-640 h-full bg-gray-100">
                <MessageBody/>
            </div>

            <div className="absolute left-0 right-0">
                <form className="flex items-center justify-between ml-auto mr-auto w-full">
                    <div className="relative rounded-md shadow-sm w-full">
                        <textarea
                            name="search"
                            id="search"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md resize-none"
                            placeholder="write a message"
                        />
                        <button
                            type="submit"
                            className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer"
                        >
                            <Image
                                src="/send.png"
                                alt="send"
                                className="transition-all duration-300 scale-90 hover:scale-110"
                                aria-hidden="true"
                                height={33}
                                width={33}
                            />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default memo(Conversation);
