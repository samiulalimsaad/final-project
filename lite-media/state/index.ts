import { Dispatch } from "react";
import { actionInterface } from "./actions";

export interface initialStateInterface {
    createPost: boolean;
    loading: boolean;
    displayName: string;
    profilePic: string;
    isAuth: boolean;
    uid: string;
    progress: number;
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
        type: string;
        text: string;
        isShowing: boolean;
    }>;
    dispatch: Dispatch<actionInterface>;
}

export const initialState = {
    createPost: false,
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
            isShowing: false,
        },
    ],
    loading: false,
    displayName: "",
    profilePic: "",
    progress: 0,
    isAuth: false,
    uid: "",
} as initialStateInterface;
