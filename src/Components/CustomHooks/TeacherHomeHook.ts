import { useContext } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../../Context/AppProvider";
import { personService } from "../../Modules/PersonModule/Person.service";
import { ActionTypes } from "../../Context/Reducers/Teacher/TeacherProvider.types";

const TeacherHomeHook = () => {

    const [contextState, dispatch] = useContext(AppContext);

    const fetchCourses = async () => {
        const res = await personService.fetchMyCourses(contextState.user.data.id);
        return res;
    }

    const parseMyCourses = (data: any) => {
        let myCourses = data.data;
        myCourses.forEach((course: object, i: number) => {
            myCourses[i] = {
                id: myCourses[i].id,
                name: myCourses[i].name,
                average_mark: myCourses[i].average_mark,
                price: myCourses[i].price
            }
        })
        dispatch({
            type: ActionTypes.SET_MY_COURSES,
            payload: myCourses
        })
    }

    return useQuery('teacher', fetchCourses, {
        onSettled: (val: any) => {
            parseMyCourses(val);
        }
    })
}

export default TeacherHomeHook;