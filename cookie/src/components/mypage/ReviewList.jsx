import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ReviewSection = styled.div`
  margin-top: 0.3rem;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;

const ReviewTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #04012d;
  font-weight: bold;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewTicket = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-image: url("/src/assets/images/mypage/reviewticket.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 150px;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    background-size: 100% 100%;
  }
`;

const ReviewLeft = styled.div`
  flex: 0 0 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 6%;
  padding: 0 0 30px 30px;

  @media (min-width: 768px) {
    flex-direction: column;
    flex: 0 0 80px;
    margin-bottom: 0;
    margin-right: 15px;
  }

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 10px;

    @media (min-width: 768px) {
      width: 80px;
      height: 80px;
      margin-right: 0;

      margin-left: 5%;
      margin-bottom: 5px;
    }
  }

  .title {
    font-size: 0.9rem;
    font-weight: bold;
    color: #04012d;
    text-align: left;

    @media (min-width: 768px) {
      text-align: center;
      margin-top: 1%;
      margin-left: 1%;
    }
  }
`;

const ReviewCenter = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 0 30px 30px;

  @media (min-width: 768px) {
    padding-right: 100px;
  }

  .profile {
    display: flex;
    align-items: center;
    margin-top: 10%;
    margin-bottom: 10px;

    img {
      width: 30px;
      height: 30px;

      border-radius: 50%;
      margin-right: 10px;
    }

    .user-info {
      display: flex;
      flex-direction: column;

      .name {
        font-size: 0.9rem;
        font-weight: bold;

        color: #333;
      }

      .date {
        font-size: 0.8rem;

        color: #666;
      }
    }
  }

  .comment {
    font-size: 0.9rem;
    color: #333;
    margin-top: 5px;
  }
`;

const ReviewRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-right: 30px;

  @media (min-width: 768px) {
    position: absolute;
    top: 15px;
    right: 15px;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 0;
    width: 100px;
  }

  .score {
    display: flex;
    align-items: center;
    padding: 30px 0 0 30px;

    img {
      width: 20px;
      height: 20px;
      margin: 0 2px;
    }

    span {
      font-size: 0.9rem;
      margin-left: 5px;
      color: #666;
    }
  }

  .likes {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: #666;
    padding: 10px 0 0 30px;

    img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }

  .actions {
    display: flex;
    gap: 5px;
    margin-top: 3px;

    @media (min-width: 768px) {
      flex-direction: column;
      gap: 6px;
      margin-top: 40px;
      margin-right: 10px;
      align-items: center;
    }

    img {
      width: 20px;
      height: 20px;
      margin-top: 1px;
      cursor: pointer;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;
const ReviewList = ({ title, reviews }) => {
  const navigate = useNavigate();

  const handleReviewClick = (reviewId) => {
    navigate(`/reviews/${reviewId}`, { state: { from: "reviewList" } });
  };
  return (
    <ReviewSection>
      <ReviewTitle>{title}</ReviewTitle>
      <ReviewContainer>
        {reviews.map((review, index) => (
          <ReviewTicket
            key={review.reviewId}
            onClick={() => handleReviewClick(review.reviewId)}
          >
            <ReviewLeft>
              <img
                src={
                  review.movie?.poster ||
                  review.poster ||
                  "/src/assets/images/default-poster.png"
                }
                alt={review.movie?.title || review.movieTitle || "제목 없음"}
              />
              <div className="title">
                {review.movie?.title || review.movieTitle || "제목 없음"}
              </div>
            </ReviewLeft>
            <ReviewCenter>
              <div className="profile">
                <img
                  src={
                    review.user?.profileImage ||
                    review.profileImage ||
                    "/src/assets/images/default-user.png"
                  }
                  alt={`${review.user?.nickname || review.userName || "익명"} Profile`}
                />
                <div className="user-info">
                  <span className="name">
                    {review.user?.nickname || review.userName || "익명"}
                  </span>
                  <span className="date">
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString()
                      : review.date || "날짜 없음"}
                  </span>
                </div>
              </div>
              <div className="comment">
                {review.content || review.comment || "내용 없음"}
              </div>
            </ReviewCenter>
            <ReviewRight>
              <div className="score">
                {Array.from({ length: Math.round(review.movieScore || 0) }).map(
                  (_, i) => (
                    <img
                      key={i}
                      src="/src/assets/images/mypage/cookiescore.svg"
                      alt="Cookie"
                    />
                  )
                )}
                <span>{review.movieScore?.toFixed(1) || "0"}</span>
              </div>
              <div className="likes">
                <img
                  src="/src/assets/images/mypage/hearticon.svg"
                  alt="Heart Icon"
                />
                {review.reviewLike || 0}
              </div>
            </ReviewRight>
          </ReviewTicket>
        ))}
      </ReviewContainer>
    </ReviewSection>
  );
};

export default ReviewList;
