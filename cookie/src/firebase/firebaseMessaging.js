import { messaging } from "./firebase";
import { getToken, onMessage, deleteToken } from "firebase/messaging";
import { postFcmToken } from "@/api/notification";

const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
let onMessageListenerInitialized = false;

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림 권한 허용됨.");
    } else {
      console.error("알림 권한 거부됨.");
    }
  } catch (error) {
    console.error("알림 권한 요청 중 오류 발생:", error);
  }
};

export const getFCMToken = async () => {
  try {
    const token = await getToken(messaging, { vapidKey });
    if (token) {
      await postFcmToken(token);
      console.log("FCM 토큰 저장됨:", token);
      return token;
    } else {
      console.warn("FCM 토큰 없음. 알림 권한 확인 필요.");
    }
  } catch (error) {
    console.error("FCM 토큰 요청 중 오류 발생:", error);
  }
};

export const initializeForegroundNotifications = () => {
  if (!onMessageListenerInitialized) {
    onMessage(messaging, (payload) => {
      console.log("포그라운드 알림 수신:", payload);

      if (!payload.data) {
        console.log("알림 데이터가 없음");
        return;
      }

      const notificationTitle = payload.data.title || "제목 없음";
      const notificationOptions = {
        body: payload.data.body || "내용 없음",
        icon: payload.data.icon || "/favicon.ico",
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
          const redirectUrl = payload.data?.url;
          if (redirectUrl) window.open(redirectUrl, "_self");
          notification.close();
        };
      }
    });

    onMessageListenerInitialized = true;
  }
};

export const handleEnableNotifications = async () => {
  await requestNotificationPermission();
  const token = await getFCMToken();
  if (token) {
    console.log("FCM 토큰:", token);
    initializeForegroundNotifications();
  }
};

export const unsubscribeFromNotifications = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey });
    if (currentToken) {
      await deleteToken(messaging);
      console.log("FCM 구독 취소됨.");
    } else {
      console.log("구독된 토큰 없음.");
    }
  } catch (error) {
    console.error("알림 구독 취소 오류:", error);
  }
};
