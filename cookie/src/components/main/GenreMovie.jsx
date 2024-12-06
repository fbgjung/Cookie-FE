import { useEffect, useState } from "react";
import styled from "styled-components";
import videoIcon from "../../assets/images/main/video_icon.svg";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/auth/axiosInstance";

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
    margin-bottom: 1rem;
    padding: 0 0.5rem;
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
    width: 124px;
    height: 177px;
  }
  .genre__movie--list p {
    text-align: start;
    width: 124px;
  }

  .genre__info--sub {
    color: #afafaf;
    font-size: 13px;
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
`;

function GenreMovie({ categorydata }) {
  const [selectedGenre, setSelectedGenre] = useState("로맨스");
  const [genreMovies, setGenreMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchMoviesByGenre = async (genre) => {
    try {
      const response = await axiosInstance.get("/api/movies/categoryMovies", {
        params: {
          mainCategory: "장르",
          subCategory: genre,
        },
      });
      console.log(response.data);
      setGenreMovies(response.data.movies);
    } catch (error) {
      console.error("영화 불러오기 실패:", error);
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
  }, [selectedGenre]);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    fetchMoviesByGenre(genre);
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

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
            genreMovies.slice(0, 12).map((movie, index) => (
              <div
                key={index}
                className="genre__movie--list"
                onClick={() => handleMovieClick(movie.movieId)}
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
      </GenreMovieList>
    </>
  );
}

export default GenreMovie;
