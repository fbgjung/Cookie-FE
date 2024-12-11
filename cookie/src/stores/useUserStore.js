import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      userInfo: {
        userId: null,
        nickname: "",
      },
      setUserInfo: (info) =>
        set((state) => ({
          userInfo: { ...state.userInfo, ...info },
        })),
      logout: () =>
        set(() => ({
          userInfo: {
            userId: null,
            nickname: "",
          },
        })),
      getUserInfo: () => get().userInfo,
    }),
    {
      name: "userInfo",
      getStorage: () => localStorage,
      serialize: (state) => {
        return JSON.stringify({
          userInfo: {
            nickname: state.userInfo.nickname,
          },
        });
      },
      deserialize: (str) => {
        const parsed = JSON.parse(str);
        return {
          userInfo: {
            nickname: parsed.userInfo.nickname,
          },
        };
      },
    }
  )
);

export default useUserStore;
