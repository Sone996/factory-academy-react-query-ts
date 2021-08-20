import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../Context/AppProvider";
import { ActionTypes } from "../../Context/Reducers/App/AppProvider.types";
import { personService } from "../../Modules/PersonModule/Person.service";

const Profile: React.FC = () => {

    const [stateContext, dispatch] = useContext(AppContext);
    const history = useHistory();

    const initLoad = () => {
        let x = history.location.pathname.split("/");
        let id = x[x.length - 1];
        personService.goProfile(id).then(res => {
            dispatch({
                type: ActionTypes.SET_PROFILE_DATA,
                payload: res.data
            })
        }).catch();
    }

    useEffect(() => {
        initLoad();
    }, [history.location.pathname])

    return (
        <div className="profile flex flex-col w-full h-full">
            <div className="flex flex-col items-start p-6 text-xl border-b">
                <span>Name: {stateContext.profileData?.name}</span>
                <span>Surname: {stateContext.profileData?.surname}</span>
                <span>Email: {stateContext.profileData?.email}</span>
                <span>Role: {stateContext.profileData?.role}</span>
            </div>
            <div className="flex flex-col h-full">
                {/* {loggedUser.role === 'teacher' ? <TeacherProfileComponent /> : <StudentProfileComponent />} */}
            </div>
        </div>
    );
}

export default Profile;