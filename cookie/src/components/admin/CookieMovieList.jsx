import styled from "styled-components";
import { SearchBarContainer, SearchIconButton, SearchInput } from "./AddMovie";
import SearchIcon from "@mui/icons-material/Search";
import useAdminMovieStore from "../../stores/useAdminMovieStore";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Like from "../../assets/images/admin/like.svg";
import Edit from "../../assets/images/admin/Edit.svg";
import More from "../../assets/images/admin/more.svg";
import MovieInfoModal from "./MovieInfoModal";
import EditCategory from "./EditCategory";

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
  grid-template-columns: 0.8fr 0.7fr 0.7fr 3fr 3fr 0.8fr;
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
  grid-template-columns: 0.8fr 0.7fr 0.7fr 3fr 3fr 0.8fr;
  grid-template-rows: repeat(10, 1fr);
  gap: 15px;
  min-height: 600px;

  .grid-item {
    display: flex;
    align-items: center;
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
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false); // EditCategory 페이지

  const selectedMovie = registeredMovies.find(
    (movie) => movie.movieId === selectedMovieId
  );

  useEffect(() => {
    setLoading(false);
  }, [currentPage]);

  const Icon = [
    { src: Like, action: () => console.log("Like clicked") },
    { src: Edit, action: (movie) => setIsEditOpen(true) },
    { src: More, action: (movie) => openModal(movie) },
  ];

  const openModal = (movie) => {
    setSelectedMovieId(movie.movieId); // 영화 ID 업데이트
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovieId(null); // 영화 ID 초기화
    setIsModalOpen(false);
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
                <>
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
                </>
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
      {isEditOpen && <EditCategory movie={selectedMovie} />}
    </>
  );
};

export default CookieMovieList;
