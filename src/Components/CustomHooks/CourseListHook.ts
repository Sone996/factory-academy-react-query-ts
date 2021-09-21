import { useContext } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../../Context/AppProvider";
import { courseService } from "../../Modules/CourseModule/Course.service";
import { ActionTypes } from "../../Context/Reducers/App/AppProvider.types";
import { notificationMsg } from "../../Services/BaseService";
import { errorMsg } from "../../Services/MessageDisplayHandler";

const CourseListHook = () => {
  // eslint-disable-next-line
  const [contextState, dispatch] = useContext(AppContext);

  const parseAllCourses = (data: any) => {
    let allCouresList = data.data;
    allCouresList.forEach((student: {}, i: number) => {
      allCouresList[i] = {
        id: allCouresList[i].id,
        name: allCouresList[i].name,
        average_mark: allCouresList[i].average_mark,
        price: allCouresList[i].price,
      };
    });
    dispatch({
      type: ActionTypes.SET_ALL_COURSES,
      payload: allCouresList,
    });
  };

  const fetchCourses = async () => {
    const res = await courseService.fetchAllCourses();
    return res;
  };

  return useQuery("allCourses", fetchCourses, {
    onError: (err: any) => {
      errorMsg(notificationMsg(err, null));
    },
    onSettled: (val: any) => {
      parseAllCourses(val);
    },
  });
};

export default CourseListHook;
