// STATE
export interface ITeacherState {
    myCourses: [],
}
// END :: STATE

// TYPES
export enum ActionTypes {
    SET_MY_COURSES = "SET_MY_COURSES",
}
// END :: TYPES

// ACTIONS
export type Action =
    { type: ActionTypes.SET_MY_COURSES, payload: any }
// END :: ACTIONS