import { useContext } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { AppContext } from "../Context/AppProvider";
import { ActionTypes } from "../Context/Reducers/App/AppProvider.types";
import { authService } from "../Modules/AuthModule/Auth.service";

export const useFetchActiveUser = () => {
  // eslint-disable-next-line
  const [contextSTate, dispatch] = useContext(AppContext);
  const history = useHistory();

  const fetch = async () => {
    dispatch({
      type: ActionTypes.SET_LOADER,
      payload: true,
    });
    const res = await authService.fetchActiveAccount();
    return res.data;
  };

  return useQuery("activeUser", fetch, {
    onSuccess: (val: any) => {
      dispatch({
        type: ActionTypes.SET_LOADER,
        payload: false,
      });
      dispatch({
        type: ActionTypes.SET_USER,
        payload: val,
      });
    },
    onError: () => {
      history.push("/login");
    },
    onSettled: () => {
      dispatch({
        type: ActionTypes.SET_LOADER,
        payload: false,
      });
    },
  });
};
