import { useContext } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../../Context/AppProvider";
import { personService } from "../../Modules/PersonModule/Person.service";
import { ActionTypes } from "../../Context/Reducers/Student/StudentProvider.types";
import { notificationMsg } from "../../Services/BaseService";
import { errorMsg } from "../../Services/MessageDisplayHandler";

const StudentHomeHook = () => {
  // eslint-disable-next-line
  const [contextState, dispatch] = useContext(AppContext);

  const parsenotCompletedCourses = (data: any) => {
    let notCompletedCourses = data.data;
    notCompletedCourses.forEach((course: {}, i: number) => {
      notCompletedCourses[i] = {
        course_id: notCompletedCourses[i].course_id,
        course_name: notCompletedCourses[i].course_name,
        teacher_name: notCompletedCourses[i].teacher_name,
        average_mark: notCompletedCourses[i].average_mark,
        price: notCompletedCourses[i].price,
      };
    });
    dispatch({
      type: ActionTypes.SET_NOT_COMPLETED_COURSES,
      payload: notCompletedCourses,
    });
  };

  const fetchCourese = async () => {
    const res = await personService.fetchNotCompletedCourses();
    return res;
  };

  return useQuery("studentHome", fetchCourese, {
    onError: (err: any) => {
      errorMsg(notificationMsg(err, null));
    },
    onSettled: (val: any) => {
      parsenotCompletedCourses(val);
    },
  });
};

export default StudentHomeHook;
