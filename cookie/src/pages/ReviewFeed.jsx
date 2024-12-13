import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/auth/axiosInstance";

const ReviewFeedWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 900px;
  background-color: #f9f9f9;
  padding: 20px;
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

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewTicket = styled.div`
  display: flex;
  /* background-image: url("/assets/images/review/ticket-skyblue.svg"); */
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  padding: 30px;
  border-radius: 0.2rem;
  box-sizing: border-box;
  min-height: 180px;
  cursor: pointer;
  width: 100%;
  margin: 10px;
  background-color: #ffffff;
  border: 1px solid #00D6E8;

  @media (max-width: 768px) {
    padding: 10px;
    
  }

  @media (max-width: 390px) {
    
  }

`;

const ReviewLeft = styled.div`
  img {
    width: 7rem;
    height: 11rem;
    object-fit: cover;
    border-radius: 0.2rem;
  }
  .title {
    font-size: 0.6rem;
    margin: 0;
    font-weight: normal;
    color: #434141;
    text-align: center;
    /* margin-top: ${({ isLongTitle }) => (isLongTitle ? "1px" : "10px")}; */
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ReviewCenter = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  padding: 0 2rem 0 2.5rem;
  justify-content: space-between;
  .profile {
    display: flex;
    align-items: center;

    img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      margin-right: 10px;
      border: solid 2px #ffffff;
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
    overflow: hidden;
    text-overflow: ellipsis;

    &.blurred {
      filter: blur(5px); /* 블러 효과 */
      pointer-events: none; /* 마우스 이벤트 비활성화 */
      user-select: none; /* 텍스트 선택 비활성화 */
    }
  }

  .movie-title {
    margin: 0;
    font-size: 0.7rem;
    font-weight: 600;
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
      width: 16px;
      height: 16px;
      margin-right: 0.1rem;
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

  /* SSE 연결
useEffect(() => {
  const eventSource = new EventSource(
    `http://localhost:8080/api/reviews/subscribe/feed`
  );

  eventSource.addEventListener("message", (event) => {
    const newReview = JSON.parse(event.data);

    setReviews((prevReviews) => {
      // 새 리뷰가 이미 존재하는지 확인
      const isAlreadyExists = prevReviews.some(
        (review) => review.reviewId === newReview.reviewId
      );

      if (isAlreadyExists) {
        return prevReviews; // 중복된 리뷰는 추가하지 않음
      }

      // 최상단에 새 리뷰 추가
      return [newReview, ...prevReviews];
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
*/

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
      if (
        newReviews.length < 10 ||
        page + 1 === response.data.response.totalReviewPages
      ) {
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
    navigate(`/reviews/${reviewId}`, {
      state: { fromReviewFeed: true },
    });
  };

  return (
    <ReviewFeedWrapper>
      {/* <ReviewTitle>
        <h1>Cookie Review</h1>
        <h2>쿠키의 전체리뷰</h2>
      </ReviewTitle> */}
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
            <ReviewLeft
              isLongTitle={review.movie.title.length > 9}
              title={review.movie.title} // 전체 제목을 tooltip으로 제공
            >
              <img src={review.movie.poster} alt={review.movie.title} />
              {/* <p className="title">
                {review.movie.title.length > 18
                  ? `${review.movie.title.slice(0, 18)}...`
                  : review.movie.title}
              </p> */}
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
                    {new Date(review.createdAt)
                      .toLocaleDateString()
                      .replace(/\./g, "-") 
                      .replace(/-$/, "")
                      .replace(/-\s/g, "-")}
                  </div>

                </div>
              </div>
              <div
                className={`comment ${
                  !showSpoilerOnly && review.spoiler ? "blurred" : ""
                }`}
              >
                {review.content.length > 100
                  ? `${review.content.slice(0, 105)}...`
                  : review.content}
              </div>
              <p className="movie-title">{review.movie.title}</p>
            </ReviewCenter>
            <ReviewRight>
              <div className="score">
                {Array.from({ length: Math.round(review.movieScore) }).map(
                  (_, i) => (
                    <img
                      key={`${review.reviewId}-score-${i}`} // 고유 키 생성
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
    </ReviewFeedWrapper>
  );
};

export default ReviewFeed;
