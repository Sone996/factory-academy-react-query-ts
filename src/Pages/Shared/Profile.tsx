import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../Context/AppProvider";
import { ActionTypes } from "../../Context/Reducers/App/AppProvider.types";
import { personService } from "../../Modules/PersonModule/Person.service";
// COMPONENTS
import TeacherProfileComponent from "../../Components/Teacher/TeacherProfileComponent";
import StudentProfileComponent from "../../Components/Student/StudentProfileComponent";
// END :: COMPONENTS

const initLoad = (fullPath: string, dispatch: any) => {
    let lastPart = fullPath.split("/");
    let id = lastPart[lastPart.length - 1];
    personService.goProfile(id).then(res => {
        dispatch({
            type: ActionTypes.SET_PROFILE_DATA,
            payload: res.data
        })
    }).catch();
}

const Profile: React.FC = () => {

    const [stateContext, dispatch] = useContext(AppContext);
    const history = useHistory();

    useEffect(() => {
        initLoad(history.location.pathname, dispatch);
    }, [history.location.pathname, dispatch])

    return (
        <div className="profile flex flex-col w-full h-full">
            <div className="flex flex-col items-start p-6 text-xl border-b">
                <span>Name: {stateContext.profileData?.name}</span>
                <span>Surname: {stateContext.profileData?.surname}</span>
                <span>Email: {stateContext.profileData?.email}</span>
                <span>Role: {stateContext.profileData?.role}</span>
            </div>
            <div className="flex flex-col h-full">
                {stateContext.user.data.role === 'teacher' ? <TeacherProfileComponent /> : <StudentProfileComponent />}
            </div>
        </div>
    );
}

export default Profile;