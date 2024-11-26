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
      const { message } = error.response.data;
      if (message === "TOKEN_EXPIRED" && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
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

      // 페이지 리다이렉트를 위해 useNavigate 대신 window.location.href 사용
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("리프레시 토큰이 존재하지 않습니다.");
  }
  try {
    const response = await axiosInstance.post(
      "/api/auth/refresh-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    const { accessToken } = response.data.response;
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
      return accessToken;
    } else {
      throw new Error("새로운 액세스 토큰 발급 실패");
    }
  } catch (error) {
    console.error("리프레시 토큰으로 액세스 토큰 갱신 실패:", error);
    throw error;
  }
};

export default axiosInstance;
