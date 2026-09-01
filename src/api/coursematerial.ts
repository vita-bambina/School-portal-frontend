import api from "./axios";

export const uploadCourseMaterial = (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  return api.post("/upload", formData);
};
export const createCourseMaterial = (data: {
  title: string;
  file: string;
  lecturerCourseId: number;
}) => {
  return api.post("/course-material", data);
};

export const getallcoursematerial = () => {
  return api.get("/course-material");
};

export const deletecoursematerial = (id: number) => {
  return api.delete(`/course-material/${id}`);
};
