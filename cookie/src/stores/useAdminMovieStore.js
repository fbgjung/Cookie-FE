import { create } from "zustand";

const useAdminMovieStore = create((set) => ({
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
  filteredMovies: [],
  setFilteredMovies: (movies) => set({ filteredMovies: movies }),
  selectedMovie: null,
  setSelectedMovie: (movieId) => set({ selectedMovie: movieId }),
  isSelected: false,
  setIsSelected: (status) => set({ isSelected: status }),
  movieList: Array.from({ length: 20 }, (_, i) => ({
    movieId: 912640 + i,
    title: `영화 ${i + 1}`,
    director: {
      name: `감독 ${i + 1}`,
      profilePath: `https://via.placeholder.com/70x70?text=Director+${i + 1}`,
      tmdbCasterId: 100000 + i,
    },
    runtime: 109 + (i % 5),
    posterPath: `https://via.placeholder.com/177x245?text=Poster+${i + 1}`,
    releaseDate: `2024-10-${(i % 30) + 1}`,
    certification: "15",
    country: "US",
    plot: `이 영화는 영화 ${i + 1}에 대한 설명입니다. 극적인 전개로 관객을 사로잡습니다.`,
    youtube: `https://www.youtube.com/watch?v=videoId${i + 1}`,
    stillCuts: Array.from(
      { length: 3 },
      (_, j) =>
        `https://via.placeholder.com/112x112?text=Still+Cut+${j + 1}+of+Movie+${i + 1}`
    ),
    actors: Array.from({ length: 5 }, (_, j) => ({
      name: `배우 ${j + 1} of Movie ${i + 1}`,
      profilePath: `https://via.placeholder.com/70x70?ntext=Actor+${j + 1}`,
      tmdbCasterId: 200000 + i * 10 + j,
    })),
    categories: ["SF", "액션", "모험"],
  })),

  setYoutubeLink: (movieId, youtubeLinks) =>
    set((state) => {
      const updatedMovies = state.movieList.map((movie) =>
        movie.movieId === movieId ? { ...movie, youtube: youtubeLinks } : movie
      );
      console.log("유튜브 링크 업데이트:", updatedMovies);
      return { movieList: updatedMovies };
    }),

  setStillCuts: (movieId, cuts) =>
    set((state) => {
      const updatedMovies = state.movieList.map((movie) =>
        movie.movieId === movieId ? { ...movie, stillCuts: cuts } : movie
      );
      console.log("스틸컷 업데이트:", updatedMovies);
      return { movieList: updatedMovies };
    }),
}));

// movieList: [],
// setMovieList: (movies) => set({ movieList: movies }),

export default useAdminMovieStore;
