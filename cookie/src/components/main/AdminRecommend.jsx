import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import serverBaseUrl from "../../config/apiConfig";
import axios from "axios";
import likeHeart from "../../assets/images/main/like-heart2.svg";
import reivew from "../../assets/images/main/reviews.svg";

function AdminRecommend() {
  const navigate = useNavigate();
  const [recommendMovies, setRecommendMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMainPageMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${serverBaseUrl}/api/movies/mainAdminRecommend`
        );
        const recommendMovies = response.data.response;
        setRecommendMovies(recommendMovies);
      } catch (error) {
        console.error("추천영화를 불러오는 데 실패했습니다.:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMainPageMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleNext = () => {
    if (currentIndex < recommendMovies.length - 4) {
      setCurrentIndex((prev) => prev + 4);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(prev - 4, 0));
    }
  };

  // 비율 계산
  const translateValue =
    recommendMovies.length > 0
      ? currentIndex * (100 / recommendMovies.length)
      : 0;

  // const handleNext = () => {
  //   if (currentIndex < recommendMovies.length - 4) {
  //     setCurrentIndex((prev) => {
  //       const newIndex = prev + 4;
  //       return newIndex;
  //     });
  //   }
  // };

  // const handlePrev = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex((prev) => {
  //       const newIndex = Math.max(prev - 4, 0);
  //       return newIndex;
  //     });
  //   }
  // };
  return (
    <>
      <MovieRecommendList>
        <Title>쿠키가 직접 추천해요</Title>
        <div className="recommend__movie--wrapper">
          <button
            className="prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <div
            className="recommend__movie"
            style={{
              transform: `translateX(-${translateValue}%)`,
            }}
          >
            {recommendMovies.map((movie, index) => (
              <div key={index} className="recommend__movie--info">
                <div
                  onClick={() => handleMovieClick(movie.id)}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {isLoading ? (
                    <SkeletonOverlay />
                  ) : (
                    <Poster src={movie.poster} alt={movie.title} />
                  )}
                  <MovieInfo>
                    <Like>
                      <LikeIcon alt="Like Icon" />
                      <Count>{movie.likes}</Count>
                    </Like>
                    <Review>
                      <ReviewIcon alt="Review Icon" />
                      <Count>{movie.reviews}</Count>
                    </Review>
                  </MovieInfo>
                </div>
              </div>
            ))}
          </div>
          <button
            className="next"
            onClick={handleNext}
            disabled={currentIndex >= recommendMovies.length - 4}
          >
            &gt;
          </button>
        </div>
      </MovieRecommendList>
    </>
  );
}

export default AdminRecommend;

const MovieRecommendList = styled.div`
  position: relative;
  .recommend__movie--wrapper {
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    min-height: 212px;
  }

  .recommend__movie {
    display: flex;
    flex-direction: row;
    align-items: start;
    transition: transform 1s ease;
  }

  .prev,
  .next {
    position: absolute;
    top: 50%;
    width: 50px;
    height: 50px;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.7);
    border: none;
    color: white;
    font-size: 1.5rem;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 50%;
    z-index: 10;
  }

  .prev {
    left: -15px;
  }

  .next {
    right: -15px;
  }

  .prev:disabled,
  .next:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Title = styled.h2`
  color: #f84b99;
  padding: 2rem 0 0 0.375rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Review = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.375rem;
`;

const ReviewIcon = styled.svg`
  width: 15px;
  height: 15px;
  margin-right: 2px;
  background: no-repeat center/cover url(${reivew});
`;

const Count = styled.p`
  font-size: 0.8rem;
  color: #ffffff;
`;

const Like = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.375rem;
`;

const LikeIcon = styled.svg`
  width: 15px;
  height: 15px;
  margin-right: 2px;
  background: no-repeat center/cover url(${likeHeart});
`;

const MovieInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Poster = styled.img`
  transition: transform 0.3s ease;
  border-radius: 0.65rem;
  width: 8.75rem;
  height: 12.0625rem;
  padding: 0.4rem 0.375rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.3rem;
    width: 6rem;
    height: 8rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.3rem;
    width: 6.2rem;
    height: 9.3rem;
  }
  @media (max-width: 390px) {
    padding: 0.4rem 0.3rem;
    width: 5.6rem;
    height: 8.7rem;
  }
`;
export const SkeletonOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8.2rem;
  height: 11.55rem;
  background-color: rgba(0, 0, 0, 0.9);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.07) 25%,
    rgba(255, 255, 255, 0.159) 50%,
    rgba(255, 255, 255, 0.07) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  margin-right: 0.7rem;
  z-index: 100;
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  @media (max-width: 480px) {
    width: 5.6rem;
    height: 8.7rem;
  }
  @media (max-width: 390px) {
    width: 5.2rem;
    height: 8.3rem;
  }
`;
