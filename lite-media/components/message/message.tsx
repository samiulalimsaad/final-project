import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebase";
import { NODE_SERVER } from "../../util";
const Message = ({ conversationId }: { conversationId: string }) => {
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(NODE_SERVER("/"));
            if (conversationId === data.assistant) {
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    console.log(`${doc.id} => ${doc.data()}`);
                });
            }
        };
        getData();
    }, []);
    return <div>Enter</div>;
};

export default Message;
