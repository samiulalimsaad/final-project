import { Dispatch } from "react";

export interface reducerInterface {
    createPost: boolean;
    loading: boolean;
    displayName: string | null;
    profilePic: string | null;
    isAuth: boolean;
    uid: string | null;
    displayImage: {
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
    loading: false,
    displayName: null,
    profilePic: null,
    isAuth: false,
    uid: null,
};
