import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../Context/AppProvider';
import StudentsOnCourseHook from '../../Components/CustomHooks/StudentsOnCourseHook';
import { useMutation } from 'react-query';
import { courseService } from '../../Modules/CourseModule/Course.service';
import { ActionTypes } from '../../Context/Reducers/Teacher/TeacherProvider.types';
// COMPONENTS
import SingleCourseComponent from '../../Components/Teacher/SingleCourseComponent';
import SingleCourseStudentComponent from '../../Components/Student/SingleCourseStudentComponent';
// END :: COMPONENTS

const courseInterface = {
    name: '',
    price: '',
    description: '',
}

const SingleCourse: React.FC = () => {

    const [contextState, dispatch] = useContext(AppContext);
    const history = useHistory();

    let x = history.location.pathname.split("/");
    let id = x[x.length - 1];

    const singlecourseMutation = useMutation(() => courseService.fetchSingleCours(id), {
        onSettled: (val: any) => {
            dispatch({
                type: ActionTypes.SET_SINGLE_COURSE,
                payload: val.data
            })
        }
    })

    if(contextState.user.data.role === 'teacher') {
        StudentsOnCourseHook(id);
    }

    useEffect(() => {
        singlecourseMutation.mutate();
    }, [])

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
                        <SingleCourseStudentComponent data={contextState.singleCourse}></SingleCourseStudentComponent>
                    </div>
            }
        </div>
    );
}

export default SingleCourse;