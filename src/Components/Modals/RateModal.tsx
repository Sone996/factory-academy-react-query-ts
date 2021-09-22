import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AppContext } from "../../Context/AppProvider";
import { ActionTypes } from "../../Context/Reducers/App/AppProvider.types";
import { personService } from "../../Modules/PersonModule/Person.service";

const formInterface = {
  comment: "",
  mark: "",
  personId: null,
};

const RateCourse: React.FC = () => {
  // eslint-disable-next-line
  const [contextState, dispatch] = useContext(AppContext);
  const [form, setForm] = useState(formInterface);
  const loggedUser: any = useQueryClient().getQueryData("activeUser");

  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const completeCourse = () => {
    rateCourseMutation.mutate();
  };

  const cancel = () => {
    dispatch({
      type: ActionTypes.SET_MODAL,
      payload: {
        name: "",
        status: false,
        data: null,
      },
    });
  };

  const rateCourseMutation = useMutation(
    () => personService.completeCourse(form),
    {
      onError: (err: any) => {
        console.log(err.response.data.errors);
        cancel();
      },
      onSuccess: (val: any) => {
        console.log("rated! ", val);
        cancel();
      },
    }
  );

  useEffect(() => {
    setForm({
      ...form,
      personId: loggedUser.id,
    });
  }, [loggedUser.id]);

  return (
    <div
      id="rate-course-modal"
      className="rate-course-modal rounded-lg w-4/12 h-3/12 bg-gray-400 flex flex-col absolute text-tiny felx items-center justify-center"
    >
      <div className="flex items-center justify-center w-full px-8 py-4">
        <span className="font-bold text-xl text-white">Rate Course</span>
      </div>
      <div className="flex flex-col w-full p-4 pt-0">
        <textarea
          value={form.comment}
          onChange={inputHandler}
          name="comment"
          className="border resize-none w-full rounded p-3"
          placeholder="Your ocmment"
        />
        <div className="flex w-full p-4 pl-0 items-center">
          <span className="flex font-bold text-white mr-4">Rate here:</span>
          <input
            value={form.mark}
            onChange={inputHandler}
            name="mark"
            className="input"
            type="text"
            placeholder="1-5"
          />
        </div>
        <div className="flex items-center justify-between w-full px-8">
          <span
            onClick={cancel}
            className="bg-darkRed py-2 px-4 rounded-lg cursor-pointer text-white"
          >
            Cancel
          </span>
          <span
            onClick={completeCourse}
            className="bg-darkGreen py-2 px-4 rounded-lg cursor-pointer text-white"
          >
            Send
          </span>
        </div>
      </div>
    </div>
  );
};

export default RateCourse;
