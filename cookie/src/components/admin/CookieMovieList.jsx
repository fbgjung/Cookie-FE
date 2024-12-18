import React from "react";
import styled from "styled-components";
import { SearchBarContainer, SearchIconButton, SearchInput } from "./Addmovie";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import TitleLike from "../../assets/images/admin/like.svg";
import Like from "../../assets/images/admin/like3.svg";
import Edit from "../../assets/images/admin/Edit.svg";
import More from "../../assets/images/admin/more2.svg";
import MovieInfoModal from "./MovieInfoModal";
import EditCategory from "./EditCategory";
import axiosInstance from "../../api/auth/axiosInstance";

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
export const TableTitle = styled.div`
  width: 1175px;
  height: 32px;
  border: none;
  background-color: #000000;
  color: #ffffff;
  border-radius: 12px;
  margin: 0rem 1rem 0 1rem;
  padding: 0 1.4rem;
  display: grid;
  grid-template-columns: 0.5fr 1.77fr 0.5fr 1fr 2fr 3fr 0.8fr;
  gap: 20px;
  justify-content: center;

  p {
    font-size: 20px;
    font-weight: 700;
    text-align: start;
    display: flex;
    align-items: center;
  }
`;

export const MovieListContainer = styled.div`
  padding: 1rem 3rem;
  display: grid;
  grid-template-columns: 0.1fr 2fr 0.5fr 1fr 1.5fr 3fr 0.8fr;
  grid-template-rows: repeat(10, 1fr);
  gap: 14px;
  min-height: 600px;
  align-items: start;

  .grid-item {
    display: flex;
    align-items: start;
    justify-content: start;
  }

  p {
    height: 38px;
    overflow: hidden;
    color: #333;
  }
`;

export const IconContainer = styled.div`
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
  img {
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
`;
export const UnderlinedButton = styled.button`
  padding: 3px 25px;
  background: none;
  color: #333;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  position: relative;

  &:hover {
    color: var(--sub-text);
  }
`;
const UnderlinedAddButton = styled.button`
  padding: 3px 33px;
  background: none;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  position: relative;

  &:hover {
    color: var(--sub-text);
  }
`;
const DeleteCheckBox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  background-color: white;
  appearance: none;
  border: 1px solid #333;
  cursor: pointer;
  &:checked {
    background-color: #333;
  }
