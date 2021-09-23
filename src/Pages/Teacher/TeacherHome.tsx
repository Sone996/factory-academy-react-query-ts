import { FC } from "react";
import { useHistory } from "react-router-dom";
import TeacherHomeHook from "../../Components/CustomHooks/TeacherHomeHook";
import SimpleTable from "../../Components/Shared/SimpleTable";
import Scroll from "../../Components/Shared/Scroll";
import { IBasicTeacherCourseData } from "../../Services/Interfaces";

const TeacherHome: FC = () => {
  const titles = ["Id", "Name", "Average Mark", "Price"];
  const history = useHistory();

  const singleView = (item: IBasicTeacherCourseData) => {
    history.push({ pathname: `/single-course/${item.id}` });
  };

  let myCourses = TeacherHomeHook();

  return (
    <div className="flex flex-col w-full">
      <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
        <span>My Courses</span>
      </div>
      <div className="relative h-full w-3/4">
        {myCourses.isLoading ? (
          <div>loading</div>
        ) : myCourses.isError ? (
          <div>{myCourses.error.message}</div>
        ) : (
          <Scroll>
            <SimpleTable
              titles={titles}
              model={myCourses.data}
              singleView={singleView}
            ></SimpleTable>
          </Scroll>
        )}
      </div>
    </div>
  );
};

export default TeacherHome;
