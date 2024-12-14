import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import serverBaseUrl from "../../config/apiConfig";
import useUserStore from "../../stores/useUserStore";
import useAuthStore from "../../stores/useAuthStore";
import axiosInstance from "../../api/auth/axiosInstance";
import { requestNotificationPermission } from "../../firebase/firebaseMessaging";
import Spinner from "../../components/common/Spinner";

const ReTokenPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const logIn = useAuthStore((state) => state.logIn);

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const response = await axios.get(
          `${serverBaseUrl}/api/auth/retrieve-token`,
          { withCredentials: true }
        );

        const { accessToken, refreshToken } = response.data.response;

        if (!accessToken || !refreshToken) {
          throw new Error("토큰이 없습니다.");
        }

        sessionStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);

        logIn();

        // 사용자 정보 가져오기
        const userInfoResponse = await axios.get(
          `${serverBaseUrl}/api/users/info`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const userInfo = userInfoResponse.data.response;
        console.log("유저 정보:", userInfo);

        // 전역 상태 업데이트
        setUserInfo({
          userId: userInfo.userId,
          nickname: userInfo.nickname,
          profileImage: userInfo.profileImage,
          genreId: userInfo.genreId,
        });

        // FCM 토큰 등록
        const fcmToken = await requestNotificationPermission();
        console.log("FCM 토큰:", fcmToken);

        if (fcmToken) {
          await axiosInstance.post("/api/notification/fcm-token", {
            token: fcmToken,
          });
        } else {
          console.warn("FCM 토큰 전송 실패");
        }

        navigate("/");
      } catch (error) {
        console.error("토큰 발급 실패:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    retrieveToken();
  }, [navigate, logIn, setUserInfo]);

  return isLoading ? <Spinner /> : <div>토큰을 가져오는 중입니다…</div>;
};

export default ReTokenPage;
