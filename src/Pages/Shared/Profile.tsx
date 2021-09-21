import { FC } from "react";
import { useHistory } from "react-router-dom";
import { useQueryClient, useQuery } from "react-query";
import { personService } from "../../Modules/PersonModule/Person.service";
// COMPONENTS
import TeacherProfileComponent from "../../Components/Teacher/TeacherProfileComponent";
import StudentProfileComponent from "../../Components/Student/StudentProfileComponent";
import { errorMsg } from "../../Services/MessageDisplayHandler";
import { notificationMsg } from "../../Services/BaseService";
// END :: COMPONENTS

const initLoad = async (fullPath: string) => {
    let lastPart = fullPath.split("/");
    let id = lastPart[lastPart.length - 1];
    const res = await personService.goProfile(id);
    return res.data;
}

const Profile: FC = () => {

    const history = useHistory();
    const loggedUser: any = useQueryClient().getQueryData('activeUser');

    const profileData = useQuery('profile', () => initLoad(history.location.pathname), {
        onError: (err) => {
            errorMsg(notificationMsg(err, null));
        },
        onSettled: (val: any) => {
        }
    })

    return (
        <div className="profile flex flex-col w-full h-full">
            <div className="flex flex-col items-start p-6 text-xl border-b">
                <span>Name: {profileData.data?.name}</span>
                <span>Surname: {profileData.data?.surname}</span>
                <span>Email: {profileData.data?.email}</span>
                <span>Role: {profileData.data?.role}</span>
            </div>
            <div className="flex flex-col h-full">
                {loggedUser.role === 'teacher' ? <TeacherProfileComponent /> : <StudentProfileComponent />}
            </div>
        </div>
    );
}

export default Profile;