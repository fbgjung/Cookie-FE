importScripts("https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js"
);

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyB9jvZpOuLYAvGCnSlS2WGpQkXFcK_Ps-g",
  authDomain: "cookie-6f321.firebaseapp.com",
  projectId: "cookie-6f321",
  storageBucket: "cookie-6f321.appspot.com",
  messagingSenderId: "840309068007",
  appId: "1:840309068007:web:c41f8e1331c90a23aa1242",
  measurementId: "G-GGYF1EGC24",
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Messaging 객체 생성
const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] 백그라운드 메시지 수신: ", payload);

  const notificationTitle = payload.notification.title || "Default Title";
  const notificationOptions = {
    body: payload.notification.body || "Default Body",
    icon: "/firebase-logo.png", // 알림 아이콘 경로
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
