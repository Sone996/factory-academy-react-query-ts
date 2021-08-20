// STATE
export interface ITeacherState {
    myCourses: [],
    myStudents: [],
}
// END :: STATE

// TYPES
export enum ActionTypes {
    SET_MY_COURSES = "SET_MY_COURSES",
    SET_MY_STUDENTS = "SET_MY_STUDENTS",
}
// END :: TYPES

// ACTIONS
export type Action =
    { type: ActionTypes.SET_MY_COURSES, payload: any } |
    { type: ActionTypes.SET_MY_STUDENTS, payload: any }
// END :: ACTIONS