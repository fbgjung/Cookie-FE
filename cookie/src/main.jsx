import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      return Promise.all(
        registrations.map((registration) => registration.unregister())
      );
    })
    .then(() => {
      const path = window.location.pathname;

      if (!path.includes("/oauth2/") && !path.includes("/login/oauth2/")) {
        return navigator.serviceWorker.register("/firebase-messaging-sw.js");
      }
    })
    .then((registration) => {
      if (registration) {
        console.log("Service Worker 등록 성공:", registration);
      }
    })
    .catch((error) => {
      console.error("Service Worker 처리 중 오류:", error);
    });
}

createRoot(document.getElementById("root")).render(<App />);
