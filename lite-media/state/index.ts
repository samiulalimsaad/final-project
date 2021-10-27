import { Dispatch } from "react";

export interface reducerInterface {
    createPost: boolean;
    loading: boolean;
    displayName: string | null;
    profilePic: string | null;
    isAuth: boolean;
    uid: string | null;
    dispatch: Dispatch<any>;
}

export const initialState = {
    createPost: false,
    loading: false,
    displayName: null,
    profilePic: null,
    isAuth: false,
    uid: null,
};
