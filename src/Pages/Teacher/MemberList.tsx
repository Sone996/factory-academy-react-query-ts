import { FC } from "react";
import { useHistory } from "react-router";
import MemberListHook from "../../Components/CustomHooks/MemberListHook";
import Scroll from "../../Components/Shared/Scroll";
import SimpleTable from "../../Components/Shared/SimpleTable";

const MemberList: FC = () => {
  const titles = ["Id", "Student", "Course", "Date of Start"];
  const history = useHistory();

  const myStudents = MemberListHook();

  const singleView = (item: any) => {
    history.push({ pathname: `/profile/${item.user_id}` });
  };

  return (
    <div className="member-list flex-col flex w-full">
      <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
        <span>My Students</span>
      </div>
      <div className="relative w-3/4 h-full justify-center mt-16">
        {myStudents.isLoading ? (
          <div>loading</div>
        ) : myStudents.isError ? (
          <div>{myStudents.error.message}</div>
        ) : (
          <Scroll>
            <SimpleTable
              singleView={singleView}
              model={myStudents.data.data}
              titles={titles}
            ></SimpleTable>
          </Scroll>
        )}
      </div>
    </div>
  );
};

export default MemberList;
