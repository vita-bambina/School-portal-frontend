import axios from "axios";

const api = axios.create({
  baseURL: "https://school-portal-mrc3.onrender.com",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    if (error.response?.status === 401) {
      // logout user
      await api.post("/auth/logout");

      // send user to login
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);

export default api;
