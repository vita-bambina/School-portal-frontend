import api from "./axios";

export const getLevelSummary = async () => {
  return await api.get("http://localhost:8000/level/summary");
};

export const deleteLevel = (id: number) => {
  return api.delete(`/level/${id}`);
};

export const createLevel = async (data: {
  name: string;
  departmentId: number;
}) => {
  return api.post("http://localhost:8000/level", data);
};

export const getLevels = () => {
  return api.get("/level");
};

export const editlevel = (
  id: number,
  data: {
    name: string;
    departmentId: number;
  },
) => {
  return api.patch(`level/department/${id}`, data);
};
// getting levels details from department
export const getlevelsId = (departmentId: number) => {
  return api.get(`level/department/${departmentId}`);
};
