import { create } from "zustand";

const useUserStore = create((set, get) => ({
  userInfo: {
    userId: null,
    nickname: "",
    profileImage: "",
    genreId: null,
  },

  // 유저 정보 전체 설정
  setUserInfo: (info) =>
    set((state) => ({
      userInfo: { ...state.userInfo, ...info },
    })),

  // 닉네임 수정
  updateNickname: (nickname) =>
    set((state) => ({
      userInfo: { ...state.userInfo, nickname },
    })),

  // 프로필 이미지 수정
  updateProfileImage: (profileImage) =>
    set((state) => ({
      userInfo: { ...state.userInfo, profileImage },
    })),

  // 장르 ID 수정
  updateGenreId: (genreId) =>
    set((state) => ({
      userInfo: { ...state.userInfo, genreId },
    })),

  getUserInfo: () => {
    const state = get();
    return state.userInfo;
  },
}));

export default useUserStore;
