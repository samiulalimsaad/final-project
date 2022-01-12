import { initialState, initialStateInterface } from "..";
import {
    CLOSE_COVER_IMAGE,
    CLOSE_IMAGE,
    CLOSE_MODAL,
    CLOSE_OF_MODAL,
    CLOSE_PROFILE_IMAGE,
    CREATE_POST,
    LOADING,
    LOGIN,
    LOGOUT,
    NOTIFICATION_ADD,
    NOTIFICATION_REMOVE,
    PROGRESS,
    SHOW_COVER_IMAGE,
    SHOW_IMAGE,
    SHOW_OF_MODAL,
    SHOW_PROFILE_IMAGE,
} from "../types";

export interface actionInterface {
    type: string;
    payload?: any;
}

export const rootReducer = (
    state = initialState,
    { type, payload }: actionInterface
): initialStateInterface => {
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
                profilePic: payload.profilePic,
            };
        case LOGOUT:
            return { ...state, isAuth: false, displayName: "" };
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
        case SHOW_OF_MODAL:
            return {
                ...state,
                OFModal: { isShowing: true, index: payload.index },
            };
        case CLOSE_OF_MODAL:
            return {
                ...state,
                OFModal: { isShowing: false, index: 0 },
            };
        case PROGRESS:
            return {
                ...state,
                progress: payload.progress,
            };
        case NOTIFICATION_ADD:
            console.log("notification added");
            return {
                ...state,
                notification: [
                    ...state.notification,
                    {
                        type: payload?.type,
                        text: payload?.text,
                    },
                ],
            };
        case NOTIFICATION_REMOVE:
            return {
                ...state,
                notification: state.notification.slice(
                    1,
                    state.notification.length
                ),
            };
        default:
            return state;
    }
};
