import { collection, onSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { GetState } from "../../state/stateProvider";

const MessageBody = ({ conversationId }: { conversationId: string }) => {
    const { uid } = GetState();
    const [message, setMessage] = useState([]);

    useEffect(() => {
        const temp = [] as any;
        setMessage(temp); 
        const getData = async () => {
            onSnapshot(
                collection(db, `${uid}-${conversationId}`),
                (snapshot) => {
                    snapshot.docs.map((doc) => {
                        temp.push(doc.data());
                    });
                    setMessage(temp);
                }
            );
        };
        uid && conversationId && getData();
        temp.length = 0;
    }, [conversationId, uid]);
    return (
        <div className="space-y-3">
            {message?.map((v: any) => (
                <div className="px-2" key={v.messageId}>
                    <p
                        className={`flex ${
                            v.messageId === uid
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <span className="bg-blue-500 p-2 text-sm text-white rounded-full">
                            {v.message}
                        </span>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default MessageBody;
