// STATE
export interface ITeacherState {
    myCourses: [],
    myStudents: [],
    activeAplications: [],
    inactiveAplications: [],
}
// END :: STATE

// TYPES
export enum ActionTypes {
    SET_MY_COURSES = "SET_MY_COURSES",
    SET_MY_STUDENTS = "SET_MY_STUDENTS",
    SET_ACTIVE_APLICATONS = "SET_ACTIVE_APLICATONS",
    SET_INACTIVE_APLICATONS = "SET_INACTIVE_APLICATONS",
}
// END :: TYPES

// ACTIONS
export type Action =
    { type: ActionTypes.SET_MY_COURSES, payload: any } |
    { type: ActionTypes.SET_MY_STUDENTS, payload: any } |
    { type: ActionTypes.SET_ACTIVE_APLICATONS, payload: any } |
    { type: ActionTypes.SET_INACTIVE_APLICATONS, payload: any }
// END :: ACTIONS