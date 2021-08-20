import { IStudentState, ActionTypes, Action } from "./StudentProvider.types";

export const initStudentState: IStudentState = {
    notCompletedCourses: [],
};

export const studentReducer = (initStudentState: IStudentState, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_NOT_COMPLETED_COURSES:
            return {
                ...initStudentState,
                notCompletedCourses: action.payload
            }
        default:
            break;
    }
};