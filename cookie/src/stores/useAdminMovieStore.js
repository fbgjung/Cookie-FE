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
    plot: `이 영화는 영화 ${i + 1}에 대한 설명입니다. 환상의 케미스트리의 에디 브록과 그의 심비오트 베놈은 그들을 노리는 정체불명 존재의 추격을 피해 같이 도망을 다니게 된다. 한편 베놈의 창조자 널은 고향 행성에서부터 그들을 찾아내기 위해 지구를 침략하고 에디와 베놈은 그동안 겪어보지 못한 최악의 위기를 맞이하게 되는데…`,
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

  registeredMovies: [], // 등록된 영화 리스트
  addRegisteredMovie: (movie) =>
    set((state) => ({
      registeredMovies: [...state.registeredMovies, movie],
    })),
}));

// movieList: [],
// setMovieList: (movies) => set({ movieList: movies }),

export default useAdminMovieStore;
