import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import Image from "next/image";
import React, { memo, useCallback, useEffect, useState } from "react";
import { db } from "../../firebase";
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
    const { displayName, uid } = GetState();
    const [message, setMessage] = useState("");
    const [image, setImage] = useState<File>();
    const storage = getStorage();

    const sendMessage = useCallback(async () => {
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
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
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
                            console.log("File available at", downloadURL, uid);
                            try {
                                await addDoc(
                                    collection(db, `${uid}-${conversationId}`),
                                    {
                                        messageId: uid,
                                        message,
                                        image,
                                    }
                                );

                            } catch (error) {
                                alert(error);
                            }
                        }
                    );
                }
            );
        } else {
            try {
                await addDoc(collection(db, `${uid}-${conversationId}`), {
                    messageId: uid,
                    message,
                });
            } catch (error) {
                alert(error);
            }
        }
    }, [conversationId, image, message, storage, uid]);

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
        <div className="relative rounded h-full">
            <h4 className="bg-blue-500 text-white p-2 text-xl rounded">
                {conversationName}
            </h4>
            <div className="h-640 h-full bg-gray-100">
                <MessageBody conversationId={conversationId} />
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

// export default memo(Conversation);
export default Conversation
