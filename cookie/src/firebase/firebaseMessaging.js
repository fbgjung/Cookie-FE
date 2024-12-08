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

export const setupOnMessageHandler = (addNotification) => {
  onMessage(messaging, (payload) => {
    console.log("알림 수신:", payload);

    const notificationTitle = payload.notification?.title || "알림";
    const notificationBody = payload.notification?.body || "새로운 메시지";

    const notificationData = {
      title: notificationTitle,
      body: notificationBody,
      timestamp: new Date().toLocaleString(),
    };

    // 알림 상태 업데이트
    addNotification(notificationData);

    // 브라우저 알림 생성
    const notificationOptions = {
      body: notificationBody,
      icon: payload.notification?.icon || "/default-icon.png",
      image: payload.notification?.image,
    };

    const notification = new Notification(
      notificationTitle,
      notificationOptions
    );

    notification.onclick = (event) => {
      event.preventDefault();
      console.log("알림 클릭!");
      notification.close();
    };
  });
};
