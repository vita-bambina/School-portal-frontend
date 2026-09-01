import api from "./axios";

export const getCourses = () => {
  return api.get("/course");
};

export const createCourse = (data: any) => {
  return api.post("/course", data);
};

export const deleteCourse = (id: number) => {
  return api.delete(`/course/${id}`);
};

export const updatecourse = (
  id: number,
  data: {
    name: string;
    code: string;
    courseunit: number;
    levelId: number;
    departmentId: number;
    semesterId: number;
    lecturerIds: number[];
  },
) => {
  return api.patch(`/course/${id}`,data);
};
// getting course details and their semesters from levels

export const getcoursedetails = (levelId: number) => {
  return api.get(`course/level/${levelId}`);
};
