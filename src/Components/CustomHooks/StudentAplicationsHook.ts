import { useContext } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../../Context/AppProvider";
import { ActionTypes } from "../../Context/Reducers/Teacher/TeacherProvider.types";
import { personService } from "../../Modules/PersonModule/Person.service";
import { notificationMsg } from "../../Services/BaseService";
import { errorMsg } from "../../Services/MessageDisplayHandler";

const StudentAplicationsHook = () => {
  // eslint-disable-next-line
  const [contextState, dispatch] = useContext(AppContext);

  const parseAplicationRequests = (data: any) => {
    let aplicationRequests = data.data;
    let activeAplications: Array<{}> = [];
    let inactiveAplications: Array<{}> = [];

    aplicationRequests.forEach((aplication: {}, i: number) => {
      aplicationRequests[i] = {
        student_id: aplicationRequests[i].student_id,
        course_id: aplicationRequests[i].course_id,
        accepted: aplicationRequests[i].accepted,
      };
      if (aplicationRequests[i].accepted === true) {
        activeAplications.push(aplicationRequests[i]);
      } else {
        inactiveAplications.push(aplicationRequests[i]);
      }
    });
    dispatch({
      type: ActionTypes.SET_ACTIVE_APLICATONS,
      payload: activeAplications,
    });
    dispatch({
      type: ActionTypes.SET_INACTIVE_APLICATONS,
      payload: inactiveAplications,
    });
  };

  const fetchStudentAplications = () => {
    const res = personService.fetchAplicationRequests();
    return res;
  };

  return useQuery("studentAPlications", fetchStudentAplications, {
    onError: (err: any) => {
      errorMsg(notificationMsg(err, null));
    },
    onSettled: (val: any) => {
      parseAplicationRequests(val);
    },
  });
};

export default StudentAplicationsHook;
