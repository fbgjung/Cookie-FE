import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

const ReviewFeedWrapper = styled.div`
  width: 100%;
  margin: 20px auto;
  max-width: 900px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  height: 100vh;
`;

const ReviewTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: bold;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReviewTicket = styled.div`
  display: flex;
  background-image: url("/src/assets/images/mypage/reviewticket.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  min-height: 180px;
  cursor: pointer;
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
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(`/api/reviews`, {
        params: { page, size: 10 },
      });
      const newReviews = response.data.response.content;

      setReviews((prevReviews) => [...prevReviews, ...newReviews]);
      if (newReviews.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <ReviewFeedWrapper>
      <ReviewTitle>전체 리뷰</ReviewTitle>
      <ReviewContainer>
        {reviews.map((review, index) => (
          <ReviewTicket key={index}>
            <ReviewLeft>
              <img src={review.movie.poster} alt={review.movie.title} />
              <div className="title">{review.movie.title}</div>
            </ReviewLeft>
            <ReviewCenter>
              <div className="profile">
                <img src={review.user.profileImage} alt={review.user.nickname} />
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
              <div className="actions">
                <img
                  src="/src/assets/images/mypage/hearticon.svg"
                  alt="Like"
                />
                <img
                  src="/src/assets/images/mypage/shareicon.svg"
                  alt="Share"
                />
              </div>
            </ReviewRight>
          </ReviewTicket>
        ))}
      </ReviewContainer>
    </ReviewFeedWrapper>
  );
};

export default ReviewFeed;