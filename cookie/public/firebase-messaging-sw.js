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

let lastNotificationId = null;
let lastNotificationTimestamp = 0;

messaging.onBackgroundMessage(function (payload) {
  console.log("백그라운드에서 푸시 알림 받음:", payload);

  const { title, body, icon } = payload.notification;
  const currentTime = Date.now();

  if (
    lastNotificationId === `${title}-${body}` &&
    currentTime - lastNotificationTimestamp < 5000
  ) {
    console.log("중복 알림 방지");
    return;
  }

  lastNotificationId = `${title}-${body}`;
  lastNotificationTimestamp = currentTime;

  self.registration.showNotification(title, {
    body: body,
    icon: icon,

    tag: `notification-${currentTime}`,
  });
});
