import { PhotographIcon } from "@heroicons/react/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import Image from "next/image";
import React, { memo, useCallback, useRef, useState } from "react";
import { db } from "../../firebase";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_ADD } from "../../state/types";
import { addMessageNotification } from "../../util";
import MessageBody from "./messageBody";

interface conversationInterface {
    conversationName: string;
    conversationId: string;
}

const Conversation = ({ conversationId }: conversationInterface) => {
    const { uid, displayName, profilePic, dispatch } = GetState();
    const [message, setMessage] = useState("");
    const [image, setImage] = useState<File>();
    const storage = getStorage();
    const scrollRef = useRef<null | HTMLDivElement>();

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
                                dispatch({
                                    type: NOTIFICATION_ADD,
                                    payload: {
                                        type: "warning",
                                        text: "Upload is paused",
                                    },
                                });
                                break;
                            case "running":
                                dispatch({
                                    type: NOTIFICATION_ADD,
                                    payload: {
                                        type: "success",
                                        text: "Upload is running",
                                    },
                                });
                                break;
                        }
                    },
                    (error) => {
                        dispatch({
                            type: NOTIFICATION_ADD,
                            payload: { type: "error", text: error },
                        });
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
                                            unread: true,
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
                                            unread: true,
                                            createdAt: serverTimestamp(),
                                        }
                                    );
                                } catch (error) {
                                    dispatch({
                                        type: NOTIFICATION_ADD,
                                        payload: {
                                            type: "error",
                                            text: (error as Error).message,
                                        },
                                    });
                                } finally {
                                    conversationId !== uid &&
                                        addMessageNotification(
                                            conversationId,
                                            displayName,
                                            `/message/${conversationId}`,
                                            profilePic,
                                            serverTimestamp(),
                                            dispatch
                                        );
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
                                unread: true,
                                createdAt: serverTimestamp(),
                            }
                        );
                        await addDoc(
                            collection(db, `${conversationId}-${uid}`),
                            {
                                messageId: uid,
                                message,
                                unread: true,
                                createdAt: serverTimestamp(),
                            }
                        );
                    } catch (error) {
                        dispatch({
                            type: NOTIFICATION_ADD,
                            payload: {
                                type: "error",
                                text: (error as Error).message,
                            },
                        });
                    } finally {
                        setImage(undefined);
                        setMessage("");
                        conversationId !== uid &&
                            addMessageNotification(
                                conversationId,
                                displayName,
                                `/message/${uid}`,
                                profilePic,
                                serverTimestamp(),
                                dispatch
                            );
                    }
                }
            }
        },
        [
            conversationId,
            dispatch,
            displayName,
            image,
            message,
            profilePic,
            storage,
            uid,
        ]
    );

    return (
        <div className="relative rounded h-full overflow-y-scroll">
            <div className="h-[77vh] p-2 bg-gray-100 overflow-y-scroll">
                <MessageBody conversationId={conversationId} />
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
