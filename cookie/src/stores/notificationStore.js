import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useNotificationStore = create(
  immer((set) => ({
    notifications: [],
    addNotification: (notification) =>
      set((state) => {
        state.notifications.push(notification);
      }),
    clearNotifications: () =>
      set((state) => {
        state.notifications = [];
      }),
  }))
);

export default useNotificationStore;
