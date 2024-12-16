import { FaArrowLeft } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";

import MyAllReviewList from "../pages/MyAllReviewList"
import axiosInstance from "../api/auth/axiosInstance";

const Container = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000000;
  width: 100%;
  /* max-width: 1000px; */
  margin: 0 auto;
  position: relative;
  min-height: 80vh;
`;

const EmptyMessage = styled.div`
  font-size: 1rem;
  color: #999;
  text-align: center;
  margin: 30px 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0 1rem 3rem;
  width: 100%;

  .title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-left: 0.4rem;
    color: #f84b99;
  }
`;

const PrevIcon = styled.svg`
  width: 32px;
  height: 32px;
  background: no-repeat center/cover url("/assets/images/prev-button.svg");
  cursor: pointer;
`

const LikedReviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const handleBackClick = () => {
    navigate(-1);
  };

  const fetchLikedReviews = async () => {
    if (loading || page > totalPages) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get("/api/users/likedReviewList", {
        params: {
          page: page - 1,
          size: 10,
        },
      });

      const { reviews = [], totalPages = 1 } = response.data.response || {};

      const newReviews = reviews.map((review) => ({
        reviewId: review.reviewId,
        content: review.content,
        movieScore: review.movieScore,
        reviewLike: review.reviewLike,
        createdAt: new Date(review.createdAt).toLocaleDateString(),
        updatedAt: new Date(review.updatedAt).toLocaleDateString(),
        movie: {
          title: review.movie.title,
          poster:
            review.movie.poster || "/src/assets/images/default-poster.jpg",
        },
        user: {
          nickname: review.user.nickname,
          profileImage: review.user.profileImage,
          mainBadgeImage: review.user.mainBadgeImage,
        },
      }));

      setReviews((prev) => [...prev, ...newReviews]);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("리뷰 데이터를 가져오는 데 실패했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  const lastReviewRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, page, totalPages]
  );

  useEffect(() => {
    fetchLikedReviews();
  }, [page]);

  const handleReviewClick = (reviewId) => {
    navigate(`/reviews/${reviewId}`, {
      state: { fromLikedReviews: true },
    });
  };

  return (
    <Container>
      <HeaderContainer>
        <PrevIcon onClick={handleBackClick}></PrevIcon>
        <span className="title">내가 좋아한 리뷰</span>
      </HeaderContainer>
      {reviews.length > 0 ? (
        <ReviewContainer>
        {reviews.map((review, index) => (
          <ReviewTicket
            key={`${review.reviewId}-${index}`}
            onClick={() => handleReviewClick(review.reviewId)}
          >
            <ReviewLeft>
              <img src={review.movie.poster} alt={review.movie.title} />
            </ReviewLeft>
            <ReviewInfoSection>
              <ReviewInfoFirst>
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
                          .toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })
                          .replace(/\./g, "-")
                          .replace(/-$/, "")
                          .replace(/-\s/g, "-")}
                        {' '}
                        {new Date(review.createdAt)
                          .toLocaleTimeString('ko-KR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        }
                      </div>
                    </div>
                  </div>
                  <p className="movie-title">{review.movie.title}</p>
                  <div className="comment">
                    {review.content.length > 100
                      ? `${review.content.slice(0, 105)}...`
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
                </ReviewRight>  
              </ReviewInfoFirst>

              <ReviewInfoSecond>
                <LikeIcon />
                <ReviewLike>{review.reviewLike}</ReviewLike>
                <CommentIcon />
                <ReviewComment>{review.comments}</ReviewComment>
              </ReviewInfoSecond>

            </ReviewInfoSection>
          </ReviewTicket>
        ))}
      </ReviewContainer>
        // <h2>내가 좋아요한 리뷰 리스트들</h2>
      ) : (
        <EmptyMessage>좋아하는 리뷰를 선택해보세요!</EmptyMessage>
      )}
    </Container>
  );
};

export default LikedReviews;



const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* padding: 0 1rem; */
  
`;

const ReviewTicket = styled.div`
  display: flex;
  padding: 1rem 0.8rem;
  border-radius: 0.4rem;
  box-sizing: border-box;
  cursor: pointer;
  background-color: #fdf8fa;
  margin: 0.4rem 0;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ReviewLeft = styled.div`
  img {
    width: 7.75rem;
    height: 100%;
    object-fit: cover;
  }
  .title {
    font-size: 0.6rem;
    margin: 0;
    font-weight: normal;
    color: #434141;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ReviewInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

`

const ReviewInfoFirst = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const ReviewCenter = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 1.5rem;
  width: 18rem;

  .profile {
    display: flex;
    align-items: center;

    img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      margin-right: 10px;
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
    margin-top: 0.5rem;
    font-size: 0.8rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;

  }

  .movie-title {
    margin-top: 0.5rem;
    font-size: 0.7rem;
    font-weight: 600;
    color: #F84B99;
  }
`;

const ReviewRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .score {
    
    img {
      width: 16px;
      height: 16px;
      margin-right: 0.1rem;
    }
  }

  .score-text {
    font-size: 0.8rem;
    color: #888;
    margin-right: 0.5rem;
  }
`;


const ReviewInfoSecond = styled.div`
  display: flex;
  justify-content: flex-end;
`

const LikeIcon = styled.svg`
  width: 14px;
  height: 14px;
  background: no-repeat center/cover url("/assets/images/review/heart-review-feed.svg");
`

const ReviewLike = styled.p`
  font-size: 0.9rem;
`

const CommentIcon = styled.svg`
  margin-left: 0.5rem;
  width: 14px;
  height: 14px;
  background: no-repeat center/cover url("/assets/images/review/comment-review-feed.svg");
`

const ReviewComment = styled.p`
  font-size: 0.9rem;
`