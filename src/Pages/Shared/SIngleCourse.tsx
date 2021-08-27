import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../Context/AppProvider';
import StudentsOnCourseHook from '../../Components/CustomHooks/StudentsOnCourseHook';
import SingleCourseHook from '../../Components/CustomHooks/SingleCourseHook';
// COMPONENTS
import SingleCourseComponent from '../../Components/Teacher/SingleCourseComponent';
import SingleCourseStudentComponent from '../../Components/Student/SingleCourseStudentComponent';
// END :: COMPONENTS

const SingleCourse: React.FC = () => {

    const [contextState] = useContext(AppContext);
    const history = useHistory();

    let x = history.location.pathname.split("/");
    let id = x[x.length - 1];

    SingleCourseHook(id);

    if(contextState.user.data.role === 'teacher') {
        StudentsOnCourseHook(id);
    }
    console.log('single course')

    return (
        <div className="course flex w-full">
            <div className="flex flex-col w-1/3 items-start py-4 px-4 border-r text-xl font-bold border-b">
                <div className="flex flex-col w-full items-start">
                    <span>Name: {contextState.singleCourse?.name}</span>
                    <span>Price: {contextState.singleCourse?.price}</span>
                </div>
                <div className="flex border whitespace-pre-line h-full overflow-y-auto mb-4">
                    <span>{contextState.singleCourse?.description}</span>
                </div>
            </div>
            {
                contextState.user.data.role === 'teacher' ?
                    <div className="flex flex-col items-center w-2/3">
                        <SingleCourseComponent tableData={contextState.studentsOnCourse} />
                    </div>
                    :
                    <div className="flex flex-col items-center w-full">
                        { contextState.singleCourse ? <SingleCourseStudentComponent /> : <></> }
                    </div>
            }
        </div>
    );
}

export default SingleCourse;