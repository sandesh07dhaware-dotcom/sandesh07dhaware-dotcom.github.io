// firebase-messaging-sw.js
// This file MUST live at the root of your deployed site (same folder as index.html),
// reachable at https://yourdomain.com/firebase-messaging-sw.js — not in a subfolder.

importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBXSMlXuyMGy8Fq_Jv5vUbipfZsmGQCmdA",
  authDomain: "kunvrjirealty2026.firebaseapp.com",
  databaseURL: "https://kunvrjirealty2026-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kunvrjirealty2026",
  storageBucket: "kunvrjirealty2026.firebasestorage.app",
  messagingSenderId: "995185246983",
  appId: "1:995185246983:web:863527745b6c8c8ac87ba2"
});

const messaging = firebase.messaging();

// Fires when a push arrives and Nexo is closed / in background
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || '📞 Nexo Reminder';
  const options = {
    body: payload.notification?.body || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: payload.data?.leadId || 'nexo-reminder',
    data: payload.data || {},
    vibrate: [200, 100, 200]
  };
  self.registration.showNotification(title, options);
});

// Tapping the notification opens/focuses Nexo
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
