import { FC, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { courseService } from "../../Modules/CourseModule/Course.service";
import { notificationMsg } from "../../Services/BaseService";
import { successMsg, errorMsg } from "../../Services/MessageDisplayHandler";

const formInterface = {
  id: null,
  comment: "",
};

const SingleCourseStudentComponent: FC<{data: any}> = ({ data }) => {
  const [form, setForm] = useState(formInterface);

  const commentHandler = (event: any) => {
    setForm({
      ...form,
      comment: event.target.value,
    });
  };

  const studentSingleCourseMutation = useMutation(
    () => courseService.buyCourse(form),
    {
      onError: (err: any) => {
        errorMsg(notificationMsg(err, null));
      },
      onSettled: (val: any) => {
        successMsg(notificationMsg(val, "COURSE_BOUGHT"));
      },
    }
  );

  const buyCourse = () => {
    studentSingleCourseMutation.mutate();
  };

  useEffect(() => {
    setForm({
      ...form,
      id: data.id,
    });
  }, []);

  return (
    <div className="single-course-component flex flex-col text-xl w-full">
      <div className="felx flex-col justify-between px-6">
        <div className="flex py-10">
          <textarea
            v-model="form.comment"
            value={form.comment}
            onChange={commentHandler}
            className="border resize-none w-full rounded p-3"
            placeholder="Message for professor"
          />
        </div>
        <div className="flex">
          <span className="button bg-darkGreen" onClick={buyCourse}>
            BUY
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleCourseStudentComponent;
