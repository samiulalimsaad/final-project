import Layout from "../components/Layout";
import { GetState } from "../state/stateProvider";
import { addLikeNotification } from "../util";
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
                            addLikeNotification(uid, "saad", "/", "", dispatch);
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
