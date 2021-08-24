import { useContext } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../../Context/AppProvider";
import { personService } from "../../Modules/PersonModule/Person.service";
import { ActionTypes } from "../../Context/Reducers/Teacher/TeacherProvider.types";
import { notificationMsg } from "../../Services/BaseService";
import { errorMsg } from "../../Services/MessageDisplayHandler";

const MemberListHook = () => {

    // eslint-disable-next-line
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

    const fetchMyStudents = async () => {
        const res = await personService.fetchMyStudents();
        console.log(res)
        return res;
    }

    return useQuery('memberList', fetchMyStudents, {
        onError: (err: any) => {
            errorMsg(notificationMsg(err, null));
        },
        onSettled: (val: any) => {
            parseMyStudents(val);
        }
    })
}

export default MemberListHook;