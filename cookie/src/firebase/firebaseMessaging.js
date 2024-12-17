import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      if (token) {
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

let onMessageListenerInitialized = false;

export const setupOnMessageHandler = () => {
  if (!onMessageListenerInitialized) {
    onMessage(messaging, (payload) => {
      console.log("Message received in foreground:", payload);

      const notificationTitle = payload.data.title || "제목 없음";
      const notificationOptions = {
        body: payload.data.body || "내용 없음",
        icon: payload.data.icon || "/alarm-logo.png",
        data: payload.data,
      };

      if (
        Notification.permission === "granted" &&
        document.visibilityState === "visible"
      ) {
        const notification = new Notification(
          notificationTitle,
          notificationOptions
        );

        notification.onclick = (event) => {
          event.preventDefault();
          const redirectUrl = payload.data.url;
          if (redirectUrl) window.open(redirectUrl, "_self");
          notification.close();
        };
      } else {
        console.log("브라우저가 비활성 상태이므로 알림이 표시되지 않았습니다.");
      }
    });

    onMessageListenerInitialized = true;
  }
};

setupOnMessageHandler();
