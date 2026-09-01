import api from "./axios";

export const startEnrollment = async () => {
  const response = await api.post("/enrollment/start");
  return response.data;
};

export const getCurrentEnrollment = async () => {
  const response = await api.get("/enrollment");
  console.log(response, "-- response");
  return response.data;
};

export const updateEnrollment = async (data: any, isSubmit: boolean) => {
  const response = await api.post(`/enrollment`, { ...data, isSubmit });
  console.log("response ----", response);
  console.log("response ----", response?.data?.message);

  if (response?.data?.message) {
    return { error: response?.data.message };
  } else if (response?.data) {
    return response.data;
  } else {
    return "Error";
  }
};

export const submitEnrollment = async (id: number, data: any) => {
  const response = await api.post(`/enrollment/${id}/submit`, data);

  return response.data;
};

export const getallenrollment = async () => {
  const response = await api.get("/enrollment/admin-applicants");
  return response.data;
};

export const getEnrollmentById = async (id: number) => {
  const response = await api.get(`/enrollment/${id}`);
  return response.data;
};

export const approveEnrollment = async (id: number) => {
  const response = await api.patch(`/enrollment/${id}/approve`);
  return response.data;
};

export const revokeadmission = async (id: number) => {
  return api.delete(`/admin-applicants/${id}/revoke`);
};
