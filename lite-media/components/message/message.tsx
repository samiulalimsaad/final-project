import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebase";
const Message = () => {
    useEffect(() => {
        const getData = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        };
        getData();
    }, []);
    return <div>Enter</div>;
};

export default Message;
