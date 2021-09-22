import { FC } from "react";
import { useHistory } from "react-router-dom";
import StudentsOnCourseHook from "../../Components/CustomHooks/StudentsOnCourseHook";
import SingleCourseHook from "../../Components/CustomHooks/SingleCourseHook";
// COMPONENTS
import SingleCourseComponent from "../../Components/Teacher/SingleCourseComponent";
import SingleCourseStudentComponent from "../../Components/Student/SingleCourseStudentComponent";
import { useQueryClient } from "react-query";
// END :: COMPONENTS

const SingleCourse: FC = () => {
  const loggedUser: any = useQueryClient().getQueryData("activeUser");
  const history = useHistory();

  let x = history.location.pathname.split("/");
  let id = x[x.length - 1];

  const singleCourse = SingleCourseHook(id);

  if (loggedUser.role === "teacher") {
    const studentsOnCourse: any = StudentsOnCourseHook(id);

    return (
      <div className="course flex w-full">
        {singleCourse.isLoading ? (
          <div>loading...</div>
        ) : singleCourse.isError ? (
          <div>{singleCourse.error.message}</div>
        ) : (
          <>
            <div className="flex flex-col w-1/3 items-start py-4 px-4 border-r text-xl font-bold border-b">
              <div className="flex flex-col w-full items-start">
                <span>Name: {singleCourse.data.data.name}</span>
                <span>Price: {singleCourse.data.data.price}</span>
              </div>
              <div className="flex border whitespace-pre-line h-full overflow-y-auto mb-4">
                <span>{singleCourse.data.data.description}</span>
              </div>
            </div>
            <div className="flex flex-col items-center w-2/3">
              {studentsOnCourse.isSuccess ? <SingleCourseComponent tableData={studentsOnCourse.data.data} /> : <span className="text-3xl">Nema studenata</span>}
            </div>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div className="course flex w-full">
        {singleCourse.isLoading ? (
          <div>loading...</div>
        ) : singleCourse.isError ? (
          <div>{singleCourse.error.message}</div>
        ) : (
          <>
            <div className="flex flex-col w-1/3 items-start py-4 px-4 border-r text-xl font-bold border-b">
              <div className="flex flex-col w-full items-start">
                <span>Name: {singleCourse.data.data.name}</span>
                <span>Price: {singleCourse.data.data.price}</span>
              </div>
              <div className="flex border whitespace-pre-line h-full overflow-y-auto mb-4">
                <span>{singleCourse.data.data.description}</span>
              </div>
            </div>
            <div className="flex flex-col items-center w-full">
              {singleCourse ? (
                <SingleCourseStudentComponent data={singleCourse.data.data} />
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
};

export default SingleCourse;
