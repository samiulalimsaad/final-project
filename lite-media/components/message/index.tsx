import { PhotographIcon } from "@heroicons/react/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import MessageBody from "./messageBody";

interface conversationInterface {
    conversationName: string;
    conversationId: string;
}

const Conversation = ({
    conversationName,
    conversationId,
}: conversationInterface) => {
    const scrollRef = useRef(null);
    const inputRef = useRef(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
        inputRef?.current?.focus();
    }, [conversationName]);

    const sendMessage = (e) => {
        e.preventDefault();
        scrollRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
        if (message !== "") {
            addDoc(collection(db, conversationId), {
                message,
                uid: uid,
                createdAt: serverTimestamp(),
            })
                .then(() => {
                    setMessage("");
                    // push database to count unread message

                    // fireStore
                    //     .collection("users")
                    //     .doc(conversationId)
                    //     .update({
                    //         unread: firebase.firestore.FieldValue.arrayUnion(
                    //             auth.currentUser.uid
                    //         ),
                    //         totalUnread: conversationName.totalUnread + 1,
                    //     });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <div className="relative rounded h-full">
            <h4 className="bg-blue-500 text-white p-2 text-xl rounded">
                {conversationName}
            </h4>
            <div className="h-640 h-full bg-gray-100 overflow-y-scroll">
                <MessageBody conversationId={conversationId} />
                <div ref={scrollRef}></div>
            </div>
            <div className="absolute left-0 right-0">
                <form
                    className="flex items-center justify-between ml-auto mr-auto w-full"
                    onSubmit={sendMessage}
                >
                    <div className="relative rounded-md shadow-sm w-full">
                        <textarea
                            name="message"
                            placeholder="message"
                            value={message}
                            ref={inputRef}
                            autoFocus
                            onChange={(e) => setMessage(e?.target?.value)}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md resize-none"
                            placeholder="write a message"
                        />
                        <div className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer">
                            <PhotographIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                            />
                            <label
                                htmlFor="message-file"
                                className="flex items-center py-2 "
                            >
                                <button
                                    type="submit"
                                    className="flex items-center cursor-pointer"
                                ></button>
                            </label>
                            <input
                                id="message-file"
                                type="file"
                                accept="image/*"
                                onChange={(e: any) =>
                                    setImage(e!.target!.files[0]!)
                                }
                                hidden
                            />
                            <button
                                type="submit"
                                className="px-1 flex items-center cursor-pointer"
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
                    </div>
                </form>
            </div>
        </div>
    );
};
export default memo(Conversation);
