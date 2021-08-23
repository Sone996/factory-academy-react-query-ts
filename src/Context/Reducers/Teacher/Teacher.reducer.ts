import { ITeacherState, ActionTypes, Action } from "./TeacherProvider.types";

export const initTeacherState: ITeacherState = {
    myCourses: [],
    myStudents: [],
    activeAplications: [],
    inactiveAplications: [],
    singleCourse: {},
    studentsOnCourse: [],
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
        case ActionTypes.SET_ACTIVE_APLICATONS:
            return {
                ...initTeacherState,
                activeAplications: action.payload
            }
        case ActionTypes.SET_INACTIVE_APLICATONS:
            return {
                ...initTeacherState,
                inactiveAplications: action.payload
            }
        case ActionTypes.SET_SINGLE_COURSE:
            return {
                ...initTeacherState,
                singleCourse: action.payload
            }
        case ActionTypes.SET_STUDENTS_ON_COURSE:
            return {
                ...initTeacherState,
                studentsOnCourse: action.payload
            }
        default:
            break;
    }
}