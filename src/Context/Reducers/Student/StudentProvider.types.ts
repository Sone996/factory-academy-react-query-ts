// STATE
export interface IStudentState {
    notCompletedCourses: [],
    completedCourses: [],
}
// END :: STATE

// TYPES
export enum ActionTypes {
    SET_NOT_COMPLETED_COURSES = "SET_NOT_COMPLETED_COURSES",
    SET_COMPLETED_COURSES = "SET_COMPLETED_COURSES",
}
// END :: TYPES

// ACTIONS
export type Action =
{ type: ActionTypes.SET_NOT_COMPLETED_COURSES, payload: any } |
{ type: ActionTypes.SET_COMPLETED_COURSES, payload: any }
// END :: ACTIONS