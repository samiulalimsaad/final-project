import { Transition } from "@headlessui/react";
import {
    BellIcon,
    ExclamationCircleIcon,
    QuestionMarkCircleIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_REMOVE } from "../../state/types";

const NotificationBody = ({ notification }: any) => {
    const { dispatch } = GetState();
    const [state, setState] = useState(0);

    useEffect(() => {
        const clear = setInterval(() => {
            setState((p) => (p === 100 ? 0 : p + 1));
        }, 50);
        const cleanup = setTimeout(() => {
            notification;
            dispatch({
                type: NOTIFICATION_REMOVE,
            });
        }, 5000);
        return () => {
            clearTimeout(cleanup);
            clearInterval(clear);
        };
    }, [dispatch, notification]);
    return (
        <div className="absolute right-3 top-20 z-[51]">
            <Transition
                appear
                show={notification?.isShowing || false}
                enter="transition transform ease-in duration-1000"
                enterFrom="translate-x-10 opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transition transform ease-out duration-1000"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="translate-x-10 opacity-0"
            >
                <div className="">
                    <div className="text-center py-4 lg:px-4">
                        <div
                            className={`relative overflow-hidden min-w-[10rem] px-2 py-4 items-center text-gray-100 leading-none lg:rounded-md flex lg:inline-flex transition-all transform ease-out duration-1000 ${
                                notification?.type === "success"
                                    ? "bg-green-700/90"
                                    : notification?.type === "error"
                                    ? "bg-red-700/90"
                                    : "bg-yellow-700/90"
                            }`}
                            role="alert"
                        >
                            <div className="flex items-center">
                                <span
                                    className={`flex rounded-full mr-3 ${
                                        notification?.type === "success"
                                            ? " text-green-200"
                                            : notification?.type === "error"
                                            ? " text-red-200"
                                            : " text-yellow-200"
                                    }`}
                                >
                                    {notification?.type === "success" ? (
                                        <BellIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : notification?.type === "error" ? (
                                        <ExclamationCircleIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <QuestionMarkCircleIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </span>
                                <span className="font-semibold mr-2 text-left flex-auto">
                                    {notification?.text}
                                </span>
                            </div>
                            <div
                                className={`absolute left-0 right-0 bottom-0 h-1 drop-shadow-lg shadow-md ${
                                    notification?.type === "success"
                                        ? "bg-green-900"
                                        : notification?.type === "error"
                                        ? "bg-red-900"
                                        : "bg-yellow-900 text-black"
                                }`}
                                style={{
                                    width: `${state}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    );
};

export default NotificationBody;
