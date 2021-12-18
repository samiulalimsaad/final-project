import { useCallback } from "react";
import Layout from "../components/Layout";
import NotificationBody from "../components/Notification";
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

const Test = () => {
    const { notification, dispatch } = GetState();
    const createNotification = useCallback(() => {
        dispatch({
            type: NOTIFICATION_ADD,
            payload: { type: "success", text: "eee", isShowing: true },
        });
    }, [dispatch]);
    return (
        <Layout title="test">
            <div className="grid place-items-center h-screen overflow-y-scroll pb-96">
                <div>
                    <pre>{JSON.stringify(notification, null, 4)}</pre>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={createNotification}
                    >
                        Click Me
                    </button>
                    {/* <pre>{typeof notification}</pre>
                    <pre>{notification.length}</pre>
                    <div>
                        {cloneDeep(
                            JSON.parse(JSON.stringify(notification, null, 4))
                        )?.map((_v: any, i: Key | null | undefined) => {
                            // <NotificationBody key={i} notification={v} />;
                            <pre key={i}>
                                {JSON.stringify(notification, null, 4)}
                            </pre>;
                        })}
                    </div> */}
                    {notification[0] && (
                        <NotificationBody notification={notification[0]} />
                    )}
                    {/* {notification[1] && (
                        <NotificationBody notification={notification[1]} />
                    )}
                    {notification[2] && (
                        <NotificationBody notification={notification[2]} />
                    )}
                    {notification[3] && (
                        <NotificationBody notification={notification[3]} />
                    )} */}
                </div>
            </div>
        </Layout>
    );
};

export default Test;
