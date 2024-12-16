import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/auth/axiosInstance";

const ReviewFeedWrapper = styled.div`
  width: 100%;
  background-color: #000000;
  padding: 20px;
  min-height: 100vh;
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
`;

const ReviewTicket = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 8px;
  background-color: #fdf8fa;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ReviewLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .profile {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: solid 1.5px #b3afb1;
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
    font-size: 0.8rem;
    line-height: 1.5;
    color: #333;
  }
`;

const ReviewRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;

  .score {
    font-size: 1rem;
    font-weight: bold;
    color: #f84b99;
  }

  .interactions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .likes {
      font-size: 0.9rem;
      margin-bottom: 5px;
    }

    .comments {
      font-size: 0.9rem;
    }
  }
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
        <p>{title} 영화 리뷰 한눈에 보기</p>
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
          <ReviewTicket key={review.reviewId}>
            <ReviewLeft>
              <div className="profile">
                <img
                  src={review.user?.profileImage || "/default-profile.png"}
                  alt={review.user?.nickname || "Anonymous"}
                />
                <div className="user-info">
                  <div className="name">{review.user?.nickname || "Anonymous"}</div>
                  <div className="date">
                    {new Date(review.createdAt).toLocaleDateString("ko-KR")}
                  </div>
                </div>
              </div>
              <div className="comment">
                {review.content.length > 100
                  ? `${review.content.slice(0, 100)}...`
                  : review.content}
              </div>
            </ReviewLeft>

            <ReviewRight>
              <div className="score">평점: {review.movieScore.toFixed(1)}</div>
              <div className="interactions">
                <div className="likes">❤️ {review.reviewLike} likes</div>
                <div className="comments">💬 {review.comments || 0} comments</div>
              </div>
            </ReviewRight>
          </ReviewTicket>
        ))}
      </ReviewContainer>
    </ReviewFeedWrapper>
  );
};

export default MovieReviewFeed;