import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useNotificationStore = create(
  immer((set) => ({
    notifications: [],
    addNotification: (notification) =>
      set((state) => {
        console.log("알림 추가:", notification);
        state.notifications.push(notification);
      }),
    clearNotifications: () =>
      set((state) => {
        console.log("알림 초기화");
        state.notifications = [];
      }),
  }))
);

export default useNotificationStore;
