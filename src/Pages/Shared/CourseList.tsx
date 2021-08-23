import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../Context/AppProvider';
import CourseListHook from '../../Components/CustomHooks/CourseListHook';
import Scroll from '../../Components/Shared/Scroll';
import SimpleTable from '../../Components/Shared/SimpleTable';

const CourseList: React.FC = () => {

    const [contextState, dispatch] = useContext(AppContext);
    const titles = ['Id', 'Name', 'Average Mark', 'Price'];
    const history = useHistory();

    const singleView = (item: any) => {
        console.log(item)
        // history.push({ pathname: `/single-course/${item.id}` });
    }

    CourseListHook();

    //console.log(contextState.allCourses)

    return (
        <div className="professor-home flex-col flex w-full">
            <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
                <span>All Courses</span>
            </div>
            <div className="flex w-full h-full py-16 pl-5">
                <div className="relative h-full w-3/4">
                    <Scroll>
                        <SimpleTable singleView={singleView} model={contextState.allCourses} titles={titles}></SimpleTable>
                    </Scroll>
                </div>
            </div>
        </div>
    );
}

export default CourseList;