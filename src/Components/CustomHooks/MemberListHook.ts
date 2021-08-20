import { useContext } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../../Context/AppProvider";
import { personService } from "../../Modules/PersonModule/Person.service";
import { ActionTypes } from "../../Context/Reducers/Teacher/TeacherProvider.types";

const MemberListHook = () => {

    const [contextState, dispatch] = useContext(AppContext);

    const parseMyStudents = (data: any) => {
        let myStudents = data.data;
        myStudents.forEach((student: {}, i: number) => {
            myStudents[i] = {
                user_id: myStudents[i].user_id,
                user: myStudents[i].user,
                course_name: myStudents[i].course_name,
                course_start_date: myStudents[i].course_start_date
            }
        })
        dispatch({
            type: ActionTypes.SET_MY_STUDENTS,
            payload: myStudents
        })
    }

    const fetchMyStudents = () => {
        const res = personService.fetchMyStudents();
        return res;
    }

    return useQuery('memberList', fetchMyStudents, {
        onSettled: (val: any) => {
            parseMyStudents(val);
        }
    })
}

export default MemberListHook;