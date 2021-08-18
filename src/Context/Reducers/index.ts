import { initState } from "./App/App.reducer";

const state = {
    ...initState
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