import axios from "axios";
import serverBaseUrl from "../../config/apiConfig";

//TODO 서버 주소 추가하기
const axiosInstance = axios.create({
  baseURL: serverBaseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            sessionStorage.setItem("accessToken", newAccessToken);
            originalRequest.headers["Authorization"] =
              `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error(
            "리프레시 토큰으로 accessToken 갱신 실패:",
            refreshError
          );
        }
      }

      //  리프레시 토큰도 만료된 경우
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login");
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
