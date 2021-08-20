import { initState } from "./App/App.reducer";
import { initTeacherState } from "./Teacher/Teacher.reducer";
import { initStudentState } from "./Student/Student.reducer";

const state = {
    ...initState,
    ...initTeacherState,
    ...initStudentState
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