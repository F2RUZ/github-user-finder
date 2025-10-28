import axios from "axios";


const axiosClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      return Promise.reject(
        new Error("Foydalanuvchi yoki ma'lumot topilmadi (404).")
      );
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
