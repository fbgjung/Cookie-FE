import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import serverBaseUrl from "../../config/apiConfig";

//로그인 완료 후 토근 발급
const ReTokenPage = () => {
  const navigate = useNavigate();

  //TODO 배포서버 주소도 사용하기

  useEffect(() => {
    axios
      .get(`${serverBaseUrl}/api/auth/retrieve-token`, {
        withCredentials: true,
      })
      .then((response) => {
        const accessToken = response.data.response.accessToken;
        const refreshToken = response.data.response.refreshToken;

        console.log(response);
        if (accessToken && refreshToken) {
          sessionStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          console.log(accessToken);
          console.log(refreshToken);
          navigate("/");
        } else {
          console.error("Authorization header missing in response");
        }
      })
      .catch((error) => {
        console.error("Failed to retrieve token:", error);
        navigate("/login");
      });
  }, [navigate]);

  return <div>토큰을 가져오는 중입니다...</div>;
};

export default ReTokenPage;
