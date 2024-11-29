import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import SearchMovieDetail from "./SearchMovieDetail";
import SearchMovieList from "./SearchMovieList";
import useAdminMovieStore from "../../stores/useAdminMovieStore";

const AddMovieContainer = styled.div`
  width: 1239px;
  height: 840px;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  background-color: white;

  box-shadow:
    -1px 6px 10px rgba(0, 0, 0, 0.1),
    1px -6px 10px rgba(0, 0, 0, 0.1),
    -3px 4px 8px rgba(0, 0, 0, 0.06),
    3px -4px 8px rgba(0, 0, 0, 0.06);
`;
const SearchBarContainer = styled.div`
  position: relative;
  left: 70%;
  margin: 0.625rem 0 1.875rem 0;
  height: 2.5rem;
  width: 100%;
  max-width: 37.5rem;
`;

const SearchInput = styled.input`
  width: 50%;
  height: 100%;
  padding: 0.625rem 3.125rem 0.625rem 1.25rem;
  font-size: 1.125rem;
  border: 1px solid #ddd;
  border-radius: 1.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #666;
    box-shadow: 0 0.125rem 0.75rem rgba(0, 0, 0, 0.15);
  }
`;

const SearchIconButton = styled.button`
  position: absolute;
  top: 32px;
  left: 320px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const SearchTitle = styled.div`
  width: 95%;
  height: 30px;
  border: none;
  background-color: #04012d;
  color: white;
  border-radius: 12px;
  margin-top: 3rem;
  padding: 0.8rem 2rem;
  display: flex;
  align-items: center;

  p {
    font-size: 20px;
    font-weight: 700;
  }
`;

const Addmovie = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredMovies,
    setFilteredMovies,
    movieList,
    selectedMovie,
    setSelectedMovie,
    setIsSelected,
  } = useAdminMovieStore();

  useEffect(() => {
    setFilteredMovies(movieList);
  }, [movieList]);

  const handleSearch = (e) => {
    const searchInput = e.target.value;
    setSearchTerm(searchInput);

    const filtered = movieList.filter((movie) => {
      const movieTitle = movie.title.toLowerCase();
      const searchQuery = searchInput.toLowerCase();

      return movieTitle.includes(searchQuery);
    });
    setFilteredMovies(filtered);
  };

  const handleMovieClick = (movieId) => {
    setSelectedMovie(movieId);
    setIsSelected(true);
  };

  const handleGoBack = () => {
    setSelectedMovie(null);
    setIsSelected(false);
  };

  return (
    <AddMovieContainer>
      {selectedMovie ? (
        <SearchMovieDetail
          selectedMovie={selectedMovie}
          handleGoBack={handleGoBack}
        />
      ) : (
        <>
          <SearchBarContainer>
            <SearchInput
              placeholder="영화 제목을 입력하세요"
              value={searchTerm}
              onChange={handleSearch}
            />
            <SearchIconButton type="button" aria-label="검색">
              <SearchIcon />
            </SearchIconButton>
          </SearchBarContainer>
          <SearchTitle>
            <p>검색된 영화</p>
          </SearchTitle>
          <SearchMovieList
            movies={filteredMovies}
            onMovieClick={handleMovieClick}
          />
        </>
      )}
    </AddMovieContainer>
  );
};
export default Addmovie;
