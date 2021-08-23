import React, { useContext } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../../Context/AppProvider";
import { courseService } from "../../Modules/CourseModule/Course.service";
import { ActionTypes } from "../../Context/Reducers/Teacher/TeacherProvider.types";


const StudentsOnCourseHook = (props: any) => {

    const [contextState, dispatch] = useContext(AppContext);

    const studentsOnCourse = async () => {
        const res = await courseService.studentsOnCourse({ course_id: props });
        return res;
    }

    const parseStudentsOnCourse = (data: any) => {
        let studentsOnCourseList = data.data;
        studentsOnCourseList.forEach((student: {}, i: number) => {
            studentsOnCourseList[i] = {
                id: studentsOnCourseList[i].user_id,
                user: studentsOnCourseList[i].user,
                course_start_date: studentsOnCourseList[i].course_start_date,
                complete: studentsOnCourseList[i].complete
            }
        })
        dispatch({
            type: ActionTypes.SET_STUDENTS_ON_COURSE,
            payload: studentsOnCourseList
        })
    }

    return useQuery('studentsOnCourse', studentsOnCourse, {
        onSettled: (val: any) => {
            parseStudentsOnCourse(val);
        }
    })
}

export default StudentsOnCourseHook;