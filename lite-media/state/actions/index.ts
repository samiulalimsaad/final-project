import { initialState } from "..";
import { CLOSE_MODAL, CREATE_POST, LOADING, LOGIN, LOGOUT } from "../types";

export interface actionInterface {
    type: string;
    payload?: any;
}

export const rootReducer = (state = initialState, action: actionInterface) => {
    console.log({globalState:state});
    switch (action.type) {
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
                uid: action.payload.uid,
                displayName: action.payload.displayName,
            };
        case LOGOUT:
            return { ...state, isAuth: false, displayName: null };

        default:
            return state;
    }
};
