import { initState } from "./App/App.reducer";
import { initTeacherState } from "./Teacher/Teacher.reducer";

const state = {
    ...initState,
    ...initTeacherState
};

const combineReducers = (reducers: any) => {
    return (state: any, action: any) => {
        return Object.keys(reducers).reduce(
            (acc, prop) => {
                return ({
                    ...acc,
                    ...reducers[prop]({ [prop]: acc[prop] }, action),
                })
            },
            state
        )
    }
};

export { state, combineReducers };