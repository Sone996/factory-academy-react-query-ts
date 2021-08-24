import '../../App';
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { notificationMsg } from '../../Services/BaseService';
import { successMsg, errorMsg } from '../../Services/MessageDisplayHandler';
import { courseService } from '../../Modules/CourseModule/Course.service';
import { ActionTypes } from '../../Context/Reducers/App/AppProvider.types';
import { useMutation } from 'react-query';

const formInterface = {
    courseId: null,
    userId: null,
    teacherId: null,
    complete: true,
}

const FinishingCourseModal: React.FC = () => {

    const [contextState, dispatch] = useContext(AppContext);

    const [form, setForm] = useState(formInterface);

    const cancel = () => {
        dispatch({
            type: ActionTypes.SET_MODAL,
            payload: {
                name: '',
                status: false,
                data: null
            }
        })
    }

    const completeCourse = () => {
        finishCourseMutation.mutate();
    }

    const finishCourseMutation = useMutation(() => courseService.completeCourse(form), {
        onError: (err) => {
            console.log(err);
            errorMsg(notificationMsg(err, null));
            cancel();
        },
        onSuccess: (res) => {
            console.log('uspesno!!!');
            successMsg(notificationMsg(res, 'COURSE_FINISHED'));
            cancel();
        }
    })

    useEffect(() => {
        setForm({
            ...form,
            courseId: contextState.modal.data.course_id,
            userId: contextState.modal.data.student_id,
            teacherId: contextState.user.data.id
        })
    }, [contextState.modal.data])

    return (
        <div id="finishing-course-modal" className="course-course-modal rounded-lg w-4/12 xl:w-2/12 h-3/12 bg-gray-400 flex flex-row absolute text-tiny felx items-center justify-center">
            <div className="flex items-center justify-between w-full px-8">
                <span onClick={cancel} className="bg-darkRed py-2 px-4 rounded-lg cursor-pointer">Cancel</span>
                <span onClick={completeCourse} className="bg-darkGreen py-2 px-4 rounded-lg cursor-pointer">Complete</span>
            </div>
        </div>
    );
}

export default FinishingCourseModal;