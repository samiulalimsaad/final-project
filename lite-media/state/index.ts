import { Dispatch } from "react";

export interface reducerInterface {
    createPost: boolean;
    loading: boolean;
    userName: null;
    auth: boolean;
    dispatch: Dispatch<any>;
}

export const initialState = {
    createPost: false,
    loading: true,
    userName: null,
    auth: false,
};
