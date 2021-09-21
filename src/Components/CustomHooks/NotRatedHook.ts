import { useContext } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../../Context/AppProvider";
import { ActionTypes } from "../../Context/Reducers/App/AppProvider.types";
import { errorMsg } from "../../Services/MessageDisplayHandler";
import { notificationMsg } from "../../Services/BaseService";
import { personService } from "../../Modules/PersonModule/Person.service";

const NotRatedHook = () => {
  const [contextState, dispatch] = useContext(AppContext);

  const fetchNotRated = async () => {
    const res = await personService.fetchNotRatedCourses(
      contextState.user.data.id
    );
    return res;
  };

  return useQuery("notRated", fetchNotRated, {
    onError: (err: any) => {
      errorMsg(notificationMsg(err, null));
    },
    onSettled: (val: any) => {
      if (Object.keys(val.data).length > 0) {
        dispatch({
          type: ActionTypes.SET_MODAL,
          payload: {
            name: "rate-course",
            status: true,
            data: val.data,
          },
        });
      }
    },
  });
};

export default NotRatedHook;
