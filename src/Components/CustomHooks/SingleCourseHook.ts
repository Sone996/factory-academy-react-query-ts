import { useContext } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../../Context/AppProvider";
import { courseService } from "../../Modules/CourseModule/Course.service";
import { ActionTypes } from "../../Context/Reducers/Teacher/TeacherProvider.types";
import { errorMsg } from "../../Services/MessageDisplayHandler";
import { notificationMsg } from "../../Services/BaseService";

const SingleCourseHook = (id: number | string) => {
  // eslint-disable-next-line
  const [contextState, dispatch] = useContext(AppContext);

  const fetchSingleCourse = async () => {
    const res = await courseService.fetchSingleCours(id);
    return res;
  };

  return useQuery("singleCourse", fetchSingleCourse, {
    onError: (err: any) => {
      errorMsg(notificationMsg(err, null));
    },
    onSettled: (val: any) => {
      dispatch({
        type: ActionTypes.SET_SINGLE_COURSE,
        payload: val.data,
      });
    },
  });
};

export default SingleCourseHook;
