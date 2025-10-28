import axios from "axios";

//GitHub API bilan ishlash uchun asosiy Axios instansi.

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
    // Xato boshqaruvi
    if (error.response?.status === 404) {
      // 404 xatosini aniqroq xabar bilan qaytarish
      return Promise.reject(
        new Error("Foydalanuvchi yoki ma'lumot topilmadi (404).")
      );
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
