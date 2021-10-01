import { initialState } from "..";
import { CLOSE_MODAL, CREATE_POST } from "../types";

export interface actionInterface {
    type: string;
    payload?: any;
}

export const rootReducer = (state = initialState, action: actionInterface) => {
    console.log(state);
    switch (action.type) {
        case CREATE_POST:
            console.log("object");
            return { ...state, createPost: true };
        case CLOSE_MODAL:
            return { ...state, createPost: false };

        default:
            return state;
    }
};
