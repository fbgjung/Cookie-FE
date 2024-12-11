import useNotificationStore from "../stores/notificationStore";
import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림 권한 허용");

      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });

      if (token) {
        console.log("FCM 토큰:", token);
        return token;
      } else {
        console.error("토큰 가져오기 실패");
      }
    } else {
      console.error("알림 권한 거부됨");
    }
  } catch (error) {
    console.error("알림 권한 요청 실패:", error);
  }
};

export const setupOnMessageHandler = () => {
  const addNotification = useNotificationStore.getState().addNotification;

  onMessage(messaging, (payload) => {
    console.log("포그라운드 알림 수신:", payload);

    // 브라우저가 활성 상태일 때만 알림 표시
    if (
      Notification.permission === "granted" &&
      document.visibilityState === "visible"
    ) {
      const notificationData = {
        title: payload.notification?.title || "제목 없음",
        body: payload.notification?.body || "내용 없음",
        timestamp: new Date().toLocaleString(),
      };

      // 상태 관리 스토어에 알림 추가
      addNotification(notificationData);

      // 클릭 이벤트 핸들러
      const notification = new Notification(notificationData.title, {
        body: notificationData.body,
        icon: payload.notification?.icon || "/favicon.ico",
      });

      notification.onclick = () => {
        console.log("알림 클릭됨");
        notification.close();
      };
    }
  });
};

// 초기화
setupOnMessageHandler();
