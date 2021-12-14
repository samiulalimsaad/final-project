import { PhotographIcon } from "@heroicons/react/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import Image from "next/image";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import { GetState } from "../../state/stateProvider";
import MessageBody from "./messageBody";

interface conversationInterface {
    conversationName: string;
    conversationId: string;
}

const Conversation = ({ conversationId }: conversationInterface) => {
    const { uid } = GetState();
    const [message, setMessage] = useState("");
    const [image, setImage] = useState<File>();
    const storage = getStorage();
    const scrollRef = useRef<null | HTMLDivElement>();

    useEffect(() => {
        // scrollRef?.current?.scrollIntoView({behavior: "smooth",});
    }, []);

    const sendMessage = useCallback(
        async (e) => {
            e.preventDefault();
            if (image?.name) {
                const storageRef = ref(
                    storage,
                    `message/${uid}-${conversationId}-${image!.name.replace(
                        image!.name,
                        Date.now().toString()
                    )}`
                );
                console.log({ storageRef });
                const uploadTask = uploadBytesResumable(storageRef, image!);
                console.log({ uploadTask });

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        switch (snapshot.state) {
                            case "paused":
                                alert("Upload is paused");
                                break;
                            case "running":
                                console.log("Upload is running");
                                break;
                        }
                    },
                    (error) => {
                        console.log("error", error);
                    },
                    async () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            async (downloadURL) => {
                                console.log(
                                    "File available at",
                                    downloadURL,
                                    uid
                                );
                                try {
                                    await addDoc(
                                        collection(
                                            db,
                                            `${uid}-${conversationId}`
                                        ),
                                        {
                                            messageId: uid,
                                            message,
                                            image,
                                            createdAt: serverTimestamp(),
                                        }
                                    );
                                    await addDoc(
                                        collection(
                                            db,
                                            `${conversationId}-${uid}`
                                        ),
                                        {
                                            messageId: uid,
                                            message,
                                            image,
                                            createdAt: serverTimestamp(),
                                        }
                                    );
                                } catch (error) {
                                    alert(error);
                                } finally {
                                    scrollRef?.current?.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }
                            }
                        );
                    }
                );
            } else {
                if (message !== "") {
                    try {
                        await addDoc(
                            collection(db, `${uid}-${conversationId}`),
                            {
                                messageId: uid,
                                message,
                                createdAt: serverTimestamp(),
                            }
                        );
                        await addDoc(
                            collection(db, `${conversationId}-${uid}`),
                            {
                                messageId: uid,
                                message,
                                createdAt: serverTimestamp(),
                            }
                        );
                    } catch (error) {
                        alert(error);
                    } finally {
                        setImage(undefined);
                        setMessage("");
                        scrollRef?.current?.scrollIntoView({
                            behavior: "smooth",
                        });
                    }
                }
            }
        },
        [conversationId, image, message, storage, uid]
    );

    // useEffect(() => {
    //     const getData = async () => {
    //         const { data } = (await axios.get(
    //             PYTHON_SERVER(`/?name=${displayName}`)
    //         ));
    //         uid && conversationId && setMessage(data.message);
    //     };
    //     displayName && getData();
    //     // uid && conversationId && (message || image) &&  sendMessage();
    // }, [conversationId, displayName, image, message, sendMessage, uid]);

    return (
        <div className="relative rounded">
            <div className="h-[77vh] bg-gray-100 overflow-y-scroll">
                <MessageBody conversationId={conversationId} />
                {/* <div
                    ref={scrollRef as RefObject<HTMLDivElement>}
                    className="pt-16"
                /> */}
            </div>
            <div className="">
                <form
                    className="flex items-center justify-between ml-auto mr-auto w-full"
                    onSubmit={sendMessage}
                >
                    <div className="relative rounded-md shadow-sm w-full">
                        <textarea
                            name="search"
                            id="search"
                            value={message}
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
