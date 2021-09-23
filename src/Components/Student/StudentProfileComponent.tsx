import { FC } from "react";
import StudentCompletedCoursesHook from "../CustomHooks/StudentCompletedCoursesHook";
// COMPONETS
import Scroll from "../Shared/Scroll";
import SimpleTable from "../Shared/SimpleTable";
// END :: COMPONENTS

const StudentProfileComponent: FC = () => {
  const titles = ["Id", "Course Name", "Mark"];

  const completedCourses = StudentCompletedCoursesHook();
  
  return (
    <div className="user-profile-component flex flex-col h-full">
      <div className="flex flex-col text-xl h-full pt-6">
        <div className="flex pl-6">
          <span>My Completed Courses</span>
        </div>
        <div className="flex flex-col justify-center h-full p-16">
          <div className="relative h-full w-full">
            {completedCourses.isLoading ? (
              <div>loading</div>
            ) : completedCourses.isError ? (
              <div>{completedCourses.error.message}</div>
            ) : (
              <Scroll>
                <SimpleTable
                  model={completedCourses.data.data}
                  titles={titles}
                />
              </Scroll>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileComponent;
