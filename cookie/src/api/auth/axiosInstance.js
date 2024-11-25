import axios from "axios";
import serverBaseUrl from "../../config/apiConfig";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
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
      const { message } = error.response.data;
      if (message === "TOKEN_EXPIRED" && !originalRequest._retry) {
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

      localStorage.clear();
      sessionStorage.clear();
      navigate("/login");
    }

    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("리프레시 토큰이 존재하지 않습니다.");
    }
    const response = await axios.post(
      `${serverBaseUrl}/api/auth/refresh-token`,
      {
        refreshToken,
      }
    );
    return response.data.response.accessToken;
  } catch (error) {
    console.error(
      "리프레시 토큰으로 accessToken을 발급하는데 실패했습니다.",
      error
    );
    throw error;
  }
};
export default axiosInstance;
