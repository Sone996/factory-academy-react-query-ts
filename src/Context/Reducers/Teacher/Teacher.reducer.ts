import { ITeacherState, ActionTypes, Action } from "./TeacherProvider.types";

export const initTeacherState: ITeacherState = {
    myCourses: [],
    myStudents: [],
};

export const teacherReducer = (initTeacherState: ITeacherState, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_MY_COURSES:
            return {
                ...initTeacherState,
                myCourses: action.payload
            }
        case ActionTypes.SET_MY_STUDENTS:
            return {
                ...initTeacherState,
                myStudents: action.payload
            }
        default:
            break;
    }
}