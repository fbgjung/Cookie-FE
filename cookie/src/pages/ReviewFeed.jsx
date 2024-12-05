import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/auth/axiosInstance";

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

const ReviewTitle = styled.div`
  text-align: center; /* 텍스트를 중앙 정렬 */
  margin-bottom: 20px;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px; /* 텍스트와 쿠키 이미지 간격 */
  }

  h2 {
    font-size: 1rem;
    font-weight: normal;
    color: #b29463; /* 쿠키 색상과 유사한 색상 */
    margin-top: 10px;
  }

  img {
    width: 30px;
    height: 30px;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
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
`;

const ReviewTicket = styled.div`
  display: flex;
  background-image: url("/src/assets/images/mypage/reviewticket.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  padding: 30px;
  border-radius: 8px;
  box-sizing: border-box;
  min-height: 180px;
  cursor: pointer;
  width: 100%;
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
  const [showSpoilerOnly, setShowSpoilerOnly] = useState(false);
  const [page, setPage] = useState(0); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 추가 로딩 가능 여부
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [initialLoad, setInitialLoad] = useState(true); // 초기 로딩 여부

  // SSE 연결
useEffect(() => {
  const eventSource = new EventSource(
    "/api/reviews/subscribe/feed"
  );

  eventSource.addEventListener("message", (event) => {
    const newReview = JSON.parse(event.data);

    // 리뷰 리스트에 추가 (중복 제거)
    setReviews((prevReviews) => {
      if (prevReviews.find((review) => review.reviewId === newReview.reviewId)) {
        return prevReviews; // 중복된 리뷰는 추가하지 않음
      }
      return [newReview, ...prevReviews]; // 새 리뷰를 리스트의 맨 위에 추가
    });

    console.log("새 리뷰 수신:", newReview);
  });

  eventSource.addEventListener("error", (error) => {
    console.error("SSE 연결 에러:", error);
    eventSource.close();
  });

  // 컴포넌트 언마운트 시 SSE 연결 닫기
  return () => {
    eventSource.close();
  };
}, []);

  // 초기 데이터 로드 및 페이지네이션
  const fetchReviews = useCallback(async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true); // 로딩 시작
      const endpoint = showSpoilerOnly
        ? "/api/reviews/spoiler"
        : "/api/reviews";

      console.log(`Fetching page ${page}...`);

      const response = await axiosInstance.get(endpoint, {
        params: { page, size: 10 },
      });

      const newReviews = response.data.response.reviews;

      setReviews((prevReviews) =>
        page === 0 ? newReviews : [...prevReviews, ...newReviews]
      ); // 초기 페이지일 경우 덮어쓰기, 아닐 경우 추가

      // 더 이상 데이터가 없는지 확인
      if (newReviews.length < 10 || page + 1 === response.data.response.totalReviewPages) {
        setHasMore(false); // 더 이상 로딩하지 않음
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  }, [page, showSpoilerOnly, isLoading, hasMore]);

  // 초기 로드
  useEffect(() => {
    if (initialLoad) {
      fetchReviews();
      setInitialLoad(false); // 초기 로딩 완료
    }
  }, [initialLoad, fetchReviews]);

  // 페이지 변경 시 추가 로드
  useEffect(() => {
    if (!initialLoad) {
      fetchReviews();
    }
  }, [page]);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (hasMore && !isLoading) {
        console.log("Triggering next page load...");
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [hasMore, isLoading]);

  // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // 필터링 핸들러
  const filterReviews = (showSpoilers) => {
    setShowSpoilerOnly(showSpoilers); // 스포일러 필터 설정
    setPage(0); // 페이지 초기화
    setReviews([]); // 기존 데이터 초기화
    setHasMore(true); // 추가 로딩 가능
    setInitialLoad(true); // 초기 로드 트리거
  };

  const handleReviewClick = (reviewId) => {
    navigate(`/reviews/${reviewId}`);
  };

  return (
    <ReviewFeedWrapper>
      <ReviewTitle>
        <h1>Cookie Review</h1>
        <h2>쿠키의 전체리뷰</h2>
      </ReviewTitle>
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
        {reviews.map((review, index) => (
          <ReviewTicket
            key={`${review.reviewId}-${index}`} // 고유 키 생성
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
                      key={`${review.reviewId}-score-${i}`} // 고유 키 생성
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
      {!hasMore && <p>No more reviews available.</p>}
    </ReviewFeedWrapper>
  );
};

export default ReviewFeed;