import { IAppState, ActionTypes, Action } from "./AppProvider.types";

export const initState: IAppState = {
    user: null,
    loader: false,
    error: null,
    success: null,
    profileData: null,
    allCourses: [],
};

export const appReducer = (initState: IAppState, action: Action): IAppState => {
    switch (action.type) {
        case ActionTypes.SET_LOADER:
            return {
                ...initState,
                loader: action.payload
            }
        case ActionTypes.SET_USER:
            return {
                ...initState,
                user: action.payload
            }
        case ActionTypes.SET_SUCCESS:
            return {
                ...initState,
                success: action.payload
            }
        case ActionTypes.SET_ERROR:
            return {
                ...initState,
                error: action.payload
            }
        case ActionTypes.SET_PROFILE_DATA:
            return {
                ...initState,
                profileData: action.payload
            }
        case ActionTypes.SET_ALL_COURSES:
            return {
                ...initState,
                allCourses: action.payload
            }
        default:
            break;
    }
    return initState;
}