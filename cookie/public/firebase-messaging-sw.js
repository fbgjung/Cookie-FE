// Import the Firebase scripts needed for messaging
importScripts("https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js"
);

// Initialize Firebase in the service worker
const firebaseConfig = {
  apiKey: "AIzaSyB9jvZpOuLYAvGCnSlS2WGpQkXFcK_Ps-g",
  authDomain: "cookie-6f321.firebaseapp.com",
  projectId: "cookie-6f321",
  storageBucket: "cookie-6f321.firebasestorage.app",
  messagingSenderId: "840309068007",
  appId: "1:840309068007:web:c41f8e1331c90a23aa1242",
  measurementId: "G-GGYF1EGC24",
};

// Initialize Firebase App
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  // Customize notification here
  const notificationTitle = payload.notification.title || "Default Title";
  const notificationOptions = {
    body: payload.notification.body || "Default body",
    icon: "/firebase-logo.png", // Optional: replace with your app's icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
