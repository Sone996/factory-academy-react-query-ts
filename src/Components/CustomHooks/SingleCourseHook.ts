import { useQuery } from "react-query";
import { courseService } from "../../Modules/CourseModule/Course.service";
import { errorMsg } from "../../Services/MessageDisplayHandler";
import { notificationMsg } from "../../Services/BaseService";

const SingleCourseHook = (id: number | string) => {

  const fetchSingleCourse = async () => {
    const res = await courseService.fetchSingleCours(id);
    return res;
  };

  return useQuery("singleCourse", fetchSingleCourse, {
    onError: (err: any) => {
      errorMsg(notificationMsg(err, null));
    },
    onSettled: (val: any) => {
    },
  });
};

export default SingleCourseHook;
