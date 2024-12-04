import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

// Firebase 설정 값
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
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 브라우저에서 수신한 알림 처리
onMessage(messaging, (payload) => {
  console.log("Foreground message received:", payload);
});

export { app, messaging, getToken };
