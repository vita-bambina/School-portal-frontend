import api from "./axios";

export const CreateSession = async (data: {
  year: string;
  startdate: string;
  enddate: string;
}) => {
  return api.post("/academic-session", data);
};

export const getsession = async () => {
  return api.get("/academic-session");
};

export const getsessionId = async () => {
  return api.get(`/academic-session/$:{id}`);
};

export const deletesessionId = async (id: number) => {
  return api.delete(`/academic-session/${id}`);
};

export const updatesession = async (
  id: number,
  data: {
    year: string;
    startdate: string;
    enddate: string;
  },
) => {
  return api.patch(`/academic-session/${id}`, data);
};
