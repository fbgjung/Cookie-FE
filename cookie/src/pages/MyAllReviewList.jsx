import styled from "styled-components";
import { useNavigate} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "../api/auth/axiosInstance";
import toast from "react-hot-toast";

const ReviewSection = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 2rem;
  background-color: black;
`;


const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;

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

const MyAllReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);


  const fetchReviews = async () => {
    if (loading || page >= totalPages) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get("/api/users/myReviews", {
        params: {
          page,
          size: 5,
        },
      });

      const { reviews: newReviews, totalPages: fetchedTotalPages } =
        response.data.response;

      setReviews((prevReviews) => [...prevReviews, ...newReviews]);
      setTotalPages(fetchedTotalPages);
    } catch (error) {
      console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
      toast.error("리뷰 데이터를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleObserver = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && page < totalPages - 1 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observerInstance = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });

    if (observer.current) observerInstance.observe(observer.current);

    return () => {
      if (observer.current) observerInstance.unobserve(observer.current);
    };
  }, [reviews]);

  useEffect(() => {
    if (page > 0) {
      fetchReviews();
    }
  }, [page]);

  const handleReviewClick = (reviewId) => {
    navigate(`/reviews/${reviewId}`, {
      state: { fromMyAllReviewList: true },
    });
  };

  return (
    <ReviewSection>
      <HeaderContainer>
        <PrevIcon ></PrevIcon>
        <span className="title">내가 작성한 리뷰</span>
      </HeaderContainer>
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
    </ReviewSection>
  );
};

export default MyAllReviewList;
