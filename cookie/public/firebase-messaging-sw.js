importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyB9jvZpOuLYAvGCnSlS2WGpQkXFcK_Ps-g",
  projectId: "cookie-6f321",
  messagingSenderId: "840309068007",
  appId: "1:840309068007:web:c41f8e1331c90a23aa1242",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log("백그라운드에서 푸시 알림 수신:", payload);

  if (payload.data) {
    const { title, body, icon, url, notificationId } = payload.data;

    // 알림 표시
    self.registration.showNotification(title || "제목 없음", {
      body: body || "내용 없음",
      icon: icon || "/favicon.ico",
      data: { url, notificationId }, // 클릭 이벤트에서 사용할 데이터 포함
      tag: notificationId || "default-tag", // 중복 방지 태그
    });
  }
});

// 알림 클릭 이벤트 처리
self.addEventListener("notificationclick", (event) => {
  console.log("알림 클릭됨:", event.notification);
  event.notification.close();

  // 클릭 시 리디렉션
  const redirectUrl = event.notification.data?.url;
  if (redirectUrl) {
    event.waitUntil(clients.openWindow(redirectUrl));
  }
});