`;
export const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 1240px;
`;
const RecommendTitle = styled.div`
  display: flex;
  align-items: center;
  h1 {
    color: #ffff;
  }
  img {
    margin-right: 10px;
    width: 30px;
    height: 30px;
  }
`;
const AdminRecomendList = styled.div`
  background-color: var(--ticket-bg);
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
  height: 680px;
  width: 1240px;
  padding: 30px 30px;
  border-radius: 12px;
  gap: 40px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 30px 0;

  .movieInfo__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 180px;
    position: relative;
  }
  img {
    border-radius: 10px;
    width: 177px;
    height: 245px;
  }
  h3 {
    text-align: center;
  }
`;
const CookieMovieList = () => {
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const [totalPages, setTotalPages] = useState(5); // 총 페이지
  const [loading, setLoading] = useState(true); //로딩 상태
  const [selectedMovieId, setSelectedMovieId] = useState([]); //선택된 영화 Id
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false); // EditCategory 페이지
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화
  const [registeredMovies, setRegisteredMovies] = useState([]); // 등록된 영화 목록 상태 추가
  const [recommendList, setRecommendList] = useState([]);
  const [addMovieIds, setAddMovieIds] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 저장

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const isValidSearchKeyword = (text) => {
    const validRegex = /[가-힣a-zA-Z]/;
    return validRegex.test(text);
  };
  const handleSearchSubmit = async () => {
    const validSearchKeyword = searchKeyword.trim();
    if (!validSearchKeyword || !isValidSearchKeyword(validSearchKeyword)) {
      return;
    }
    try {
      const response = await axiosInstance.get(
        `/api/admin/movies/${searchKeyword}/${currentPage}`
      );
      setSearchResults(response.data.response.results);
      setTotalPages(response.data.response.totalPages);
    } catch (error) {
      console.error("영화 검색 실패", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };
  //등록된 영화목록
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/api/admin/movies/${currentPage}`
        );
        setTotalPages(response.data.response.totalPages);
        setRegisteredMovies(response.data.response.results);
      } catch (error) {
        console.error("영화 목록을 불러오는 데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchKeyword.trim()) {
      handleSearchSubmit();
    } else {
      fetchMovies();
    }
  }, [currentPage, searchKeyword]);

  const handleCheckboxChange = (movieId) => {
    setSelectedMovieId((prevSelectedIds) =>
      prevSelectedIds.includes(movieId)
        ? prevSelectedIds.filter((id) => id !== movieId)
        : [...prevSelectedIds, movieId]
    );
  };
  const fetchRecommendList = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/recommend");
      setRecommendList(response.data.response);
    } catch (error) {
      console.error("추천 리스트를 가져오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchRecommendList();
  }, []);

  const createIconAction = (type, movie) => {
    return (e) => {
      e.stopPropagation();
      switch (type) {
        case "like":
          handleLikeClick(movie.movieId, movie.title);
          break;
        case "edit":
          setSelectedMovie(movie);
          setIsEditOpen((prev) => !prev);
          setIsModalOpen(false);
          break;
        case "more":
          setSelectedMovie(movie);
          setIsEditOpen(false);
          openModal(movie);
          break;
        default:
          break;
      }
    };
  };

  const Icon = [
    { src: Like, type: "like" },
    { src: Edit, type: "edit" },
    { src: More, type: "more" },
  ];

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovieId([]);
    setIsModalOpen(false);
  };

  const handleUpdateCategories = (updatedCategories) => {
    setSelectedMovie((prevMovie) => ({
      ...prevMovie,
      categories: updatedCategories,
    }));

    setRegisteredMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.movieId === selectedMovie.movieId
          ? { ...movie, categories: updatedCategories }
          : movie
      )
    );
  };
  const handleDelete = async () => {
    if (selectedMovieId.length > 0) {
      const isConfirmed = window.confirm("선택한 영화를 삭제할까요?");
      if (isConfirmed) {
        try {
          const response = await axiosInstance.delete(`/api/admin/movies`, {
            data: selectedMovieId,
          });
          setRegisteredMovies((prevMovies) =>
            prevMovies.filter(
              (movie) => !selectedMovieId.includes(movie.movieId)
            )
          );
          if (response.status === 200) {
            setSelectedMovieId([]);
            alert("선택한 영화가 삭제되었습니다.");
          }
        } catch (error) {
          console.error("영화를 삭제하는 데 실패했습니다.", error);
          alert("영화 삭제에 실패했습니다.");
        }
      }
    }
  };

  //관리자 추천 영화 삭제
  const handlRecommendDeleteAll = async () => {
    const movieIds = recommendList.map((movie) => movie.movieId);
    if (movieIds.length === 0) {
      alert("삭제할 항목이 없습니다.");
      return;
    }
    try {
      const response = await axiosInstance.post(
        `/api/admin/recommend`,
        movieIds
      );
      if (response.status === 200) {
        alert("삭제가 완료되었어요!");
        setRecommendList([]);
      }
    } catch (error) {
      console.error("추천 리스트 삭제 실패", error);
    }
  };

  const handleLikeClick = (movieId, title) => {
    alert(`${title} 선택되었어요!`);

    setAddMovieIds((prevIds) => {
      const movieExists = prevIds.some((movie) => movie.movieId === movieId);

      if (movieExists) {
        return prevIds.filter((movie) => movie.movieId !== movieId);
      } else {
        return [...prevIds, { movieId, title }];
      }
    });
  };

  //관리자 추천 영화 추가
  const handleAddRecommendMovie = async () => {
    if (addMovieIds.length === 0) {
      alert("추가할 영화가 선택되지 않았습니다.");
      return;
    }
    const movieIds = addMovieIds.map((movie) => movie.movieId);

    try {
      const response = await axiosInstance.post(
        `/api/admin/recommend`,
        movieIds
      );
      if (response.status === 200) {
        fetchRecommendList();
        setRecommendList((prevList) => [...prevList, ...addMovieIds]);
        alert("추천 영화가 추가되었어요!");
        setAddMovieIds([]);
      }
    } catch (error) {
      console.error("추천 영화 추가 실패", error);
    }
  };

  useEffect(() => {
    fetchRecommendList();
  }, []);
  const displayedMovies = searchKeyword ? searchResults : registeredMovies;
  return (
    <>
      <AddMovieContainer>
        <SearchBarContainer>
          <SearchInput
            placeholder="영화 제목을 입력하세요"
            value={searchKeyword}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <SearchIconButton
            type="button"
            aria-label="검색"
            onClick={handleSearchSubmit}
          >
            <SearchIcon />
          </SearchIconButton>
        </SearchBarContainer>
        <UnderlinedButton onClick={handleDelete}>선택 삭제</UnderlinedButton>
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
            <p></p>
          ) : Array.isArray(displayedMovies) && displayedMovies.length > 0 ? (
            displayedMovies.map((movie) => (
              <React.Fragment key={movie.movieId}>
                <DeleteCheckBox
                  type="checkbox"
                  checked={selectedMovieId.includes(movie.movieId)}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => handleCheckboxChange(movie.movieId)}
                ></DeleteCheckBox>

                <p className="grid-item">{movie.title}</p>
                <p className="grid-item">
                  {new Date(movie.releaseDate).getFullYear()}
                </p>

                <p className="grid-item">
                  {movie.director ? movie.director : "No director available"}
                </p>
                <p className="grid-item">
                  {movie.actors && movie.actors.length > 0
                    ? movie.actors.map((actor) => actor).join(", ")
                    : "No actors available"}
                </p>
                <p className="grid-item">{movie.plot}</p>

                <IconContainer className="grid-item">
                  {Icon.map((icon, index) => (
                    <IconButton
                      key={index}
                      onClick={(event) => {
                        event.stopPropagation();
                        createIconAction(icon.type, movie)(event);
                      }}
                    >
                      <img src={icon.src} alt={`icon-${index}`} />
                    </IconButton>
                  ))}
                </IconContainer>
              </React.Fragment>
            ))
          ) : (
            <p></p>
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
      {isEditOpen && selectedMovie && (
        <EditCategory
          movie={selectedMovie}
          closeModal={() => setIsEditOpen(false)}
          onUpdateCategories={handleUpdateCategories}
        />
      )}
      <TitleSection>
        <RecommendTitle>
          <img src={TitleLike} />
          <h1>추천리스트</h1>
        </RecommendTitle>

        {recommendList.length > 0 ? (
          <UnderlinedAddButton onClick={handlRecommendDeleteAll}>
            삭제
          </UnderlinedAddButton>
        ) : (
          <UnderlinedAddButton onClick={handleAddRecommendMovie}>
            추가
          </UnderlinedAddButton>
        )}
      </TitleSection>
      <AdminRecomendList>
        {recommendList.length > 0 ? (
          recommendList.map((movie, index) => (
            <div className="movieInfo__list" key={index}>
              <img src={movie.posterPath} alt={movie.title} />
              <h3>{movie.title}</h3>
            </div>
          ))
        ) : (
          <p>추천 리스트가 없습니다.</p>
        )}
      </AdminRecomendList>
    </>
  );
};

export default CookieMovieList;
