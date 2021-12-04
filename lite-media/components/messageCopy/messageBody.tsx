import { GetState } from "../../state/stateProvider";

const MessageBody = ({ message }: { message: any }) => {
    const { uid } = GetState();
    console.log({ message });
    // const [message, setMessage] = useState([]);

    // useEffect(() => {
    //     const temp = [] as any;
    //     setMessage(temp);
    //     const getData = async () => {
    //         onSnapshot(
    //             collection(db, `${uid}-${conversationId}`),
    //             (snapshot) => {
    //                 snapshot.docs.map((doc) => {
    //                     temp.push(doc.data());
    //                 });
    //                 setMessage(temp);
    //             }
    //         );
    //     };
    //     uid && conversationId && getData();
    //     temp.length = 0;
    // }, [conversationId, uid]);
    return (
        <div className="space-y-3">
            {message?.map((v: any) => (
                <div className="px-2" key={v.messageId}>
                    <div className="px-2">
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
                    <p>{v?.createdAt?.toDate().toLocaleTimeString("en-US")}</p>
                </div>
            ))}
        </div>
    );
};

export default MessageBody;
