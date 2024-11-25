import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

const ReviewFeedWrapper = styled.div`
  width: 100%;
  margin: 0px auto;
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
  background-size: contain; /* 이미지를 비율을 유지하며 축소 */
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  min-height: 180px;
  cursor: pointer;
  width: 95%; /* 전체 컨테이너의 80% 크기로 조정 */
  margin: 20 auto; /* 
  transform: scale(0.9); /* 전체 비율 유지하면서 약간 축소 */
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
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [showSpoilerOnly, setShowSpoilerOnly] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const dummyReviews = [
        {
          movie: {
            poster: "https://via.placeholder.com/80x120",
            title: "영화 제목 1",
          },
          user: {
            profileImage: "https://via.placeholder.com/40",
            nickname: "사용자 1",
          },
          content: "이 영화 정말 재미있었어요!",
          createdAt: new Date().toISOString(),
          movieScore: 4,
          isSpoiler: false,
        },
        {
          movie: {
            poster: "https://via.placeholder.com/80x120",
            title: "영화 제목 2",
          },
          user: {
            profileImage: "https://via.placeholder.com/40",
            nickname: "사용자 2",
          },
          content: "이 리뷰는 스포일러 리뷰입니당",
          createdAt: new Date().toISOString(),
          movieScore: 2,
          isSpoiler: true,
        },
        {
          movie: {
            poster: "https://via.placeholder.com/80x120",
            title: "영화 제목 3",
          },
          user: {
            profileImage: "https://via.placeholder.com/40",
            nickname: "사용자 3",
          },
          content: "볼만한 영화입니다!",
          createdAt: new Date().toISOString(),
          movieScore: 3,
          isSpoiler: false,
        },
        {
          movie: {
            poster: "https://via.placeholder.com/80x120",
            title: "영화 제목 4",
          },
          user: {
            profileImage: "https://via.placeholder.com/40",
            nickname: "사용자 4",
          },
          content: "주인공이 사망하는 충격적 결말",
          createdAt: new Date().toISOString(),
          movieScore: 5,
          isSpoiler: true,
        },
      ];
      setReviews(dummyReviews);
      setFilteredReviews(dummyReviews);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const filterReviews = (showSpoilers) => {
    setShowSpoilerOnly(showSpoilers);
    setFilteredReviews(
      showSpoilers ? reviews.filter((review) => review.isSpoiler) : reviews
    );
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
        {filteredReviews.map((review, index) => (
          <ReviewTicket key={index}>
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
              <div className="actions">
                <img src="/src/assets/images/mypage/hearticon.svg" alt="Like" />
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
