import { useContext, useState, FC } from "react";
import { AppContext } from "../../Context/AppProvider";
import StudentAplicationsHook from "../../Components/CustomHooks/StudentAplicationsHook";
import Scroll from "../../Components/Shared/Scroll";
import SimpleTable from "../../Components/Shared/SimpleTable";
import { ActionTypes } from "../../Context/Reducers/App/AppProvider.types";

const parseAplication = (val: any) => {
  let result: any = [];
  val.forEach((aplication: {}, i: number) => {
    let ap = {
      student_id: val[i].student_id,
      course_id: val[i].course_id,
      accepted: val[i].accepted,
    };
    result.push(ap);
  });
  return result;
};

const StudentAplications: FC = () => {
  // eslint-disable-next-line
  const [contextState, dispatch] = useContext(AppContext);
  const [model, setModel] = useState([]);
  const titles = ["Student Id", "Course Id", "Accept"];
  const studentAplications: any = StudentAplicationsHook();

  const getActive = () => {
    let active = studentAplications.data.data;
    active = active.filter((ac: { accepted: boolean }) => ac.accepted === true);
    setModel(parseAplication(active));
  };

  const getInactive = () => {
    let inactive = studentAplications.data.data;
    inactive = inactive.filter(
      (inac: { accepted: boolean }) => inac.accepted === false
    );
    setModel(parseAplication(inactive));
  };

  const singleView = (item: any) => {
    if (item.accepted === true) {
      dispatch({
        type: ActionTypes.SET_MODAL,
        payload: {
          name: "finishing-course-modal",
          status: true,
          data: item,
        },
      });
    } else {
      dispatch({
        type: ActionTypes.SET_MODAL,
        payload: {
          name: "requrest-accept-modal",
          status: true,
          data: item,
        },
      });
    }
  };

  return (
    <div className="student-aplications flex-col flex w-full">
      <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
        <span>Students</span>
      </div>
      <div className="flex w-full mt-4">
        <span className="button bg-darkGreen ml-4" onClick={getActive}>
          Active
        </span>
        <span className="button bg-darkGreen ml-4" onClick={getInactive}>
          Inactive
        </span>
      </div>

      <div className="flex flex-col justify-center h-full p-16">
        <div className="relative h-full w-full">
          {studentAplications.isLoading ? (
            <div>loading</div>
          ) : studentAplications.isError ? (
            <div>{studentAplications.error.message}</div>
          ) : (
            <Scroll>
              <SimpleTable
                singleView={singleView}
                model={model}
                titles={titles}
              ></SimpleTable>
            </Scroll>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAplications;
