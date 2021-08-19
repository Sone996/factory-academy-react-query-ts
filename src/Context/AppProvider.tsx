import { FC, ReactNode, useReducer, createContext } from "react";

import { IAppState } from "./Reducers/App/AppProvider.types";
import { ITeacherState } from "./Reducers/Teacher/TeacherProvider.types";

export const AppContext = createContext<any>(null);

interface StateObj extends IAppState, ITeacherState { }

const AppProvider: FC<{
    reducer: any,
    state: StateObj,
    children: ReactNode
}> = ({ reducer, state, children }) => {
    const value = useReducer(reducer, state);

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    );
}

export default AppProvider;