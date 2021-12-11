import { initialState } from "..";
import {
    CLOSE_COVER_IMAGE,
    CLOSE_IMAGE,
    CLOSE_MODAL,
    CLOSE_PROFILE_IMAGE,
    CREATE_POST,
    LOADING,
    LOGIN,
    LOGOUT,
    PROGRESS,
    SHOW_COVER_IMAGE,
    SHOW_IMAGE,
    SHOW_PROFILE_IMAGE,
} from "../types";

export interface actionInterface {
    type: string;
    payload?: any;
}

export const rootReducer = (
    state = initialState,
    { type, payload }: actionInterface
) => {
    // console.log({ globalState: state });
    switch (type) {
        case LOADING:
            return { ...state, loading: !state.loading };
        case CREATE_POST:
            return { ...state, createPost: true };
        case CLOSE_MODAL:
            return { ...state, createPost: false, progress: 0 };
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
        case SHOW_PROFILE_IMAGE:
            return {
                ...state,
                uploadProfilePic: {
                    isShowing: true,
                    imageSrc: payload.imageSrc,
                },
            };
        case CLOSE_PROFILE_IMAGE:
            return {
                ...state,
                uploadProfilePic: { isShowing: false, imageSrc: "" },
            };
        case SHOW_COVER_IMAGE:
            return {
                ...state,
                uploadCoverPic: { isShowing: true, imageSrc: payload.imageSrc },
            };
        case CLOSE_COVER_IMAGE:
            return {
                ...state,
                uploadCoverPic: { isShowing: false, imageSrc: "" },
            };
        case PROGRESS:
            return {
                ...state,
                progress: payload.progress,
            };

        default:
            return state;
    }
};
