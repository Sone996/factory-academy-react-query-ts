import { useQuery } from "react-query";
import { personService } from "../../Modules/PersonModule/Person.service";
import { notificationMsg } from "../../Services/BaseService";
import { errorMsg } from "../../Services/MessageDisplayHandler";

const StudentAplicationsHook = () => {
  const fetchStudentAplications = () => {
    const res = personService.fetchAplicationRequests();
    return res;
  };

  return useQuery("studentAplications", fetchStudentAplications, {
    onError: (err: any) => {
      errorMsg(notificationMsg(err, null));
    },
    // onSettled: (val: any) => {
    //   console.log(val)
    // },
  });
};

export default StudentAplicationsHook;
