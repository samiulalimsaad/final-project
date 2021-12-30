import axios from "axios";
import { push, ref } from "firebase/database";
import getConfig from "next/config";
import { database } from "../firebase";
import { NOTIFICATION_ADD } from "../state/types";

export const REFRESH_INTERVAL = 15000;

const { publicRuntimeConfig } = getConfig();

const nodeServer = publicRuntimeConfig.NODE_SERVER;

export const NODE_SERVER = (v: string) => {
    const a = nodeServer + v;
    // console.log("NODE_SERVER", a);
    return a;
};
export const PYTHON_SERVER = (v: string) => {
    const a = publicRuntimeConfig.PYTHON_SERVER + v;
    console.log("PYTHON_SERVER", a);
    return a;
};

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const addLikeNotification = async (
    id: string,
    name: string,
    postLink: string,
    profilePic: string,
    createdAt: object,
    dispatch: (arg0: {
        type: string;
        payload: { type: string; text: string };
    }) => void
) => {
    console.log({ id });
    try {
        await push(ref(database, `users/${id}/notifications`), {
            type: "success",
            text: `${name} liked your post`,
            postLink,
            profilePic,
            createdAt,
        });
        console.log("[Done]");
    } catch (error) {
        dispatch({
            type: NOTIFICATION_ADD,
            payload: { type: "error", text: (error as Error).message },
        });
    }
};

export const addCommentNotification = async (
    id: string,
    name: string,
    postLink: string,
    profilePic: string,
    createdAt: string,
    dispatch: (arg0: {
        type: string;
        payload: { type: string; text: string };
    }) => void
) => {
    try {
        await push(ref(database, `users/${id}/notifications`), {
            type: "success",
            text: `${name} added a comment on your post`,
            postLink,
            profilePic,
            createdAt,
        });
        console.log("[Done]");
    } catch (error) {
        dispatch({
            type: NOTIFICATION_ADD,
            payload: { type: "error", text: (error as Error).message },
        });
    }
};

export const addFollowingNotification = async (
    id: string,
    name: string,
    postLink: string,
    profilePic: string,
    createdAt: string,
    dispatch: (arg0: {
        type: string;
        payload: { type: string; text: string };
    }) => void
) => {
    try {
        await push(ref(database, `users/${id}/notifications`), {
            type: "success",
            text: `${name} started following you`,
            postLink,
            profilePic,
            createdAt,
        });
        console.log("[Done]");
    } catch (error) {
        dispatch({
            type: NOTIFICATION_ADD,
            payload: { type: "error", text: (error as Error).message },
        });
    }
};

export const blurBase64 =
    "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPM9wEAATAAvWue51sAAAAASUVORK5CYII=";

const tempLoadingValue = [] as number[];
tempLoadingValue.length = 30;
tempLoadingValue.fill(1);

export { tempLoadingValue };
