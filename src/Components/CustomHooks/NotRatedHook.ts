import { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { AppContext } from "../../Context/AppProvider";
import { ActionTypes } from "../../Context/Reducers/App/AppProvider.types";
import { errorMsg } from "../../Services/MessageDisplayHandler";
import { notificationMsg } from "../../Services/BaseService";
import { personService } from "../../Modules/PersonModule/Person.service";

const NotRatedHook = () => {
  // eslint-disable-next-line
  const [contextState, dispatch] = useContext(AppContext);
  const loggedUser: any = useQueryClient().getQueryData("activeUser");

  const fetchNotRated = async () => {
    const res = await personService.fetchNotRatedCourses(
      loggedUser.id
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
