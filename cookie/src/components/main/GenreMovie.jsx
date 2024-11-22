import React, { useState } from "react";
import styled from "styled-components";
import videoIcon from "../../assets/images/main/video_icon.svg";
import { useNavigate, useParams } from "react-router-dom";

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
  }
  .genre__movie {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .genre__movie--list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .genre__movie--list img {
    border-radius: 0.75rem;
  }
  .genre__movie--list p {
    text-align: start;
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
  margin: 0 0.3rem 0.3rem 0;
  font-size: 1rem;
  color: ${(props) => (props.$isSelected ? "var(--main)" : "#afafaf")};
  font-weight: ${(props) => (props.$isSelected ? "bold" : "normal")};
`;

function GenreMovie() {
  const MovieGenre = [
    {
      id: 1,
      theme: "로맨스",
    },
    {
      id: 2,
      theme: "공포",
    },
    {
      id: 3,
      theme: "코미디",
    },
    {
      id: 4,
      theme: "액션",
    },
    {
      id: 5,
      theme: "애니메이션",
    },
    {
      id: 6,
      theme: "전쟁",
    },
    {
      id: 7,
      theme: "범죄",
    },
    {
      id: 8,
      theme: "SF",
    },
    {
      id: 9,
      theme: "음악",
    },
    {
      id: 10,
      theme: "스릴러",
    },
    {
      id: 11,
      theme: "판타지",
    },
    {
      id: 12,
      theme: "다큐멘터리",
    },
  ];

  // 더미데이터
  const GenreMovies = Array.from({ length: 60 }, (_, i) => ({
    movieId: i + 1,
    title: `영화 ${i + 1}`,
    poster: `https://via.placeholder.com/124x177`,
    plot: `이 영화는 영화 ${i + 1}에 대한 설명입니다.`,
    nation: ["미국", "한국", "대만", "중국", "캐나다", "프랑스"][i % 6],
    released: `20${10 + (i % 20)}`,
    runtime: `${120 + i}분`,
    score: Math.floor(Math.random() * 5) + 1,
    rating: i + 1 <= 10 ? "teenager" : "adult",
    genre: ["스릴러", "액션", "코미디", "드라마", "판타지", "로맨스"][i % 6],

    //서비스내 자체 추가 부분
    reviews: Math.floor(Math.random() * 1901) + 100,
    likes: Math.floor(Math.random() * 1701) + 300,
  }));
  const [selectedGenre, setSelectedGenre] = useState("로맨스");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleGenreClick = (genre) => {
    if (genre !== selectedGenre) {
      setSelectedGenre(genre);
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const filteredMovies = selectedGenre
    ? GenreMovies.filter((movie) => movie.genre === selectedGenre)
    : GenreMovies;

  return (
    <>
      <GenreMovieList>
        <div className="genre__title">
          <img src={videoIcon} alt="video_icon" />
          <h2>장르별 영화</h2>
        </div>
        <div className="genreBtn__contianer">
          {MovieGenre.map((genre) => (
            <GenreBtn
              key={genre.id}
              $isSelected={selectedGenre === genre.theme}
              onClick={() => handleGenreClick(genre.theme)}
            >
              {genre.theme}
            </GenreBtn>
          ))}
        </div>
        <div className="genre__movie">
          {filteredMovies.length > 0 ? (
            filteredMovies.slice(0, 12).map((movie, index) => (
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
                    {movie.released}﹒{movie.nation}
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
