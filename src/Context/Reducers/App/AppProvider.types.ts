// STATE
export interface IAppState {
    user: any,
    loader: boolean,
    error: string | null,
    success: String | null
}
// END :: STATE

// TYPES
export enum ActionTypes {
    SET_LOADER = "SET_LOADER",
    SET_ERROR = "SET_ERROR",
    SET_SUCCESS = "SET_SUCCESS",
    SET_USER = "SET_USER"
}
// END :: TYPES

// ACTIONS
export type Action =
    { type: ActionTypes.SET_LOADER, payload: boolean } |
    { type: ActionTypes.SET_USER, payload: any } |
    { type: ActionTypes.SET_ERROR, payload: string } |
    { type: ActionTypes.SET_SUCCESS, payload: string }
// END :: ACTIONS