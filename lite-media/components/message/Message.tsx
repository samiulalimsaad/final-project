/* eslint-disable */
import React from "react";
import Moment from "react-moment";
import { GetState } from "../../state/stateProvider";

const Message = ({ msg }: any) => {
    const { uid } = GetState();
    return (
        <div className="px-2">
            <div
                className={`flex ${
                    msg?.messageId !== uid
                        ? "justify-start pr-56"
                        : "justify-end pl-56"
                }`}
            >
                <div>
                    <div
                        className={`flex ${
                            msg?.messageId !== uid
                                ? "justify-start"
                                : "justify-end"
                        }`}
                    >
                        <span
                            className={`px-4 py-2 rounded-3xl drop-shadow-sm shadow-sm ${
                                msg?.messageId !== uid
                                    ? "bg-gray-300/50 text-gray-700"
                                    : "bg-blue-500 text-blue-100"
                            }`}
                        >
                            {msg?.message}
                        </span>
                    </div>
                    <time
                        className={`text-xs font-extralight flex ${
                            msg?.messageId !== uid
                                ? "justify-start"
                                : "justify-end"
                        }`}
                    >
                        <Moment fromNow>{msg?.createdAt?.toDate()}</Moment>
                    </time>
                </div>
            </div>
        </div>
    );
};

export default Message;
