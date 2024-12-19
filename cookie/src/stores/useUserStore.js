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
        matchUpId: null,
      },
      setUserInfo: (info) =>
        set((state) => ({
          userInfo: { ...state.userInfo, ...info },
        })),
      logout: () => {
        set(() => ({
          userInfo: {
            userId: null,
            nickname: "",
            profileImage: "",
            genreId: null,
            matchUpId: null,
          },
        }));
      },
      getUserInfo: () => get().userInfo,
    }),
    {
      name: "userInfo",
      getStorage: () => localStorage,
      serialize: (state) => {
        return JSON.stringify({
          userInfo: {
            userId: state.userInfo.userId,
            nickname: state.userInfo.nickname,
            profileImage: state.userInfo.profileImage,
            genreId: state.userInfo.genreId,
            matchUpId: state.userInfo.matchUpId,
          },
        });
      },
      deserialize: (str) => {
        const parsed = JSON.parse(str);
        return {
          userInfo: {
            userId: parsed.userInfo.userId || null,
            nickname: parsed.userInfo.nickname || "",
            profileImage: parsed.userInfo.profileImage || "",
            genreId: parsed.userInfo.genreId || null,
            matchUpId: parsed.userInfo.matchUpId || null,
          },
        };
      },
    }
  )
);

export default useUserStore;
