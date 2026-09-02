import api from "./axios";

export const getFaculties = () => {
  return api.get("/faculty");
};

export const createFaculty = (data: { name: string; code: string }) => {
  return api.post("/faculty", data);
};

export const DeleteFaculty = async (facultyId: number) => {
  try {
    const response = await api.delete(`/faculty/${facultyId}`);

    return response.status === 200;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateFaculty = async (
  id: number,
  data: { name: string; code: string },
) => {
  return api.patch(`/faculty/${id}`, data);
};

export const getfacultiescount = async () => {
  return api.get("/faculty/count");
};
