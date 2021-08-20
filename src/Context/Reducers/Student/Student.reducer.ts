import { IStudentState, ActionTypes, Action } from "./StudentProvider.types";

export const initStudentState: IStudentState = {
    notCompletedCourses: [],
    completedCourses: [],
};

export const studentReducer = (initStudentState: IStudentState, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_NOT_COMPLETED_COURSES:
            return {
                ...initStudentState,
                notCompletedCourses: action.payload
            }
        case ActionTypes.SET_COMPLETED_COURSES:
            return {
                ...initStudentState,
                completedCourses: action.payload
            }
        default:
            break;
    }
};