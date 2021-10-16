
import { collection, getDocs } from "firebase/fireStore";
import React, { memo, useEffect, useState } from "react";




const Message = ({ conversationName:any }) => {

    const [state, setState] = useState<any>([]);
    useEffect(() => {
        const getData=async ()=>{
            const querySnapshot = await getDocs(collection(conversationName.message))
            querySnapshot.forEach((doc:any) => {
  console.log(`${doc.id} => ${doc.data()}`);
})
        // }
        //     .orderBy("createdAt", "desc")
        //     .limit(20)
        //     .onSnapshot((res: { docs: { data: () => any; id: any; }[]; }) => {
        //         const data: any[] | ((prevState: never[]) => never[]) = [];
        //         res.docs.forEach((value: { data: () => any; id: any; }) => {
        //             data.push({ ...value.data(), id: value.id });
        //         });
        //         setState(data);
        //     });
    }, [conversationName]);

    return (
        <div>
            {state.reverse().map((msg) => (
                <div
                    key={msg.id}
                    style={{
                        textAlign:
                            auth.currentUser.uid === msg.uid ? "right" : "left",
                    }}
                >
                    <div
                        style={{
                            backgroundColor:
                                auth.currentUser.uid === msg.uid
                                    ? "#00B2FF"
                                    : "grey",
                            color: "#f7f7f7",
                            borderRadius:
                                auth.currentUser.uid === msg.uid
                                    ? "10px 10px 0px 10px"
                                    : "10px 10px 10px 0px",
                            padding: "10px",
                        }}
                    >
                        <h5 >
                            {msg.message}
                        </h5>
                    </div>
                    <p>
                        {msg?.createdAt?.toDate().toLocaleTimeString("en-US")}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default memo(Message);
