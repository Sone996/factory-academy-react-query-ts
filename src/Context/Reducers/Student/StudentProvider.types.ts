// STATE
export interface IStudentState {
    notCompletedCourses: [],
}
// END :: STATE

// TYPES
export enum ActionTypes {
    SET_NOT_COMPLETED_COURSES = "SET_NOT_COMPLETED_COURSES",
}
// END :: TYPES

// ACTIONS
export type Action =
    { type: ActionTypes.SET_NOT_COMPLETED_COURSES, payload: any }
// END :: ACTIONS