import { create } from "zustand";
import useAdminMovieStore from "./useAdminMovieStore";
const useMovieCategoryStore = create((set) => ({
  // 등록된 영화들의 카테고리 관리
  // [{ movieId, categories: [{ categoryId, mainCategory, subCategory, isConnect }] }]
  movieCategories: [
    {
      movieId: 912640,
      categories: [
        {
          categoryId: 1,
          mainCategory: "장르",
          subCategory: "액션",
          isConnect: true,
        },
        {
          categoryId: 2,
          mainCategory: "장르",
          subCategory: "SF",
          isConnect: true,
        },
        {
          categoryId: 3,
          mainCategory: "시즌",
          subCategory: "여름",
          isConnect: false,
        },
        {
          categoryId: 4,
          mainCategory: "연령대",
          subCategory: "15세 이상",
          isConnect: true,
        },
      ],
    },
    {
      movieId: 912641,
      categories: [
        {
          categoryId: 5,
          mainCategory: "장르",
          subCategory: "드라마",
          isConnect: false,
        },
        {
          categoryId: 6,
          mainCategory: "장르",
          subCategory: "모험",
          isConnect: true,
        },
        {
          categoryId: 7,
          mainCategory: "시즌",
          subCategory: "겨울",
          isConnect: true,
        },
        {
          categoryId: 8,
          mainCategory: "연령대",
          subCategory: "12세 이상",
          isConnect: false,
        },
      ],
    },
  ],

  // 영화 카테고리 데이터 추가
  addMovieCategory: (movieId, categories) =>
    set((state) => ({
      movieCategories: [...state.movieCategories, { movieId, categories }],
    })),

  // 특정 영화의 카테고리 업데이트
  updateMovieCategory: (movieId, updatedCategories) =>
    set((state) => ({
      movieCategories: state.movieCategories.map((movieCategory) =>
        movieCategory.movieId === movieId
          ? { ...movieCategory, categories: updatedCategories }
          : movieCategory
      ),
    })),

  // 특정 영화의 카테고리 연결 상태 변경
  updateCategoryConnection: (movieId, categoryId, isConnect) =>
    set((state) => ({
      movieCategories: state.movieCategories.map((movieCategory) => {
        if (movieCategory.movieId === movieId) {
          const updatedCategories = movieCategory.categories.map((category) =>
            category.categoryId === categoryId
              ? { ...category, isConnect }
              : category
          );
          return { ...movieCategory, categories: updatedCategories };
        }
        return movieCategory;
      }),
    })),

  // 특정 영화의 카테고리 데이터 조회
  getMovieCategories: (movieId) => {
    const movieList = useAdminMovieStore.getState().movieList; // movieList를 가져옴
    const movie = movieList.find((movie) => movie.movieId === movieId);
    return movie ? movie.categories : [];
  },
}));

export default useMovieCategoryStore;
