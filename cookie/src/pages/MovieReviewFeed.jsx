import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/auth/axiosInstance";

const ReviewFeedWrapper = styled.div`
  width: 100%;
  background-color: #000000;
  padding-left: 40px;
  padding-right: 40px;
  min-height: 100vh;

  @media (max-width: 480px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;

  img {
    width: 150px;
    height: auto;
    border-radius: 8px;
  }

  p {
    color: #f84b99;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.5;
    max-width: 600px;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }

    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;

  button {
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &.active {
      background-color: #000000;
      color: #f84b99;
    }

    &.inactive {
      background-color: #000000;
      color: #ffffff;
    }
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const ReviewTicket = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #fdf8fa;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  flex-direction: row;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.7rem;
  }
`;

const ReviewLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1.5px solid #b3afb1;

    @media (max-width: 480px) {
      width: 40px;
      height: 40px;
    }
  }

  .name {
    font-size: 0.8rem;
    font-weight: bold;
    text-align: center;

    @media (max-width: 480px) {
      font-size: 0.7rem;
    }
  }
`;

const ReviewCenter = styled.div`
  flex: 1;
  padding: 0 1rem;

  .comment {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;

    &.blurred {
      filter: blur(5px);
      pointer-events: none;
      user-select: none;
    }

    @media (max-width: 480px) {
      font-size: 0.7rem;
    } 
  }
`;

const ReviewRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 5px;

  .score img {
    width: 16px;
    height: 16px;
    margin-right: 0.1rem;

    @media (max-width: 480px) {
      width: 12px;
      height: 12px;
    }
  }

  .interactions {
    display: flex;
    align-items: center;
    gap: 8px;

    .likes,
    .comments {
      display: flex;
      align-items: center;
      gap: 4px;
      padding-top: 40px;

      @media (max-width: 480px) {
        padding-top: 30px;
      }

      svg {
        width: 20px;
        height: 20px;

        @media (max-width: 480px) {
          width: 14px;
          height: 14px;
        }
      }

      span {
        font-size: 1rem;
        color: #888;

        @media (max-width: 480px) {
          font-size: 0.8rem;
        }
      }
    }
  }
`;

const LikeIcon = styled.svg`
  background: url("/assets/images/review/heart-review-feed.svg") no-repeat
    center;
  background-size: cover;
`;

const CommentIcon = styled.svg`
  background: url("/assets/images/review/comment-review-feed.svg") no-repeat
    center;
  background-size: cover;
`;

const MovieReviewFeed = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [poster, setPoster] = useState("");
  const [title, setTitle] = useState("");
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

      const { poster: moviePoster, title: movieTitle } = response.data.response;

      setPoster(moviePoster);
      setTitle(movieTitle);

      const newReviews = response.data.response.reviews;

      setReviews((prevReviews) =>
        page === 0 ? newReviews : [...prevReviews, ...newReviews]
      );

      if (
        newReviews.length < 10 ||
        page + 1 === response.data.response.totalReviewPages
      ) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setIsLoading(false);
    }
  }, [movieId, showSpoilerOnly, page, isLoading, hasMore]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleReviewClick = (reviewId) => {
    navigate(`/reviews/${reviewId}`);
  };

  const filterReviews = (showSpoilers) => {
    setShowSpoilerOnly(showSpoilers);
    setPage(0);
    setReviews([]);
    setHasMore(true);
    fetchReviews();
  };

  return (
    <ReviewFeedWrapper>
      <HeaderSection>
        <img src={poster || "/default-poster.png"} alt={title} />
        <p>
          {title} <br />
          리뷰 모아보기
        </p>
      </HeaderSection>

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
            <ReviewLeft>
              <img
                src={review.user?.profileImage || "/default-profile.png"}
                alt={review.user?.nickname || "Anonymous"}
              />
              <div className="name">{review.user?.nickname || "Anonymous"}</div>
            </ReviewLeft>
            <ReviewCenter>
              <div
                className={`comment ${
                  !showSpoilerOnly && review.spoiler ? "blurred" : ""
                }`}
              >
                {review.content.length > 100
                  ? `${review.content.slice(0, 100)}...`
                  : review.content}
              </div>
            </ReviewCenter>
            <ReviewRight>
              <div className="score">
                {Array.from({ length: Math.round(review.movieScore) }).map(
                  (_, i) => (
                    <img
                      key={`${review.reviewId}-score-${i}`}
                      src="/assets/images/review/score-macarong.png"
                      alt="score"
                    />
                  )
                )}
              </div>
              <div className="interactions">
                <div className="likes">
                  <LikeIcon />
                  <span>{review.reviewLike}</span>
                </div>
                <div className="comments">
                  <CommentIcon />
                  <span>{review.comments || 0}</span>
                </div>
              </div>
            </ReviewRight>
          </ReviewTicket>
        ))}
      </ReviewContainer>
    </ReviewFeedWrapper>
  );
};

export default MovieReviewFeed;
