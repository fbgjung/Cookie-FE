import React from "react";
import styled from "styled-components";
import { SearchBarContainer, SearchIconButton, SearchInput } from "./Addmovie";
import SearchIcon from "@mui/icons-material/Search";
import useAdminMovieStore from "../../stores/useAdminMovieStore";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Like from "../../assets/images/admin/like.svg";
import Edit from "../../assets/images/admin/Edit.svg";
import More from "../../assets/images/admin/more.svg";
import MovieInfoModal from "./MovieInfoModal";
import EditCategory from "./EditCategory";
import deleteBtn from "../../assets/images/signUp/close_icon.svg";

const AddMovieContainer = styled.div`
  width: 1239px;
  height: 840px;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 50px;
  background-color: white;
  box-shadow:
    -1px 6px 10px rgba(0, 0, 0, 0.1),
    1px -6px 10px rgba(0, 0, 0, 0.1),
    -3px 4px 8px rgba(0, 0, 0, 0.06),
    3px -4px 8px rgba(0, 0, 0, 0.06);
`;
const TableTitle = styled.div`
  width: 1175px;
  height: 32px;
  border: none;
  background-color: #04012d;
  color: white;
  border-radius: 12px;
  margin: 3rem 1rem 0 1rem;
  padding: 0 2rem;
  display: grid;

  grid-template-columns: 0.4fr 0.8fr 0.9fr 0.7fr 2fr 3fr 0.8fr;
  gap: 20px;

  p {
    font-size: 20px;
    font-weight: 700;
    text-align: start;
    display: flex;
    align-items: center;
  }
`;

const MovieListContainer = styled.div`
  padding: 1rem 3rem;
  display: grid;
  grid-template-columns: 0.3fr 0.8fr 0.9fr 0.7fr 2fr 3fr 0.8fr;
  grid-template-rows: repeat(10, 1fr);
  gap: 15px;
  min-height: 600px;
  align-items: start;

  .grid-item {
    display: flex;
    align-items: start;
  }

  p {
    height: 35px;
    overflow: hidden;
  }
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const CookieMovieList = () => {
  const { registeredMovies } = useAdminMovieStore();
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const [totalPages, setTotalPages] = useState(6); // 총 페이지
  const [loading, setLoading] = useState(true); //로딩 상태
  const [selectedMovieId, setSelectedMovieId] = useState(null); //선택된 영화 Id
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false); // EditCategory 페이지
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화

  useEffect(() => {
    if (selectedMovieId !== null) {
      const movie = registeredMovies.find(
        (movie) => movie.movieId === selectedMovieId
      );
      setSelectedMovie(movie);
    }
  }, [selectedMovieId, registeredMovies]);

  useEffect(() => {
    setLoading(false);
  }, [currentPage]);

  const Icon = [
    { src: Like, action: () => console.log("Like clicked") },
    {
      src: Edit,
      action: (movie) => {
        setSelectedMovieId(movie.movieId);
        setIsEditOpen(true);
        setIsModalOpen(false);
      },
    },
    {
      src: More,
      action: (movie) => {
        setSelectedMovieId(movie.movieId);
        setIsEditOpen(false);
        openModal(movie);
      },
    },
  ];

  const openModal = (movie) => {
    setSelectedMovieId(movie.movieId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovieId(null);
    setIsModalOpen(false);
  };

  const handleDelete = (movieId) => {
    const isConfirmed = window.confirm("선택한 영화를 삭제할까요?");
    if (isConfirmed) {
      useAdminMovieStore.getState().removeRegisteredMovie(movieId);
      alert("해당 영화가 삭제되었어요");
    } else {
      alert("영화 삭제가 취소되었어요");
    }
  };

  return (
    <>
      <AddMovieContainer>
        <SearchBarContainer>
          <SearchInput placeholder="영화 제목을 입력하세요" />
          <SearchIconButton type="button" aria-label="검색">
            <SearchIcon />
          </SearchIconButton>
        </SearchBarContainer>
        <TableTitle>
          <p>삭제</p>
          <p>영화제목</p>
          <p>개봉일</p>
          <p>감독</p>
          <p>배우</p>
          <p>줄거리</p>
          <p>관리</p>
        </TableTitle>
        <MovieListContainer>
          {loading ? (
            <p>Loading...</p>
          ) : (
            registeredMovies
              .slice((currentPage - 1) * 10, currentPage * 10)
              .map((movie) => (
                <React.Fragment key={movie.movieId}>
                  <IconButton onClick={() => handleDelete(movie.movieId)}>
                    <img src={deleteBtn} />
                  </IconButton>
                  <p className="grid-item">{movie.title}</p>
                  <p className="grid-item">{movie.releaseDate}</p>
                  <p className="grid-item">{movie.director.name}</p>
                  <p className="grid-item">
                    {movie.actors.map((actor) => actor.name).join(", ")}
                  </p>
                  <p className="grid-item">{movie.plot}</p>
                  <IconContainer className="grid-item">
                    {Icon.map((icon, index) => (
                      <IconButton
                        key={index}
                        onClick={() => icon.action(movie)}
                      >
                        <img src={icon.src} alt={`icon-${index}`} />
                      </IconButton>
                    ))}
                  </IconContainer>
                </React.Fragment>
              ))
          )}
        </MovieListContainer>
        {isModalOpen && selectedMovie && (
          <MovieInfoModal movie={selectedMovie} onClose={closeModal} />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </AddMovieContainer>
      {isEditOpen && selectedMovie && <EditCategory movie={selectedMovie} />}
    </>
  );
};

export default CookieMovieList;
