import api from "./axios";


export async function uploadFile(file: File) {

  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "http://localhost:8000/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}