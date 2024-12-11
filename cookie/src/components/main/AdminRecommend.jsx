import React, { useEffect, useState } from "react";
import styled from "styled-components";
import videoIcon from "../../assets/images/main/video_icon.svg";
import { useNavigate } from "react-router-dom";
import serverBaseUrl from "../../config/apiConfig";
import axios from "axios";

const MovieRecommendList = styled.div`
  position: relative;

  .recommend__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.375rem;
  }
  .recommend__movie {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start;
    overflow-x: auto;
    gap: 1rem;
    padding: 0.625rem;
  }
  .recommend__movie--info {
    display: flex;
    position: relative;
    flex-direction: start;
    align-items: center;
    gap: 0.5rem;
  }
  .recommend__movie--info img {
    border-radius: 0.75rem;
    width: 7.75rem;
    height: 11.07rem;
  }

  .recommend__movie--info p {
    text-align: start;
  }

  .movie__info--sub {
    color: #afafaf;
    font-size: 0.82rem;
  }
  @media (max-width: 768px) {
    .recommend__title {
      font-size: 0.8rem;
    }
    .recommend__movie {
      gap: 0.5rem;
      padding: 0.625rem 0;
    }
    .recommend__movie--info img {
      border-radius: 0.75rem;
      width: 5.875rem;
      height: 9.1875rem;
    }

    .recommend__movie--info p {
      text-align: start;
      font-size: 0.7rem;
    }
  }
  @media (max-width: 390px) {
    .recommend__movie {
      gap: 0.3rem;
      padding: 0.625rem 0;
    }
    .recommend__movie--info img {
      border-radius: 0.75rem;
      width: 5.375rem;
      height: 8.6875rem;
    }

    .recommend__movie--info p {
      font-size: 0.65rem;
    }
  }
`;
const SkeletonPoster = styled.div`
  border-radius: 0.75rem;
  width: 7.75rem;
  height: 11.07rem;
  background-color: #e0e0e0;
  animation: shimmer 1.5s infinite;
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: 200px 0;
    }
  }
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 400px 100%;
`;

function AdminRecommend() {
  const navigate = useNavigate();
  const [recommendMovies, setRecommendMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMainPageMovies = async () => {
      try {
        const response = await axios.get(
          `${serverBaseUrl}/api/movies/mainAdminRecommend`
        );
        const recommendMovies = response.data.response;
        setRecommendMovies(recommendMovies);
      } catch (error) {
        console.error("API 호출 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMainPageMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      <MovieRecommendList>
        <div className="recommend__title">
          <img src={videoIcon} alt="video_icon" />
          <h2> 이거봤어? 관리자 추천영화</h2>
        </div>
        <div className="recommend__movie">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index}>
                  <SkeletonPoster />
                </div>
              ))
            : recommendMovies.map((movie, index) => (
                <div key={index} className="recommend__movie--info">
                  <div
                    onClick={() => handleMovieClick(movie.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={movie.poster} alt={movie.title} />
                    <div>
                      <p>
                        <strong>{movie.title}</strong>
                      </p>
                      <p>
                        {new Date(movie.releasedAt).getFullYear()}﹒
                        {movie.country}
                      </p>
                    </div>
                    <p className="movie__info--sub">리뷰 : {movie.reviews}개</p>
                    <p className="movie__info--sub">좋아요 : {movie.likes}개</p>
                  </div>
                </div>
              ))}
        </div>
      </MovieRecommendList>
    </>
  );
}

export default AdminRecommend;
