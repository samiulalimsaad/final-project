import { Transition } from "@headlessui/react";
import { useEffect } from "react";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_REMOVE } from "../../state/types";

const NotificationBody = ({ notification }: any) => {
    const { dispatch } = GetState();
    console.log({ notification });

    useEffect(() => {
        const cleanup = setTimeout(() => {
            dispatch({
                type: NOTIFICATION_REMOVE,
            });
        }, 5000);
        return () => {
            cleanup;
            console.log("cleanup");
        };
    }, [dispatch]);
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
                <div>
                    <div className="text-center py-4 lg:px-4">
                        <div
                            className={`p-2 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex ${
                                notification.type === "success"
                                    ? "bg-green-700"
                                    : notification.type === "error"
                                    ? "bg-red-700"
                                    : "bg-yellow-700"
                            }`}
                            role="alert"
                        >
                            <span
                                className={`flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3 ${
                                    notification.type === "success"
                                        ? "bg-green-500"
                                        : notification.type === "error"
                                        ? "bg-red-500"
                                        : "bg-yellow-300 text-black"
                                }`}
                            >
                                {notification.type}
                            </span>
                            <span className="font-semibold mr-2 text-left flex-auto">
                                {notification.text}
                            </span>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    );
};

export default NotificationBody;
