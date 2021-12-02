import { Dispatch } from "react";

export interface reducerInterface {
    createPost: boolean;
    loading: boolean;
    displayName: string | null;
    profilePic: string | null;
    isAuth: boolean;
    uid: string | null;
    progress: number | null;
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
    dispatch: Dispatch<any>;
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
    loading: false,
    displayName: null,
    profilePic: null,
    progress: 0,
    isAuth: false,
    uid: null,
};
