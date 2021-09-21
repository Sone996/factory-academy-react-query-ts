import { FC } from "react";
import { useHistory } from "react-router-dom";
import CourseListHook from "../../Components/CustomHooks/CourseListHook";
import Scroll from "../../Components/Shared/Scroll";
import SimpleTable from "../../Components/Shared/SimpleTable";

const CourseList: FC = () => {
  const titles = ["Id", "Name", "Average Mark", "Price"];
  const history = useHistory();

  const singleView = (item: any) => {
    history.push({ pathname: `/single-course/${item.id}` });
  };

  const allCourses = CourseListHook();

  return (
    <div className="professor-home flex-col flex w-full">
      <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
        <span>All Courses</span>
      </div>
      <div className="flex w-full h-full py-16 pl-5">
        <div className="relative h-full w-3/4">
          {allCourses.isLoading ? (
            <div>loading</div>
          ) : allCourses.isError ? (
            <div>{allCourses.error.message}</div>
          ) : (
            <Scroll>
              <SimpleTable
                singleView={singleView}
                model={allCourses.data.data}
                titles={titles}
              ></SimpleTable>
            </Scroll>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
