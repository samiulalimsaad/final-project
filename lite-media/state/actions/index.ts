import { initialState } from "..";
import { CLOSE_MODAL, CREATE_POST, LOADING, LOGIN, LOGOUT } from "../types";

export interface actionInterface {
    type: string;
    payload?: any;
}

export const rootReducer = (state = initialState, action: actionInterface) => {
    console.log(state);
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
                auth: true,
                displayName: action.payload.displayName,
            };
        case LOGOUT:
            return { ...state, auth: false, displayName: null };

        default:
            return state;
    }
};
