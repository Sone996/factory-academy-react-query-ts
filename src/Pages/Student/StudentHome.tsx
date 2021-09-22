import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AppContext } from "../../Context/AppProvider";
import StudentHomeHook from "../../Components/CustomHooks/StudentHomeHook";
import SimpleTable from "../../Components/Shared/SimpleTable";
import Scroll from "../../Components/Shared/Scroll";
import NotRatedHook from "../../Components/CustomHooks/NotRatedHook";

const StudentHome: React.FC = () => {
  const [contextState] = useContext(AppContext);
  const titles = ["Id", "Course Name", "Teacher Name", "Average Mark", "Price"];
  const history = useHistory();

  const singleView = (item: any) => {
    history.push({ pathname: `/single-course/${item.course_id}` });
  };

  const notCompletedCourses = StudentHomeHook();
  NotRatedHook();

  return (
    <div className="student-home flex-col flex w-full">
      <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
        <span>Courses List</span>
      </div>
      <div className="flex w-full h-full py-16 pl-5">
        <div className="relative h-full w-3/4">
          {notCompletedCourses.isLoading ? (
            <div>loading</div>
          ) : notCompletedCourses.isError ? (
            <div>{notCompletedCourses.error.message}</div>
          ) : (
            <Scroll>
              <SimpleTable
                singleView={singleView}
                model={notCompletedCourses.data.data}
                titles={titles}
              />
            </Scroll>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
