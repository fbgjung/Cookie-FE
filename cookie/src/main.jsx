import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker 등록 성공:", registration);
    })
    .catch((error) => {
      console.error("Service Worker 등록 실패:", error);
    });
}

navigator.serviceWorker.addEventListener("message", (event) => {
  if (event.data?.type === "NEW_NOTIFICATION") {
    console.log("Service Worker로부터 메시지 수신:", event.data.payload);

   
    const addNotification = useNotificationStore.getState().addNotification;
    addNotification(event.data.payload); 
  }
});
}

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
