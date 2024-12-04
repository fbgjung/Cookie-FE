importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyB9jvZpOuLYAvGCnSlS2WGpQkXFcK_Ps-g",
  projectId: "cookie-6f321",
  messagingSenderId: "840309068007",
  appId: "1:840309068007:web:c41f8e1331c90a23aa1242",
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Firebase Messaging 객체 초기화
const messaging = firebase.messaging();

// 백그라운드에서 푸시 알림 수신
messaging.onBackgroundMessage(function (payload) {
  console.log("백그라운드에서 푸시 알림 받음:", payload);

  // 푸시 메시지에서 제목과 본문을 가져옵니다.
  const { title, body, icon } = payload.notification;

  // 알림을 화면에 표시
  self.registration.showNotification(title, {
    body: body,
    icon: icon, // 필요에 따라 아이콘 추가
  });
});
