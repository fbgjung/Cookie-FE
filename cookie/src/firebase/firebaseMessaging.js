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
        console.error("FCM 토큰 생성 실패");
      }
    } else {
      console.error("알림 권한 거부됨");
    }
  } catch (error) {
    console.error("알림 권한 요청 실패:", error.message);
  }
};

export const setupOnMessageHandler = () => {
  onMessage(messaging, (payload) => {
    console.log("포그라운드 알림 수신: ", payload);

    const notificationData = {
      title: payload.notification?.title || "알림 제목 없음",
      body: payload.notification?.body || "알림 내용 없음",
      icon: payload.notification?.icon || "/default-icon.png",
      image: payload.notification?.image || "",
    };

    const addNotification = useNotificationStore.getState().addNotification;
    addNotification(notificationData);

    const notification = new Notification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon,
    });

    notification.onclick = (event) => {
      event.preventDefault();
      console.log("알림 클릭됨:", notificationData);
      notification.close();
    };
  });
};

// 초기화
setupOnMessageHandler();
