import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const ReviewTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: bold;
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px;

  button {
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 20px;
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

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReviewTicket = styled.div`
  display: flex;
  background-image: url("/src/assets/images/mypage/reviewticket.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  min-height: 180px;
  cursor: pointer;
  width: 95%;
  margin: 0 auto;
`;

const ReviewLeft = styled.div`
  flex: 0 0 100px;
  img {
    width: 80px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
  }
  .title {
    font-size: 1rem;
    font-weight: bold;
    margin-top: 10px;
  }
`;

const ReviewCenter = styled.div`
  flex: 1;
  margin-left: 20px;
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
  .actions {
    margin-top: 10px;
    display: flex;
    gap: 10px;

    img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
`;

const ReviewFeed = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [showSpoilerOnly, setShowSpoilerOnly] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
  
    const fetchReviews = useCallback(
      async (spoiler = false) => {
        if (!hasMore || isLoading) return;
  
        try {
          setIsLoading(true);
          const endpoint = spoiler ? "http://localhost:8080/api/reviews/spoiler" : "http://localhost:8080/api/reviews";
          const response = await axios.get(endpoint, {
            params: { page, size: 10 },
          });
  
          const newReviews = response.data.response.reviews;
  
          if (spoiler) {
            setReviews(newReviews);
          } else {
            setReviews((prevReviews) => [...prevReviews, ...newReviews]);
          }
  
          setFilteredReviews((prevReviews) =>
            spoiler ? newReviews : [...prevReviews, ...newReviews]
          );
  
          if (newReviews.length < 10) {
            setHasMore(false);
          }
        } catch (error) {
          console.error("Failed to fetch reviews:", error);
        } finally {
          setIsLoading(false);
        }
      },
      [page, hasMore, isLoading]
    );
  
    useEffect(() => {
      fetchReviews(showSpoilerOnly);
    }, []);
  
    const handleScroll = useCallback(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }, []);
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [handleScroll]);
  
    const filterReviews = (showSpoilers) => {
      setShowSpoilerOnly(showSpoilers);
      setPage(0);
      setHasMore(true);
      fetchReviews(showSpoilers);
    };
  
    const handleReviewClick = (reviewId) => {
      navigate(`/reviews/${reviewId}`);
    };
  
    return (
      <ReviewFeedWrapper>
        <ReviewTitle>Cookie Review</ReviewTitle>
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
          {filteredReviews.map((review) => (
            <ReviewTicket
              key={review.reviewId}
              onClick={() => handleReviewClick(review.reviewId)}
            >
              <ReviewLeft>
                <img src={review.movie.poster} alt={review.movie.title} />
                <div className="title">{review.movie.title}</div>
              </ReviewLeft>
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
                        key={i}
                        src="/src/assets/images/mypage/cookiescore.svg"
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
      </ReviewFeedWrapper>
    );
};  

export default ReviewFeed;