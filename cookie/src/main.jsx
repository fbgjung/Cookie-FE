import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister().then(() => {
        console.log("기존 서비스 워커 제거 완료:", registration);
      });
    });
  });
}

// if ("serviceWorker" in navigator) {
//   const path = window.location.pathname;

//   // OAuth 관련 경로에서는 서비스 워커 등록 제외
//   if (!path.includes("/oauth2/") && !path.includes("/login/oauth2/")) {
//     navigator.serviceWorker
//       .register("/firebase-messaging-sw.js")
//       .then((registration) => {
//         console.log("Service Worker 등록 성공:", registration);
//       })
//       .catch((error) => {
//         console.error("Service Worker 등록 실패:", error);
//       });
//   }
// }

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
