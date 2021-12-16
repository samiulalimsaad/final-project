import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useReducer,
} from "react";
import { initialState, initialStateInterface } from ".";
import { rootReducer } from "./actions";

const StateContext = createContext<initialStateInterface>({
    ...initialState,
    dispatch: () => null,
});

export const GetState = () => useContext(StateContext);

type Props = {
    children: ReactNode;
};

export function StateProvider({ children }: Props) {
    const [state, dispatcher] = useReducer(rootReducer, initialState);
    const store = useMemo(() => state, [state]);
    const dispatch = useCallback(dispatcher, [dispatcher]);
    // console.log("Global State", state);
    return (
        <>
            <StateContext.Provider value={{ ...store, dispatch }}>
                {children}
            </StateContext.Provider>
        </>
    );
}
