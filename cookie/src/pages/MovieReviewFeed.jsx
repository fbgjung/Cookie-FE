import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/auth/axiosInstance";
import DetailHeader from "../components/searchpage/MovieReviewDetailHeader";

const ReviewFeedWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 900px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100vh;
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;

  button {
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &.active {
      background-color: #04012d;
      color: #fff;
    }

    &.inactive {
      background-color: #f0f0f0;
      color: #666;
    }

    &:hover {
      background-color: #ddd;
    }
  }
`;

const MovieInfoWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const MoviePoster = styled.div`
  width: 200px;
  height: 300px;
  margin-left: 30px;
  margin-right: 30px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;

  .movie-title {
    font-size: 2rem;
    font-weight: bold;
  }

  .movie-info {
    font-size: 1rem;
    color: #888;
    margin-top: 10px;

    .info-item {
      margin-bottom: 5px;
    }
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

const ReviewTicket = styled.div`
  display: flex;
  background-image: url("/images/reviewticket.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  padding: 30px;
  border-radius: 8px;
  box-sizing: border-box;
  min-height: 180px;
  cursor: pointer;
  width: 90%;
  margin: 0 auto;
`;

const ReviewLeft = styled.div`
  flex: 0 0 0px;
`;

const ReviewCenter = styled.div`
  flex: 1;
  margin-left: 0px;
  display: flex;
  flex-direction: column;

  .profile {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .user-info {
      .name {
        font-size: 0.9rem;
        font-weight: bold;
      }

      .date {
        font-size: 0.8rem;
        color: #888;
      }
    }
  }

  .comment {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const ReviewRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .score {
    display: flex;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const MovieReviewFeed = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [movieInfo, setMovieInfo] = useState(null);
  const [showSpoilerOnly, setShowSpoilerOnly] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviews = useCallback(async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);

      const endpoint = showSpoilerOnly
        ? `/api/movies/${movieId}/reviews/spoiler`
        : `/api/movies/${movieId}/reviews`;

      const response = await axiosInstance.get(endpoint, {
        params: { page, size: 10 },
      });

      const newReviews = response.data.response.reviews;

      setReviews((prevReviews) =>
        page === 0 ? newReviews : [...prevReviews, ...newReviews]
      );

      if (newReviews.length < 10 || response.data.response.lastPage) {
        setHasMore(false);
      }

      // 영화 정보 설정
      setMovieInfo(response.data.response);
    } catch (error) {
      console.error("리뷰 불러오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, page, showSpoilerOnly, movieId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const filterReviews = (showSpoilers) => {
    setShowSpoilerOnly(showSpoilers);
    setPage(0);
    setReviews([]);
    setHasMore(true);
  };

  const handleReviewClick = (reviewId) => {
    navigate(`/reviews/${reviewId}`);
  };

  return (
    <ReviewFeedWrapper>
      <DetailHeader onBack={() => navigate(-1)} />
      {/* 영화 정보 한 번만 표시 */}
      {movieInfo && (
        <>
          <MovieInfoWrapper>
            <MoviePoster>
              <img src={movieInfo.poster} alt={movieInfo.title} />
            </MoviePoster>
            <MovieDetails>
              <div className="movie-title">{movieInfo.title}</div>
              <div className="movie-info">
                <div className="info-item">등급: {movieInfo.certification}</div>
                <div className="info-item">
                  상영 시간: {movieInfo.runtime}분
                </div>
                <div className="info-item">
                  개봉일:{" "}
                  {new Date(movieInfo.releasedAt)
                    .toLocaleDateString()
                    .replace(/\.$/, "")}
                </div>
              </div>
            </MovieDetails>
          </MovieInfoWrapper>
        </>
      )}

      <FilterButtons>
        <button
          className={!showSpoilerOnly ? "active" : "inactive"}
          onClick={() => filterReviews(false)}
        >
          전체 리뷰
        </button>
        <button
          className={showSpoilerOnly ? "active" : "inactive"}
          onClick={() => filterReviews(true)}
        >
          스포일러 리뷰
        </button>
      </FilterButtons>

      <ReviewContainer>
        {reviews.map((review) => (
          <ReviewTicket
            key={review.reviewId}
            onClick={() => handleReviewClick(review.reviewId)}
          >
            <ReviewLeft></ReviewLeft>
            <ReviewCenter>
              <div className="profile">
                <img
                  src={review.user.profileImage}
                  alt={review.user.nickname}
                />
                <div className="user-info">
                  <div className="name">{review.user.nickname}</div>
                  <div className="date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="comment">{review.content}</div>
            </ReviewCenter>
            <ReviewRight>
              <div className="score">
                {Array.from({ length: Math.round(review.movieScore) }).map(
                  (_, i) => (
                    <img
                      key={`${review.reviewId}-score-${i}`}
                      src="/images/cookiescore.svg"
                      alt="score"
                    />
                  )
                )}
              </div>
            </ReviewRight>
          </ReviewTicket>
        ))}
      </ReviewContainer>

      {isLoading && <p>Loading more reviews...</p>}
      {!hasMore && <p>No more reviews available.</p>}
    </ReviewFeedWrapper>
  );
};

export default MovieReviewFeed;
