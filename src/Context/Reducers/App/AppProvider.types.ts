// STATE

export interface IModal {
    name: string,
    status: boolean,
    data: {} | null,
}
export interface IAppState {
    user: any,
    loader: boolean,
    error: string | null,
    success: String | null,
    profileData: {} | null,
    allCourses: [] | {},
    modal: IModal
}
// END :: STATE

// TYPES
export enum ActionTypes {
    SET_LOADER = "SET_LOADER",
    SET_ERROR = "SET_ERROR",
    SET_SUCCESS = "SET_SUCCESS",
    SET_USER = "SET_USER",
    SET_PROFILE_DATA = "SET_PROFILE_DATA",
    SET_ALL_COURSES = "SET_ALL_COURSES", 
    SET_MODAL = "SET_MODAL",
}
// END :: TYPES

// ACTIONS
export type Action =
    { type: ActionTypes.SET_LOADER, payload: boolean } |
    { type: ActionTypes.SET_USER, payload: any } |
    { type: ActionTypes.SET_ERROR, payload: string } |
    { type: ActionTypes.SET_SUCCESS, payload: string } |
    { type: ActionTypes.SET_PROFILE_DATA, payload: Object } |
    { type: ActionTypes.SET_ALL_COURSES, payload: Object } |
    { type: ActionTypes.SET_MODAL, payload: any }
// END :: ACTIONS