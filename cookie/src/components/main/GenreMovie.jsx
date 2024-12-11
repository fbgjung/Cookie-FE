import { useEffect, useState } from "react";
import styled from "styled-components";
import videoIcon from "../../assets/images/main/video_icon.svg";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/auth/axiosInstance";
import axios from "axios";
import serverBaseUrl from "../../config/apiConfig";

const GenreMovieList = styled.div`
  position: relative;

  .genre__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .genreBtn__contianer {
    margin-bottom: 0.8rem;
  }
  .genre__movie {
    display: flex;
    flex-direction: row;
    gap: 0.9rem;
    flex-wrap: wrap;
    align-items: start;
    padding: 0.625rem;
  }

  .genre__movie--list {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;
    cursor: pointer;
  }

  .genre__movie--list img {
    border-radius: 0.75rem;
    width: 7.75rem;
    height: 11.07rem;
  }
  .genre__movie--list p {
    text-align: start;
    width: 7.75rem;
  }

  .genre__info--sub {
    color: #afafaf;
    font-size: 0.82rem;
  }

  @media (max-width: 768px) {
    .genre__title {
      font-size: 0.8rem;
    }
    .genre__movie {
      gap: 0.625rem;
      padding: 0.625rem 0;
    }
    .genre__movie p {
      font-size: 0.7rem;
    }
    .genre__movie--list {
      width: 5.7rem;
      gap: 0.5rem;
    }
    .genre__movie--list img {
      border-radius: 0.75rem;
      width: 5.875rem;
      height: 9.1875rem;
    }
    .genre__movie--list p {
      text-align: start;
      font-size: 0.7rem;
      width: auto;
    }
    .genre__info--sub {
      font-size: 0.7rem;
    }
  }
  @media (max-width: 390px) {
    .genre__movie {
      gap: 0.3rem;
    }
    .genre__movie--list {
      width: 5.35rem;
    }
    .genre__movie--list img {
      border-radius: 0.75rem;
      width: 5.375rem;
      height: 8.6875rem;
    }
    .genre__movie--list p {
      font-size: 0.65rem;
    }
  }
`;

const GenreBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 0.8rem 0.3rem 0;
  font-size: 1rem;
  color: ${(props) => (props.$isSelected ? "var(--text)" : "#afafaf")};
  font-weight: ${(props) => (props.$isSelected ? "bold" : "normal")};
  @media (max-width: 768px) {
    margin: 0 0.7rem 0.5rem 0;
    font-size: 0.9rem;
  }
`;
const GenrePagination = styled.div`
  width: 100%;
  margin: 1rem 0;

  .genre__moviepagination {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;
const PaginationBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: ${(props) =>
    props.$selectedPage ? "var(--sub-text)" : "var(--text)"};
`;
const Skeleton = styled.div`
  width: 100%;
  height: 200px;
  background-color: #e0e0e0;
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #d0d0d0;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
`;
function GenreMovie({ categorydata }) {
  const [selectedGenre, setSelectedGenre] = useState("로맨스");
  const [genreMovies, setGenreMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);

  const navigate = useNavigate();

  const fetchMoviesByGenre = async (genre) => {
    const cacheKey = `movies_${genre}_${currentPage}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setGenreMovies(parsedData.movies);
      setTotalPages(parsedData.totalPages || 1);
    } else {
      try {
        const response = await axios.get(
          `${serverBaseUrl}/api/movies/categoryMovies`,
          {
            params: {
              mainCategory: "장르",
              subCategory: genre,
              page: currentPage - 1,
              size: 15,
            },
          }
        );
        console.log(response.data);

        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            movies: response.data.movies,
            totalPages: response.data.totalPages,
          })
        );

        setGenreMovies(response.data.movies);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("영화 불러오기 실패:", error);
      }
    }
  };
  useEffect(() => {
    const genreList = categorydata
      .filter((category) => category.mainCategory === "장르")
      .map((category) => category.subCategory);
    setGenres(genreList);
  }, [categorydata]);

  useEffect(() => {
    fetchMoviesByGenre(selectedGenre);
  }, [selectedGenre, currentPage]);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
    setSelectedPage(1);
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
    setSelectedPage(page);
  };
  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <GenreMovieList>
        <div className="genre__title">
          <img src={videoIcon} alt="video_icon" />
          <h2>장르별 영화</h2>
        </div>
        <div className="genreBtn__contianer">
          {genres
            .filter((genre) => genre !== "N/A")
            .map((genre, index) => (
              <GenreBtn
                key={index}
                $isSelected={selectedGenre === genre}
                onClick={() => handleGenreClick(genre)}
              >
                {genre}
              </GenreBtn>
            ))}
        </div>
        <div className="genre__movie">
          {genreMovies.length > 0 ? (
            genreMovies.map((movie, index) => (
              <div
                key={index}
                className="genre__movie--list"
                onClick={() => handleMovieClick(movie.id)}
              >
                <img src={movie.poster} alt={movie.title} />
                <div>
                  <p>
                    <strong>{movie.title}</strong>
                  </p>
                  <p>
                    {new Date(movie.releasedAt).getFullYear()}﹒{movie.country}
                  </p>
                  <p>{movie.genre}</p>
                  <p className="genre__info--sub">리뷰 : {movie.reviews}개</p>
                  <p className="genre__info--sub">좋아요 : {movie.likes}개</p>
                </div>
              </div>
            ))
          ) : (
            <p>해당하는 장르 영화가 없어요🥲</p>
          )}
        </div>
        <GenrePagination>
          {totalPages > 1 && (
            <div className="genre__moviepagination">
              {pageNumbers.map((number) => (
                <PaginationBtn
                  key={number}
                  onClick={() => handlePageClick(number)}
                  disabled={number === currentPage}
                  $selectedPage={selectedPage === number}
                >
                  {number}
                </PaginationBtn>
              ))}
            </div>
          )}
        </GenrePagination>
      </GenreMovieList>
    </>
  );
}

export default GenreMovie;
