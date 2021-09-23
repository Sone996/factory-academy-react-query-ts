import { useQuery } from "react-query";
import { personService } from "../../Modules/PersonModule/Person.service";
import { notificationMsg } from "../../Services/BaseService";
import { errorMsg } from "../../Services/MessageDisplayHandler";

const MemberListHook = () => {
  const parseMyStudents = (data: any) => {
    let myStudents = data.data;
    myStudents.forEach((student: {}, i: number) => {
      myStudents[i] = {
        user_id: myStudents[i].user_id,
        user: myStudents[i].user,
        course_name: myStudents[i].course_name,
        course_start_date: myStudents[i].course_start_date,
      };
    });
  };

  const fetchMyStudents = async () => {
    const res = await personService.fetchMyStudents();
    return res;
  };

  return useQuery("memberList", fetchMyStudents, {
    onError: (err: any) => {
      errorMsg(notificationMsg(err, null));
    },
    onSettled: (val: any) => {
      parseMyStudents(val);
    },
  });
};

export default MemberListHook;
