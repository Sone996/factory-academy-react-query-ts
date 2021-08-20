import React, { useContext } from "react";
import { useHistory } from "react-router";
import MemberListHook from "../../Components/CustomHooks/MemberListHook";

import SimpleTable from "../../Components/Shared/SimpleTable";
import { AppContext } from "../../Context/AppProvider";

const MemberList: React.FC = () => {

    const titles = ['Id', 'Student', 'Course', 'Date of Start'];
    const [contextState, dispatch] = useContext(AppContext);
    const history = useHistory();

    MemberListHook();

    console.log(contextState.myStudents)

    const singleView = (item: any) => {
        history.push({ pathname: `/profile/${item.user_id}` });
    }

    return (
        <div className="member-list flex-col flex w-full">
            <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
                <span>My Students</span>
            </div>
            <div className="flex w-full justify-center mt-16">
                <SimpleTable singleView={singleView} model={contextState.myStudents} titles={titles}></SimpleTable>
            </div>
        </div>
    );
}

export default MemberList;