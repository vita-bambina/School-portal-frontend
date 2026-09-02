import api from "./axios";

export const getDepartments = () => {
  return api.get("/department");
};

export const createDepartment = async (data: {
  name: string;
  code: string;
  facultyId: number;
  jambCutOff: number;
  minimumWaecAggregate: number;
}) => {
  return await api.post("/department", data);
};

export const deleteDepartment = async (id: number) => {
  try {
    await api.delete(`/department/${id}`);

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const updatedepartment = async (
  id: number,
  data: {
    name: string;
    facultyId: number;
    code: string;
    minimumWaecAggregate: number;
    jambCutOff: number;
  },
) => {
  return api.patch(`/department/${id}`, data);
};
// getting department details from faculty
export const getDepartmentsdetails = (facultyId: number) => {
  return api.get(`/department/faculty/${facultyId}`);
};
