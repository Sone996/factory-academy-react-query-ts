import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { courseService } from '../../Modules/CourseModule/Course.service';

const formInterface = {
    id: '',
    comment: '',
}

const SingleCourseStudentComponent = ({ data }: any) => {

    const [form, setForm] = useState(formInterface);
    const history = useHistory();

    const commentHandler = (event: any) => {
        setForm({
            ...form,
            comment: event.target.value
        })
    }

    const studentSingleCourseMutation = useMutation(() => courseService.buyCourse(form), {
        onError: (err: any) => {
            console.log(err.response.data.errors);
        },
        onSettled: (val: any) => {
            console.log('Kupljeno!!!');
        }
    })

    const buyCourse = () => {
        studentSingleCourseMutation.mutate();
    }

    useEffect(() => {
        setForm({
            ...form,
            id: data.id
        })
    }, [])

    return (
        <div className="single-course-component flex flex-col text-xl w-full">
            <div className="felx flex-col justify-between px-6">
                <div className="flex py-10">
                    <textarea
                        v-model="form.comment"
                        value={form.comment}
                        onChange={commentHandler}
                        className="border resize-none w-full rounded p-3"
                        placeholder="Message for professor" />
                </div>
                <div className="flex">
                    <span className="button bg-darkGreen" onClick={buyCourse}>BUY</span>
                </div>
            </div>
        </div>
    );
}

export default SingleCourseStudentComponent;