import { personRepo } from "./Person.repo";
//import omit from "lodash/omit";

class PersonService {

    fetchMyCourses(data: any) {
        return personRepo.fetchMyCourses(data);
    }

    goProfile(id: any) {
        return personRepo.goProfile(id);
    }

    fetchNotCompletedCourses() {
        return personRepo.fetchNotCompletedCourses();
    }

    fetchCompletedCourses(id: number) {
        return personRepo.fetchCompletedCourses(id);
    }

    fetchMyStudents() {
        return personRepo.fetchMyStudents();
    }

    fetchAplicationRequests() {
        return personRepo.fetchAplicationRequests();
    }

    // resolveRequest(data: any) {
    //     return personRepo.resolveRequest({
    //         courseId: data.course_id,
    //         data: omit(data, ['course_id']) 
    //     });
    // }

    // fetchNotRatedCourses(data: any) {
    //     return personRepo.fetchNotRatedCourses(data);
    // }

    // completeCourse(data: any) {
    //     return personRepo.completeCourse({
    //         personId: data.personId,
    //         data: omit(data, ['personId'])
    //     });
    // }
}

export const personService = new PersonService();