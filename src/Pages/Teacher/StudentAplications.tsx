import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import StudentAplicationsHook from "../../Components/CustomHooks/StudentAplicationsHook";

import Scroll from "../../Components/Shared/Scroll";
import SimpleTable from "../../Components/Shared/SimpleTable";
import { ActionTypes } from "../../Context/Reducers/App/AppProvider.types";

const StudentAplications: React.FC = () => {

    const [contextState, dispatch] = useContext(AppContext);

    const [model, setModel] = useState([]);
    // const [aplications, setAplications] = useState([]);
    const titles = ['Student Id', 'COurse Id', 'Accept'];

    const getActive = () => {
        setModel(contextState.activeAplications);
    }

    const getInactive = () => {
        setModel(contextState.inactiveAplications);
    }

    const singleView = (item: any) => {
        if (item.accepted === true) {
            dispatch({
                type: ActionTypes.SET_MODAL,
                payload: {
                    name: 'finishing-course-modal',
                    status: true,
                    data: item
                }
            })
        } else {
            dispatch({
                type: ActionTypes.SET_MODAL,
                payload: {
                    name: 'requrest-accept-modal',
                    status: true,
                    data: item
                }
            })
        }
    }

    StudentAplicationsHook();

    return (
        <div className="student-aplications flex-col flex w-full">
            <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
                <span>Students</span>
            </div>
            <div className="flex w-full mt-4">
                <span className="button bg-darkGreen ml-4" onClick={getActive}>Active</span>
                <span className="button bg-darkGreen ml-4" onClick={getInactive}>Inactive</span>
            </div>

            <div className="flex flex-col justify-center h-full p-16">
                <div className="relative h-full w-full">
                    <Scroll>
                        <SimpleTable singleView={singleView} model={model} titles={titles}></SimpleTable>
                    </Scroll>
                </div>
            </div>

            {/* <div className="flex w-full justify-center mt-16">
		 	<simple-table @singleView="singleView" :model='model' :titles='titles'></simple-table>
		 </div> */}
        </div>
    );
}

export default StudentAplications;