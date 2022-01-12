import { Dispatch } from "react";
import { actionInterface } from "./actions";

export type notificationTypes =
    | "info"
    | "success"
    | "warning"
    | "error"
    | "default";

export interface initialStateInterface {
    createPost: boolean;
    loading: boolean;
    displayName: string;
    profilePic: string;
    isAuth: boolean;
    uid: string;
    progress: number;
    OFModal: {
        index: number;
        isShowing: boolean;
    };
    displayImage: {
        imageSrc: string;
        isShowing: boolean;
    };
    uploadProfilePic: {
        imageSrc: string;
        isShowing: boolean;
    };
    uploadCoverPic: {
        imageSrc: string;
        isShowing: boolean;
    };
    notification: Array<{
        type: notificationTypes;
        text: string;
    }>;
    dispatch: Dispatch<actionInterface>;
}

export const initialState = {
    createPost: false,
    OFModal: {
        index: 0,
        isShowing: false,
    },
    displayImage: {
        imageSrc: "",
        isShowing: false,
    },
    uploadProfilePic: {
        imageSrc: "",
        isShowing: false,
    },
    uploadCoverPic: {
        imageSrc: "",
        isShowing: false,
    },
    notification: [
        {
            type: "success", // error, warning, success
            text: "logged in",
        },
    ],
    loading: false,
    displayName: "",
    profilePic: "",
    progress: 0,
    isAuth: false,
    uid: "",
} as initialStateInterface;
