import api from "./axios";

export const getFaculties = () => {
  return api.get("http://localhost:8000/faculty");
};

export const createFaculty = (data: { name: string; code: string }) => {
  return api.post("http://localhost:8000/faculty", data);
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
