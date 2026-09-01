import api from "./axios";

type Semester = "first_semester" | "second_semester";

export const createSemester = async (data: {
  semester: Semester;
  startDate: string;
  endDate: string;
  sessionId: number;
}) => {
  return api.post("/semester", data);
};

export const getSemester = async () => {
  return api.get("/semester");
};

export const updatesemester = async (
  id: number,
  data: {
    semester: Semester;
    startDate: string;
    endDate: string;
    sessionId: number;
  },
) => {
  return api.patch(`/semester/${id}`, data);
};
