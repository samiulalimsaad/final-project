import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { GetState } from "../../state/stateProvider";
import Message from "./Message";

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
                <Message key={v?.createdAt?.nanoseconds} msg={v} />
            ))}
        </div>
    );
};

export default MessageBody;
