import api from "./axios";

export const getstudent = async () => {
  return api.get("/student/mycourses");
};

// admin should be able to view all student

export const getallstudent = async () => {
  return api.get("/student/getall");
};

export const getstudentprofile = async () => {
  return api.get("/student/me");
};

//
export const getcoursematerial = async () => {
  return api.get("/student/mymaterials");
};
