import { useContext } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../../Context/AppProvider";
import { ActionTypes } from "../../Context/Reducers/Student/StudentProvider.types";
import { personService } from "../../Modules/PersonModule/Person.service";

const StudentCompletedCoursesHook = () => {

    const [contextState, dispatch] = useContext(AppContext);

    const parseCompletedCourses = (data: any) => {
        let completedCourses = data.data;
        completedCourses.forEach((course: {}, i: number) => {
            completedCourses[i] = {
                course_id: completedCourses[i].course.id,
                course_name: completedCourses[i].course.name,
                mark: completedCourses[i].mark,
            }
        })
        dispatch({
            type: ActionTypes.SET_COMPLETED_COURSES,
            payload: completedCourses
        })
    }

    const fetchCompletedCourese = async () => {
        let id = contextState.user.data.id;
        const res = await personService.fetchCompletedCourses(id);
        return res;
    }

    return useQuery('completedCourses', fetchCompletedCourese, {
        onSettled: (val: any) => {
            parseCompletedCourses(val);
        }
    })
}

export default StudentCompletedCoursesHook;