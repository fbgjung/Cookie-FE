import { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../../api/auth/axiosInstance";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 1000px;
  height: 900px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 60px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 20px;
  border-radius: 8px;
  padding-right: 40px;
  position: relative;
  padding-right: 40px;
`;
export const SearchIconButton = styled.button`
  position: absolute;
  right: 10px;
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
const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const MovieItem = styled.div`
  width: 160px;
  height: 325px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 235px;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }
  p {
    font-size: 20px;
    padding: 0 3px;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const CloseButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #000000;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 8px;
  margin-top: auto;
  font-size: 18px;
  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
`;

const SearchModal = ({
  isOpen,
  onClose,
  onSelectMovie,
  searchTerm,
  setSearchTerm,
}) => {
  const [movies, setMovies] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async () => {
    if (searchTerm.trim() === "") return;
    try {
      const response = await axiosInstance.get(
        `/api/admin/match-up/${searchTerm}`
      );
      console.log(response.data.response);
      setMovies(response.data.response);
    } catch (error) {
      console.error("영화 검색 오류:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };
  const handleModalClose = () => {
    setSearchTerm("");
    setMovies([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContainer>
        <h3>영화 검색</h3>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
          placeholder="영화 제목을 입력하세요"
        />

        <SearchIconButton
          type="button"
          aria-label="검색"
          onClick={handleSearchSubmit}
        >
          {/* <SearchIcon /> */}
        </SearchIconButton>

        <MovieList>
          {movies.map((movie, index) => (
            <MovieItem key={index} onClick={() => onSelectMovie(movie)}>
              <img src={movie.posterPath} alt={movie.title} />
              <p>{movie.title}</p>
            </MovieItem>
          ))}
        </MovieList>
        <CloseButton onClick={handleModalClose}>닫기</CloseButton>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default SearchModal;
