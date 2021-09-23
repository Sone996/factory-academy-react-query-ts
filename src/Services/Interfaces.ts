//React.ChangeEvent<HTMLTextAreaElement>
//React.ChangeEvent<HTMLInputElement>

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
}

export interface ILoggedUser {
  date_of_creation: string;
  date_of_update: string;
  deleted: boolean;
  email: string;
  id: number;
  name: string;
  password: string;
  role: string;
  "session-id": string;
}

export interface IBasicCourseData {
  average_mark: number;
  course_id: number;
  course_name: string;
  price: number;
}

export interface IBasicTeacherCourseData {
  average_mark: number;
  id: number;
  course_name: string;
  price: number;
}

export interface ISingleCourse {
  average_mark: number;
  date_of_creation: string;
  date_of_update: string;
  deleted: boolean;
  description: string | null;
  id: number;
  name: string;
}

export interface IFinishCourseForm {
  complete: boolean;
  courseId: string | number;
  userId: string | number;
  teacherId: number | any;
}

export interface IRequestAcceptForm {
  course_id: null | number;
  accepted: null | boolean;
}
