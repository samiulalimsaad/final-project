import { Dispatch } from "react";

export interface reducerInterface {
    createPost: boolean;
    loading: boolean;
    displayName: null;
    auth: boolean;
    dispatch: Dispatch<any>;
}

export const initialState = {
    createPost: false,
    loading: false,
    displayName: null,
    auth: false,
};
