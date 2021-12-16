import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../../firebase";
import { GetState } from "../../state/stateProvider";

const MessageBody = ({ conversationId }: { conversationId: string }) => {
    const { uid } = GetState();
    const [message, setMessage] = useState([]);

    useEffect(() => {
        const cleanup = onSnapshot(
            query(
                collection(db, `${conversationId}-${uid}`),
                orderBy("createdAt", "desc")
            ),
            (snapshot) => {
                const temp = [] as any;
                setMessage([]);
                snapshot.docs.map((doc) => {
                    temp.push(doc.data());
                });
                setMessage(temp);
            }
        );
        return () => {
            cleanup();
        };
    }, [conversationId, uid]);
    return (
        <div className="space-y-3">
            {[...message]?.reverse()?.map((v: any) => (
                <div className="px-2" key={v?.createdAt?.nanoseconds}>
                    <div
                        className={`flex ${
                            v.messageId !== uid
                                ? "justify-start pr-56"
                                : "justify-end pl-56"
                        }`}
                    >
                        <div>
                            <div
                                className={`flex ${
                                    v.messageId !== uid
                                        ? "justify-start"
                                        : "justify-end"
                                }`}
                            >
                                <span
                                    className={`px-4 py-2 rounded-3xl drop-shadow-sm shadow-sm ${
                                        v.messageId !== uid
                                            ? "bg-gray-300/50 text-gray-700"
                                            : "bg-blue-500 text-blue-100"
                                    }`}
                                >
                                    {v.message}
                                </span>
                            </div>
                            <time
                                className={`text-xs font-extralight flex ${
                                    v.messageId !== uid
                                        ? "justify-start"
                                        : "justify-end"
                                }`}
                            >
                                <Moment fromNow>
                                    {v?.createdAt?.toDate()}
                                </Moment>
                            </time>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageBody;
