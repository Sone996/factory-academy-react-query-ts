import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { AppContext } from '../../Context/AppProvider';
import StudentHomeHook from '../../Components/CustomHooks/StudentHomeHook';
import SimpleTable from '../../Components/Shared/SimpleTable';
import Scroll from '../../Components/Shared/Scroll';

const StudentHome: React.FC = () => {

    const [contextState, dispatch] = useContext(AppContext)
    const titles = ['Id', 'Course Name', 'Teacher Name', 'Average Mark', 'Price'];
    const history = useHistory();

    const singleView = (item: any) => {
        history.push({ pathname: `/single-course/${item.course_id}` });
    }

    StudentHomeHook();

    return (
        <div className="student-home flex-col flex w-full">
            <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
                <span>Courses List</span>
            </div>
            <div className="flex w-full h-full py-16 pl-5">
                <div className="relative h-full w-3/4">
                    <Scroll>
                        <SimpleTable singleView={singleView} model={contextState.notCompletedCourses} titles={titles} />
                    </Scroll>
                </div>
            </div>
        </div>
    );
}

export default StudentHome;