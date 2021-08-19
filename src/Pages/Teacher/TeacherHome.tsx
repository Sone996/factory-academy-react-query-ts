import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useQuery } from "react-query";
import { AppContext } from "../../Context/AppProvider";
import SimpleTable from "../../Components/Shared/SimpleTable";
import Scroll from "../../Components/Shared/Scroll";
import { personService } from "../../Modules/PersonModule/Person.service";

const TeacherHome = () => {

  const [contextState, dispatch] = useContext(AppContext);
  const titles = ['Id', 'Name', 'Average Mark', 'Price'];
  const [model, setModel] = useState([]);
  const history = useHistory();

  const singleView = (item: any) => {
    history.push({ pathname: `/single-course/${item.id}` });
  }

  const fetchMyCourses = async () => {
    const res = personService.fetchMyCourses(contextState.user.data.id);
    return res;
    // personService.fetchMyCourses(loggedUser.id)
    //   .then(res => {
    //     if (res.data.length > 0) {
    //       let myCourses = res.data;
    //       myCourses.forEach((course, i) => {
    //         myCourses[i] = {
    //           id: myCourses[i].id,
    //           name: myCourses[i].name,
    //           average_mark: myCourses[i].average_mark,
    //           price: myCourses[i].price
    //         }
    //       })
    //       setModel(res.data)
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err.response.data.errors)
    //   }
    //   );
  }

  const { data, status } = useQuery('teacherHome', fetchMyCourses, {
    onSuccess: (val: any) => {
      parseMyCourses(val);
      
    }
  });

  const parseMyCourses = (data: any) => {
    let myCourses = data.data;
          myCourses.forEach((course: object, i: number) => {
            myCourses[i] = {
              id: myCourses[i].id,
              name: myCourses[i].name,
              average_mark: myCourses[i].average_mark,
              price: myCourses[i].price
            }
          })
          setModel(myCourses);
  }

  useEffect(() => {
    if (contextState.user.id) {
      fetchMyCourses();
    }
  }, [contextState.user])

  return (
    <div className="flex flex-col w-full">
      <div className="flex border-b py-4 px-4 w-full text-xl font-bold">
        <span>My Courses</span>
      </div>
      <div className="relative h-full w-3/4">
        <Scroll>
          <SimpleTable titles={titles} model={model} singleView={singleView}></SimpleTable>
        </Scroll>
      </div>
    </div>
  )
}

export default TeacherHome;