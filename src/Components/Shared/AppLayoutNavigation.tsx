import React, { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { Switch, Route } from "react-router";
import { useHistory } from "react-router-dom";
import logo from '../../assets/images/factoryww.png'
import { TOKEN_LS_NAME } from "../../Constants/Constants";
import { AppContext } from "../../Context/AppProvider";
import { authService } from "../../Modules/AuthModule/Auth.service";
// PAGES
import TeacherHome from "../../Pages/Teacher/TeacherHome";
import StudentHome from "../../Pages/Student/StudentHome";
// END :: PAGES

const AppLayoutNavigation: React.FC = () => {

    const [contextState, dispatch] = useContext(AppContext);


    const history: any = useHistory();

    const goHome = () => { }
    const goProfile = () => { }
    const myStudents = () => { }
    const newCourseHandler = () => { }
    const CourseListHandler = () => { }
    const studentAplicationsHandler = () => { }
    const logout = () => {
        console.log('logout');
        logoutMutation.mutate();
    }

    const logoutMutation = useMutation(() => authService.logout(), {
        onSuccess: () => {
            localStorage.removeItem(TOKEN_LS_NAME);
            history.push('/login');
        }
    })

    return (
        <div className="flex w-full h-full">
            <div className="flex flex-col h-full bg-gray-500 w-2/12 items-center">
                <div className="flex p-16">
                    <img src={logo} alt="logo" className="cursor-pointer" onClick={goHome} />
                </div>
                <div className="flex flex-col text-white font-bold text-lg">
                    <span className="my-2 cursor-pointer" onClick={goHome}>Home</span>
                    <span className="my-2 cursor-pointer" onClick={goProfile}>Profile</span>
                    {
                        contextState.user && contextState.user.role === 'teacher' ?
                            <>
                                <span className="my-2 cursor-pointer" onClick={myStudents}>My Students</span>
                                <span className="my-2 cursor-pointer" onClick={newCourseHandler} > New Course</span >
                                <span className="my-2 cursor-pointer" onClick={CourseListHandler} > Course List</span >
                                <span className="my-2 cursor-pointer" onClick={studentAplicationsHandler} > Student aplications</span >
                            </>
                            :
                            <></>
                    }
                    <span className="my-2 cursor-pointer" onClick={logout} > Logout</span >
                </div >
            </div >
            <div className="flex w-full">
                <Switch>
                    {contextState.user && contextState.user.data?.role === 'teacher' ?
                        <Route path="/teacher-home" component={TeacherHome} />
                        :
                        <Route path="/student-home" component={StudentHome} />
                    }
                    {/* <Route path="/profile/:id" render={(props) => {
                        return (<Profile {...profileData} />)
                    }} /> */}
                    {/* <Route path="/member-list" component={MemberList} /> */}
                    {/* <Route path="/new-course" component={NewCourse} /> */}
                    {/* <Route path="/course-list" component={CourseList} /> */}
                    {/* <Route path="/single-course/:id" component={SingleCourse} /> */}
                    {/* <Route path="/student-aplications" component={StudentAplications} /> */}
                </Switch>
            </div>
        </div >
    );
}

export default AppLayoutNavigation;