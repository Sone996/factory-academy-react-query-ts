import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import  { AppContext } from "../../Context/AppProvider";
import TeacherHomeHook from "../../Components/CustomHooks/TeacherHomeHook";
import SimpleTable from "../../Components/Shared/SimpleTable";
import Scroll from "../../Components/Shared/Scroll";

const TeacherHome: React.FC = () => {

  const [contextState, dispatch] = useContext(AppContext);
  const titles = ['Id', 'Name', 'Average Mark', 'Price'];
  const history = useHistory();

  const singleView = (item: any) => {
    history.push({ pathname: `/single-course/${item.id}` });
  }

  TeacherHomeHook();

  return (
    <div className="flex flex-col w-full">
      <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
        <span>My Courses</span>
      </div>
      <div className="relative h-full w-3/4">
        <Scroll>
          <SimpleTable titles={titles} model={contextState.myCourses} singleView={singleView}></SimpleTable>
        </Scroll>
      </div>
    </div>
  )
}

export default TeacherHome;