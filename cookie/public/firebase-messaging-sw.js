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

messaging.onBackgroundMessage((payload) => {
  console.log("백그라운드에서 푸시 알림 수신:", payload);

  if (payload.data) {
    const { title, body } = payload.data;
    self.registration.showNotification(title || "제목 없음", {
      body: body || "내용 없음",
      icon: "/favicon.ico",
      tag: "default-tag",
    });
  }
});

self.addEventListener("notificationclick", (event) => {
  console.log("알림 클릭됨:", event.notification);
  event.notification.close();

  const redirectUrl = event.notification.data?.url;
  if (redirectUrl) {
    event.waitUntil(clients.openWindow(redirectUrl));
  }
});
