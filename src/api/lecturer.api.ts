import api from "./axios";

export const getLecturers = () => {
  return api.get("http://localhost:8000/lecturer/admin-lecturers");
};

export const createlecturer = (data: {
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  facultyId: number;
}) => {
  return api.post("http://localhost:8000/lecturer", data);
};

export const getlecturercoursecount = () => {
  return api.get("/lecturer/dashboard");
};

export const getlecturercourse = () => {
  return api.get("/lecturer/all-courses");
};

export const deletelecturer = (id: number) => {
  return api.delete(`/lecturer/${id}`);
};

export const updatelecturer = (
  id: number,
  data: {
    title: string;
    firstname: string;
    lastname: string;
    email: string;
    password?: string;
    facultyId: number;
  },
) => {
  return api.patch(`/lecturer/${id}`, data);
};
