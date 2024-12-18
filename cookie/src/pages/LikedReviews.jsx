import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import axiosInstance from "../api/auth/axiosInstance";

const Container = styled.div`
  padding: 20px 15px;
  background-color: #000000;
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 좌측 정렬 */
  margin: 0;
  padding: 1rem 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #f84b99;
    margin-left: 0.5rem; /* 백버튼과 텍스트 사이 간격 */

    @media (max-width: 768px) {
      font-size: 1.3rem;
    }

    @media (max-width: 480px) {
      font-size: 1.1rem;
    }
  }
`;

const PrevIcon = styled.svg`
  width: 32px;
  height: 32px;
  background: url("/assets/images/prev-button.svg") no-repeat center/cover;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReviewTicket = styled.div`
  display: flex;
  padding: 1.5rem 2rem;
  margin: 0 auto;
  border-radius: 0.5rem;
  background-color: #fdf8fa;
  transition: transform 0.2s ease;
  cursor: pointer;
  width: calc(100% - 4rem);

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 1.2rem 1.5rem;
    width: calc(100% - 3rem);
  }

  @media (max-width: 480px) {
    padding: 1rem 1rem;
    width: calc(100% - 2rem);
  }
`;

const ReviewLeft = styled.div`
  img {
    width: 8rem;
    height: 11rem;
    object-fit: cover;
    border-radius: 0.4rem;

    @media (max-width: 768px) {
      width: 7rem;
      height: 10rem;
    }

    @media (max-width: 480px) {
      width: 6rem;
      height: 9rem;
    }
  }
`;

const ReviewInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-left: 1.5rem;

  @media (max-width: 768px) {
    margin-left: 1rem;
  }

  @media (max-width: 480px) {
    margin-left: 0.8rem;
  }
`;
const ReviewInfoFirst = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start; /* 상단 정렬로 변경 */

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ReviewCenter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .profile {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      margin-right: 10px;
      border: 1.5px solid #b3afb1;

      @media (max-width: 768px) {
        width: 40px;
        height: 40px;
      }

      @media (max-width: 480px) {
        width: 36px;
        height: 36px;
      }
    }

    .user-info {
      .name {
        font-size: 1rem;
        font-weight: bold;

        @media (max-width: 768px) {
          font-size: 0.9rem;
        }

        @media (max-width: 480px) {
          font-size: 0.8rem;
        }
      }

      .date {
        font-size: 0.9rem;
        color: #888;

        @media (max-width: 768px) {
          font-size: 0.8rem;
        }

        @media (max-width: 480px) {
          font-size: 0.7rem;
        }
      }
    }
  }

  .comment {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }

    @media (max-width: 480px) {
      font-size: 0.75rem;
    }
  }

  .movie-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #f84b99;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }

    @media (max-width: 480px) {
      font-size: 0.75rem;
    }
  }
`;

const ReviewRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .score {
    display: flex;
    gap: 0.2rem;

    img {
      width: 16px;
      height: 16px;

      @media (max-width: 768px) {
        width: 14px;
        height: 14px;
      }
    }
  }
`;

const ReviewInfoSecond = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LikeIcon = styled.svg`
  width: 14px;
  height: 14px;
  background: url("/assets/images/review/heart-review-feed.svg") no-repeat
    center/cover;

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;

const ReviewLike = styled.p`
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const CommentIcon = styled.svg`
  width: 14px;
  height: 14px;
  background: url("/assets/images/review/comment-review-feed.svg") no-repeat
    center/cover;

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;

const ReviewComment = styled.p`
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #f84b99;
  margin-top: 2rem;
`;

const LikedReviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const handleBackClick = () => navigate(-1);

  const fetchLikedReviews = useCallback(async () => {
    if (loading || page >= totalPages) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/users/likedReviewList", {
        params: { page, size: 10 },
      });

      const {
        reviews: fetchedReviews = [],
        totalPages: fetchedTotalPages = 1,
      } = response.data.response || {};

      setReviews((prev) => {
        const uniqueReviews = fetchedReviews.filter(
          (review) => !prev.some((r) => r.reviewId === review.reviewId)
        );
        return [...prev, ...uniqueReviews];
      });

      setTotalPages(fetchedTotalPages);
    } catch (error) {
      console.error("리뷰 데이터를 가져오는 데 실패했습니다:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, page, totalPages]);

  const lastReviewRef = useCallback(
    (node) => {
      if (loading || page + 1 >= totalPages) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
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
          {reviews.map((review, index) => {
            const isLastReview = index === reviews.length - 1;

            return (
              <ReviewTicket
                key={`${review.reviewId}-${index}`} // 고유 키 생성
                ref={isLastReview ? lastReviewRef : null}
                onClick={() => handleReviewClick(review.reviewId)}
              >
                <ReviewLeft>
                  <img
                    src={
                      review.movie.poster || "/assets/images/default-poster.jpg"
                    }
                    alt={review.movie.title}
                  />
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
                              .toLocaleDateString("ko-KR", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })
                              .replace(/\./g, "-")
                              .replace(/-$/, "")
                              .replace(/-\s/g, "-")}{" "}
                            {new Date(review.createdAt).toLocaleTimeString(
                              "ko-KR",
                              { hour: "2-digit", minute: "2-digit" }
                            )}
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
                        {Array.from({
                          length: Math.round(review.movieScore),
                        }).map((_, i) => (
                          <img
                            key={`${review.reviewId}-score-${i}`}
                            src="/assets/images/review/score-macarong.png"
                            alt="score"
                          />
                        ))}
                      </div>
                    </ReviewRight>
                  </ReviewInfoFirst>

                  <ReviewInfoSecond>
                    <IconWrapper>
                      <LikeIcon />
                      <ReviewLike>{review.reviewLike}</ReviewLike>
                    </IconWrapper>
                    <IconWrapper>
                      <CommentIcon />
                      <ReviewComment>{review.comments || 0}</ReviewComment>
                    </IconWrapper>
                  </ReviewInfoSecond>
                </ReviewInfoSection>
              </ReviewTicket>
            );
          })}
        </ReviewContainer>
      ) : (
        <EmptyMessage>좋아하는 리뷰를 선택해보세요!</EmptyMessage>
      )}
    </Container>
  );
};

export default LikedReviews;
