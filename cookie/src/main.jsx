import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistration("/firebase-messaging-sw.js")
    .then((registration) => {
      if (registration) {
        console.log("이미 등록된 Service Worker 있음:", registration);
      } else {
        // 새 서비스 워커 등록
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then((registration) => {
            console.log("Service Worker 등록 성공:", registration);
          })
          .catch((error) => {
            console.error("Service Worker 등록 실패:", error);
          });
      }
    });
}

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
