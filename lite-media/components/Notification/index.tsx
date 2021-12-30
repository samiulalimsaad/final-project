import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_REMOVE } from "../../state/types";

const NotificationBody = () => {
    const { notification, dispatch } = GetState();

    useEffect(() => {
        notification.map((v) => {
            toast(v?.text, { type: v?.type! });
            dispatch({
                type: NOTIFICATION_REMOVE,
            });
        });
    }, [dispatch, notification]);
    return <ToastContainer theme="dark" autoClose={8000} />;
};

export default NotificationBody;
