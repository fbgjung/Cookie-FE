import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB9jvZpOuLYAvGCnSlS2WGpQkXFcK_Ps-g",
  authDomain: "cookie-6f321.firebaseapp.com",
  projectId: "cookie-6f321",
  storageBucket: "cookie-6f321.appspot.com",
  messagingSenderId: "840309068007",
  appId: "1:840309068007:web:c41f8e1331c90a23aa1242",
  measurementId: "G-GGYF1EGC24",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
  console.log("Foreground 메시지 수신:", payload);
  alert(`알림: ${payload.notification.title}`);
});

export { app, messaging, getToken };
