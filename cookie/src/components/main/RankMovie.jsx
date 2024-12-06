import React, { useEffect, useState } from "react";
import styled from "styled-components";
import videoIcon from "../../assets/images/main/video_icon.svg";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/auth/axiosInstance";
import serverBaseUrl from "../../config/apiConfig";

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
    align-items: start;
    justify-content: start;
    overflow-x: auto;
    gap: 1rem;
    padding: 0.625rem;
  }
  .rank__movie--list {
    display: flex;
    position: relative;
    flex-direction: start;
    align-items: center;
    gap: 0.5rem;
  }
  .rank__movie--list img {
    border-radius: 12px;
    width: 124px;
    height: 177px;
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
  const navigate = useNavigate();
  const [recommendMovies, setRecommendMovies] = useState([]);

  useEffect(() => {
    const fetchMainPageMovies = async () => {
      try {
        const response = await axiosInstance.get(
          `${serverBaseUrl}/api/movies/mainAdminRecommend`
        );
        const recommendMovies = response.data.response;
        setRecommendMovies(recommendMovies);
      } catch (error) {
        console.error("API 호출 오류 발생:", error);
      }
    };

    fetchMainPageMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      <MovieRankList>
        <div className="rank__title">
          <img src={videoIcon} alt="video_icon" />
          <h2> 이거봤어? 관리자 추천영화</h2>
        </div>
        <div className="rank__movie">
          {recommendMovies.map((movie, index) => (
            <div key={index} className="rank__movie--list">
              <div onClick={handleMovieClick} style={{ cursor: "pointer" }}>
                <img src={movie.poster} alt={movie.title} />
                <div>
                  <p>
                    <strong>{movie.title}</strong>
                  </p>
                  <p>
                    {new Date(movie.releasedAt).getFullYear()}﹒{movie.country}
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
