import { push, ref, serverTimestamp } from "firebase/database";
import Layout from "../components/Layout";
import { database } from "../firebase";
import { GetState } from "../state/stateProvider";
import { NOTIFICATION_ADD } from "../state/types";
const a = [
    {
        type: "error",
        text: "aaa aaa aaa aaa aaaaaaaaaaaa aaa aaa",
        isShowing: true,
    },
    {
        type: "warning",
        text: "bbb bbbbbb bbbbbbbbbbbbbbb bbb bbb bbb",
        isShowing: true,
    },
    { type: "success", text: "ccccccccc ccc ccc ccc cccccc", isShowing: true },
    { type: "error", text: "ddd", isShowing: true },
    { type: "success", text: "eee", isShowing: true },
];

const createNotification = async (
    id: any,
    dispatch: (arg0: {
        type: string;
        payload: { type: string; text: string };
    }) => void
) => {
    try {
        await push(ref(database, `users/${id}/notifications`), {
            type: "success",
            text: "test",
            createdAt: serverTimestamp(),
        });
        console.log("[Done]");
    } catch (error) {
        dispatch({
            type: NOTIFICATION_ADD,
            payload: { type: "error", text: (error as Error).message },
        });
    }
};

const Test = () => {
    const { notification, uid, dispatch } = GetState();

    return (
        <Layout title="test">
            <div className="grid place-items-center h-screen overflow-y-scroll pb-96">
                <div>
                    <pre>{JSON.stringify(notification, null, 4)}</pre>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                            createNotification(uid, dispatch);
                        }}
                    >
                        Click Me
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Test;
