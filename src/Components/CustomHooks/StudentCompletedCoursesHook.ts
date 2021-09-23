import { useQuery, useQueryClient } from "react-query";
import { personService } from "../../Modules/PersonModule/Person.service";
import { notificationMsg } from "../../Services/BaseService";
import { errorMsg } from "../../Services/MessageDisplayHandler";

const StudentCompletedCoursesHook = () => {
  const loggedUser: any = useQueryClient().getQueryData("activeUser");

  const parseCompletedCourses = (data: any) => {
    let completedCourses = data.data;
    completedCourses.forEach((course: {}, i: number) => {
      completedCourses[i] = {
        course_id: completedCourses[i].course.id,
        course_name: completedCourses[i].course.name,
        mark: completedCourses[i].mark,
      };
    });
    return completedCourses;
  };

  const fetchCompletedCourese = async () => {
    let id = loggedUser.id;
    const res = await personService.fetchCompletedCourses(id);
    return res;
  };

  return useQuery("completedCourses", fetchCompletedCourese, {
    onError: (err: any) => {
      errorMsg(notificationMsg(err, null));
    },
    onSettled: (val: any) => {
      parseCompletedCourses(val);
    },
  });
};

export default StudentCompletedCoursesHook;
