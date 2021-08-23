import React, {useState, useContext} from "react";
import { AppContext } from "../../Context/AppProvider";
import StudentAplicationsHook from "../../Components/CustomHooks/StudentAplicationsHook";

import Scroll from "../../Components/Shared/Scroll";
import SimpleTable from "../../Components/Shared/SimpleTable";

const StudentAplications: React.FC = () => {

    const [ contextState, dispatch ] = useContext(AppContext);

    const [model, setModel] = useState([]);
    const [aplications, setAplications] = useState([]);
    const titles = ['Student Id', 'COurse Id', 'Accept'];

    

    const getActive = () => {
        setModel(contextState.activeAplications);
        // var active = [];
        // var i = 0;
        // aplications.forEach((aplication) => {
        //     if (aplication.accepted === true) {
        //         active[i] = aplication;
        //         i++;
        //     }
        // });
        // setModel(active);
    }

    const getInactive = () => {
        setModel(contextState.inactiveAplications);
        // var inactive = [];
        // var i = 0;
        // aplications.forEach((aplication) => {
        //     if (aplication.accepted === false) {
        //         inactive[i] = aplication;
        //         i++;
        //     }
        // });
        // setModel(inactive)
    }
    const singleView = (item: any) => {
        // if (item.accepted === true) {
        //     setModal({
        //         ...modal,
        //         status: true,
        //         modalName: 'finishing-course-modal',
        //         data: item
        //     })
        // } else {
        //     setModal({
        //         ...modal,
        //         status: true,
        //         modalName: 'requrest-accept-modal',
        //         data: item
        //     })
        // }
    }

    StudentAplicationsHook();

    console.log(contextState);

    

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