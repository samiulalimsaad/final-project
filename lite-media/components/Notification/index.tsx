import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { notificationTypes } from "../../state";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_REMOVE } from "../../state/types";

interface notificationInterface {
    text: string;
    type: notificationTypes;
}

const NotificationBody = () => {
    const { notification, dispatch } = GetState();

    useEffect(() => {
        notification.map(({ text, type }: notificationInterface) => {
            toast(text, { type });
            dispatch({
                type: NOTIFICATION_REMOVE,
            });
        });
    }, [dispatch, notification]);
    return <ToastContainer theme="dark" autoClose={8000} />;
};

export default NotificationBody;
