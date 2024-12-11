import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      userInfo: {
        userId: null,
        nickname: "",
        profileImage: "",
        genreId: null,
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
            profileImage: "",
            genreId: null,
          },
        })),
      getUserInfo: () => get().userInfo,
    }),
    {
      name: "userInfo",
      getStorage: () => localStorage,
    }
  )
);
export default useUserStore;
