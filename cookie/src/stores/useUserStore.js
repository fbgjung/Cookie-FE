import { create } from "zustand";

const useUserStore = create((set, get) => ({
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

  updateNickname: (nickname) =>
    set((state) => ({
      userInfo: { ...state.userInfo, nickname },
    })),

  updateProfileImage: (profileImage) =>
    set((state) => ({
      userInfo: { ...state.userInfo, profileImage },
    })),

  updateGenreId: (genreId) =>
    set((state) => ({
      userInfo: { ...state.userInfo, genreId },
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

  getUserInfo: () => {
    const state = get();
    return state.userInfo;
  },
}));

export default useUserStore;
