import React from "react";
import styled from "styled-components";
import videoIcon from "../../assets/images/main/video_icon.svg";
import rank1 from "../../assets/images/main/rank_1.svg";
import rank2 from "../../assets/images/main/rank_2.svg";
import rank3 from "../../assets/images/main/rank_3.svg";
import rank4 from "../../assets/images/main/rank_4.svg";
import rank5 from "../../assets/images/main/rank_5.svg";
import rank6 from "../../assets/images/main/rank_6.svg";
import rank7 from "../../assets/images/main/rank_7.svg";
import rank8 from "../../assets/images/main/rank_8.svg";
import rank9 from "../../assets/images/main/rank_9.svg";
import rank10 from "../../assets/images/main/rank_10.svg";
import { useNavigate, useParams } from "react-router-dom";

const MovieRankList = styled.div`
  position: relative;

  .rank__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.375rem;
  }
  .rank__movie {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    overflow-x: auto;
    gap: 1rem;
    padding: 0.625rem;
  }
  .rank__movie--list {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  .rank__movie--list img {
    border-radius: 12px;
  }

  .rank__number--image {
    position: absolute;
    left: -6px;
    top: -9px;
  }
  .rank__movie--list p {
    text-align: start;
  }

  .movie__info--sub {
    color: #afafaf;
    font-size: 13px;
  }
`;

function MovieRank() {
  const rankMovies = Array.from({ length: 10 }, (_, i) => ({
    movieId: i + 1,
    title: `영화 ${i + 1}`,
    poster: `https://via.placeholder.com/124x177`,
    plot: `이 영화는 영화 ${i + 1}에 대한 설명입니다.`,
    nation: ["미국", "한국", "대만", "중국", "캐나다", "프랑스"][i % 6],
    released: `20${10 + (i % 20)}`,
    runtime: `${120 + i}분`,
    score: Math.floor(Math.random() * 5) + 1,
    rating: i + 1 <= 10 ? "teenager" : "adult",
    genre: ["스릴러", "액션", "코미디", "드라마", "판타지"][i % 5],
    reviews: Math.floor(Math.random() * 1901) + 100,
    likes: Math.floor(Math.random() * 1701) + 300,
    rank: Math.floor(Math.random() * 10) + 1,
  }));
  const sortedRankMovies = rankMovies.sort((a, b) => a.rank - b.rank); // 오름차순 정렬
  const rankImage = [
    rank1,
    rank2,
    rank3,
    rank4,
    rank5,
    rank6,
    rank7,
    rank8,
    rank9,
    rank10,
  ];
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      <MovieRankList>
        <div className="rank__title">
          <img src={videoIcon} alt="video_icon" />
          <h2> 금주 박스오피스 랭킹</h2>
        </div>
        <div className="rank__movie">
          {sortedRankMovies.map((movie, index) => (
            <div key={movie.movieId} className="rank__movie--list">
              <img
                className="rank__number--image"
                src={rankImage[index]}
                alt={`Rank ${index + 1}`}
              />
              <div onClick={handleMovieClick} style={{ cursor: "pointer" }}>
                <img src={movie.poster} alt={movie.title} />
                <div>
                  <p>
                    <strong>{movie.title}</strong>
                  </p>
                  <p>
                    {movie.released}﹒{movie.nation}
                  </p>
                </div>
                <p className="movie__info--sub">리뷰 : {movie.reviews}개</p>
                <p className="movie__info--sub">좋아요 : {movie.likes}개</p>
              </div>
            </div>
          ))}
        </div>
      </MovieRankList>
    </>
  );
}

export default MovieRank;
