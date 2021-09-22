import { useQuery } from "react-query";
import { personService } from "../../Modules/PersonModule/Person.service";
import { notificationMsg } from "../../Services/BaseService";
import { errorMsg } from "../../Services/MessageDisplayHandler";

const StudentHomeHook = () => {

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
    return notCompletedCourses;
  };

  const fetchCourese = async () => {
    const res = await personService.fetchNotCompletedCourses();
    return res;
  };

  return useQuery("notCompletedCourses", fetchCourese, {
    onError: (err: any) => {
      errorMsg(notificationMsg(err, null));
    },
    onSettled: (val: any) => {
      parsenotCompletedCourses(val);
    },
  });
};

export default StudentHomeHook;
