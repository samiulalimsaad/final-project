/* eslint-disable */
import React, { RefObject, useEffect, useRef } from "react";
import Moment from "react-moment";

const Message = ({ msg, user1 }: any) => {
    const scrollRef = useRef<null | HTMLDivElement>();

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [msg]);
    return (
        <div
            className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
            ref={scrollRef as RefObject<HTMLDivElement>}
        >
            <p className={msg.from === user1 ? "me" : "friend"}>
                {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
                {msg.text}
                <br />
                <time>
                    <Moment fromNow>{msg.createdAt.toDate()}</Moment>
                </time>
            </p>
        </div>
    );
};

export default Message;
