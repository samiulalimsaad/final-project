import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../../firebase";
import { GetState } from "../../state/stateProvider";

const MessageBody = ({ conversationId }: { conversationId: string }) => {
    const { uid } = GetState();
    const [message, setMessage] = useState([]);

    useEffect(() => {
        // setMessage(temp);
        // const getData = async () => {
        onSnapshot(
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
        // };
        // uid && conversationId && getData();
        // temp.length = 0;
    }, [conversationId, uid]);
    return (
        <div className="space-y-3">
            {[...message]?.reverse()?.map((v: any) => (
                <div className="px-2" key={v.messageId}>
                    <div
                        className={`flex ${
                            v.messageId !== uid
                                ? "justify-start"
                                : "justify-end"
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
                                <span className="bg-blue-500 text-white p-2 rounded-full">
                                    {v.message}
                                </span>
                            </div>
                            <time className="text-xs font-extralight">
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
