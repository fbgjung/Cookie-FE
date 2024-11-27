import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
const useNotificationStore = create(
  immer((set) => ({
    notifications: [],
    addNotification: (notification) =>
      set((state) => {
        console.log("기존 알림 상태:", state.notifications);
        state.notifications.push(notification);
        console.log("새로운 알림 상태:", state.notifications);
      }),
    clearNotifications: () =>
      set((state) => {
        console.log("알림 초기화");
        state.notifications = [];
      }),
  }))
);

export default useNotificationStore;
