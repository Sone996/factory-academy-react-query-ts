import { useQuery, useQueryClient } from "react-query";
import { personService } from "../../Modules/PersonModule/Person.service";
import { notificationMsg } from "../../Services/BaseService";
import { errorMsg } from "../../Services/MessageDisplayHandler";

const TeacherHomeHook = () => {
  const loggedUser: any = useQueryClient().getQueryData("activeUser");

  const fetchCourses = async () => {
    const res = await personService.fetchMyCourses(loggedUser.id);
    return res.data;
  };

  const parseMyCourses = (data: any) => {
    let myCourses = data;
    myCourses.forEach((course: object, i: number) => {
      myCourses[i] = {
        id: myCourses[i].id,
        name: myCourses[i].name,
        average_mark: myCourses[i].average_mark,
        price: myCourses[i].price,
      };
    });
    return myCourses;
  };

  return useQuery("teacherMyCourses", fetchCourses, {
    onError: (err: any) => {
      errorMsg(notificationMsg(err, null));
    },
    onSettled: (val: any) => {
      parseMyCourses(val);
    },
  });
};

export default TeacherHomeHook;
