import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { AppContext } from "../../Context/AppProvider";
import { ActionTypes } from "../../Context/Reducers/App/AppProvider.types";
import { notificationMsg } from "../../Services/BaseService";
import { successMsg, errorMsg } from "../../Services/MessageDisplayHandler";
import { courseService } from "../../Modules/CourseModule/Course.service";

const formInterface = {
  name: "",
  price: "",
  description: "",
};

const NewCourse: React.FC = () => {
  // eslint-disable-next-line
  const [contextState, dispatch] = useContext(AppContext);
  const [form, setForm] = useState(formInterface);

  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const createCourse = () => {
    newCourseMutation.mutate(form);
  };

  const newCourseMutation = useMutation(
    (val: any) => courseService.createCourse(val),
    {
      onMutate: () => {
        dispatch({
          type: ActionTypes.SET_LOADER,
          payload: true,
        });
      },
      onError: (err: any) => {
        dispatch({
          type: ActionTypes.SET_LOADER,
          payload: false,
        });
        errorMsg(notificationMsg(err, null));
      },
      onSuccess: (res: any) => {
        dispatch({
          type: ActionTypes.SET_LOADER,
          payload: false,
        });
        successMsg(notificationMsg(res, "COURSE_CREATED_SUCCESS"));
        setForm(formInterface);
      },
    }
  );

  return (
    <div className="new-course flex-col flex w-full">
      <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
        <span>New Course</span>
      </div>
      <div className="flex flex-col w-1/2 px-16">
        <div className="flex flex-col mt-8 w-1/2">
          <span>Name</span>
          <input
            className="input"
            type="text"
            autoComplete="off"
            value={form?.name}
            name="name"
            onChange={inputHandler}
          />
        </div>
        <div className="flex flex-col mt-8 w-1/2">
          <span>Price</span>
          <input
            className="input"
            type="number"
            autoComplete="off"
            value={form?.price}
            name="price"
            onChange={inputHandler}
          />
        </div>
        <div className="flex flex-col mt-8">
          <textarea
            value={form?.description}
            onChange={inputHandler}
            className="border resize-none w-full rounded p-3"
            name="description"
            placeholder="Description"
          />
        </div>
        <div className="flex mt-8 w-1/4">
          <div onClick={createCourse} className="button bg-blue-500">
            Create
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCourse;
