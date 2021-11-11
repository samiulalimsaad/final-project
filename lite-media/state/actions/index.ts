import { initialState } from "..";
import {
    CLOSE_IMAGE,
    CLOSE_MODAL,
    CREATE_POST,
    LOADING,
    LOGIN,
    LOGOUT,
    SHOW_IMAGE
} from "../types";

export interface actionInterface {
    type: string;
    payload?: any;
}

export const rootReducer = (
    state = initialState,
    { type, payload }: actionInterface
) => {
    console.log({ globalState: state });
    switch (type) {
        case LOADING:
            return { ...state, loading: !state.loading };
        case CREATE_POST:
            return { ...state, createPost: true };
        case CLOSE_MODAL:
            return { ...state, createPost: false };
        case LOGIN:
            return {
                ...state,
                isAuth: true,
                uid: payload.uid,
                displayName: payload.displayName,
            };
        case LOGOUT:
            return { ...state, isAuth: false, displayName: null };
        case SHOW_IMAGE:
            return {
                ...state,
                displayImage: { isShowing: true, imageSrc: payload.imageSrc },
            };
        case CLOSE_IMAGE:
            return {
                ...state,
                displayImage: { isShowing: false, imageSrc: "" },
            };

        default:
            return state;
    }
};
