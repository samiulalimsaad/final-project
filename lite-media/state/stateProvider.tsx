import { createContext, ReactNode, useContext, useReducer } from "react";
import { initialState, reducerInterface } from ".";
import { rootReducer } from "./actions";

const StateContext = createContext<reducerInterface>({
    ...initialState,
    dispatch: () => null,
});

export const GetState = () => useContext(StateContext);

type Props = {
    children: ReactNode;
};

export function StateProvider({ children }: Props) {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    console.log("Global State", state);
    return (
        <>
            <StateContext.Provider value={{ ...state, dispatch }}>
                {children}
            </StateContext.Provider>
        </>
    );
}
