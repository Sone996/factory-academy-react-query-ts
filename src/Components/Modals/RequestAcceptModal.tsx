import "../../App.scss";
import React, { useContext, useEffect, useState } from "react";
import { notificationMsg } from "../../Services/BaseService";
import { successMsg, errorMsg } from "../../Services/MessageDisplayHandler";
import { AppContext } from "../../Context/AppProvider";
import { personService } from "../../Modules/PersonModule/Person.service";
import { ActionTypes } from "../../Context/Reducers/App/AppProvider.types";
import { useMutation } from "react-query";

const formInterface = {
  course_id: null,
  accepted: null,
};

const sendData = (requestAcceptMutation: any) => {
  requestAcceptMutation.mutate();
};

const RequestAcceptModal: React.FC = () => {
  const [contextState, dispatch] = useContext(AppContext);

  const [form, setForm] = useState(formInterface);

  const resolvingAplication = (status: any) => {
    setForm({
      ...form,
      course_id: contextState.modal.data.course_id,
      accepted: status,
    });
  };

  // const sendData = () => {
  //     requestAcceptMutation.mutate();
  // }

  const close = () => {
    dispatch({
      type: ActionTypes.SET_MODAL,
      payload: {
        name: "",
        status: false,
        data: null,
      },
    });
  };

  const requestAcceptMutation = useMutation(
    () => personService.resolveRequest(form),
    {
      onError: (err: any) => {
        errorMsg(notificationMsg(err, null));
        close();
      },
      onSuccess: (res: any) => {
        successMsg(notificationMsg(res, "REQUEST_ACCEPTED"));
        close();
      },
    }
  );

  useEffect(() => {
    if (form.accepted != null) {
      sendData(requestAcceptMutation);
    }
  }, [form.accepted, requestAcceptMutation]);

  return (
    <div
      id="requrest-accept-modal"
      className="requrest-accept-modal h-1/6 rounded-lg w-2/12 h-3/12 bg-gray-400 flex flex-row absolute text-tiny felx items-center justify-center"
    >
      <div className="flex items-center justify-between w-full px-8">
        <span
          onClick={() => resolvingAplication(false)}
          className="bg-darkRed py-2 px-4 rounded-lg cursor-pointer"
        >
          Reject
        </span>
        <span
          onClick={() => resolvingAplication(true)}
          className="bg-darkGreen py-2 px-4 rounded-lg cursor-pointer"
        >
          Accept
        </span>
      </div>
    </div>
  );
};

export default RequestAcceptModal;
