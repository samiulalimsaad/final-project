import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_REMOVE } from "../../state/types";

const NotificationBody = ({ notification }: any) => {
    const { dispatch } = GetState();
    const [state, setState] = useState(0);
    console.log(
        `absolute left-0 right-0 bottom-0 h-1 w-[${state}] mx-auto ${
            notification.type === "success"
                ? "bg-green-900"
                : notification.type === "error"
                ? "bg-red-900"
                : "bg-yellow-900 text-black"
        }`
    );

    useEffect(() => {
        const clear = setInterval(() => {
            setState((p) => (p === 100 ? 0 : p + 1));
        }, 100);
        const cleanup = setTimeout(() => {
            notification;
            dispatch({
                type: NOTIFICATION_REMOVE,
            });
        }, 5000);
        return () => {
            clearTimeout(cleanup);
            clearInterval(clear);
            console.log("cleanup");
        };
    }, [dispatch, notification]);
    return (
        <div>
            <Transition
                appear
                // show={true}
                show={notification.isShowing}
                enter="transition transform ease-out duration-300"
                enterFrom="translate-x-4 opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transition transform ease-in duration-300"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="translate-x-4 opacity-0"
            >
                <div className="">
                    <div className="text-center py-4 lg:px-4">
                        <div
                            className={`relative overflow-hidden p-2 items-center text-indigo-100 leading-none lg:rounded-md flex lg:inline-flex ${
                                notification.type === "success"
                                    ? "bg-green-700"
                                    : notification.type === "error"
                                    ? "bg-red-700"
                                    : "bg-yellow-700"
                            }`}
                            role="alert"
                        >
                            <div className="flex items-center">
                                <span
                                    className={`flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3 ${
                                        notification.type === "success"
                                            ? "bg-green-400"
                                            : notification.type === "error"
                                            ? "bg-red-400"
                                            : "bg-yellow-300 text-black"
                                    }`}
                                >
                                    {notification.type}
                                </span>
                                <span className="font-semibold mr-2 text-left flex-auto">
                                    {notification.text}
                                </span>
                            </div>
                            <div
                                className={`absolute left-0 right-0 bottom-0 h-1 w-[${state}%] mx-auto ${
                                    notification.type === "success"
                                        ? "bg-green-900"
                                        : notification.type === "error"
                                        ? "bg-red-900"
                                        : "bg-yellow-900 text-black"
                                }`}
                            />
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    );
};

export default NotificationBody;
