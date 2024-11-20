import styled from "styled-components";

const ReviewSection = styled.div`
  margin-top: 30px;
`;

const ReviewTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #04012d;
  font-weight: bold;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ReviewTicket = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-image: url("/src/assets/images/mypage/reviewticket.svg");
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 180px;
  padding: 20px;
  box-sizing: border-box;
  cursor: pointer;
`;

const ReviewLeft = styled.div`
  flex: 0 0 80px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 5px;
  }

  .title {
    font-size: 0.9rem;
    font-weight: bold;
    color: #04012d;
    text-align: center;
  }
`;

const ReviewCenter = styled.div`
  flex: 1;
  margin-left: 20px;

  .profile {
    display: flex;
    align-items: center;
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
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: right;

  .score {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;

    img {
      width: 20px;
      height: 20px;
      margin: 1px;
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    img {
      width: 24px;
      height: 24px;
      margin-top: 90px;
      cursor: pointer;

      &:hover {
        color: #cc5283;
      }
    }
  }
`;

const ReviewList = ({ title, reviews }) => {
  return (
    <ReviewSection>
      <ReviewTitle>{title}</ReviewTitle>
      <ReviewContainer>
        {reviews.map((review, index) => (
          <ReviewTicket key={index}>
            <ReviewLeft>
              <img src={review.poster} alt="Movie Poster" />
              <div className="title">{review.movieTitle}</div>
            </ReviewLeft>
            <ReviewCenter>
              <div className="profile">
                <img src={review.profileImage} alt="Profile" />
                <div className="user-info">
                  <span className="name">{review.userName}</span>
                  <span className="date">{review.date}</span>
                </div>
              </div>
              <div className="comment">{review.comment}</div>
            </ReviewCenter>
            <ReviewRight>
              <div className="score">
                {Array.from({ length: review.cookies }).map((_, i) => (
                  <img
                    key={i}
                    src="/src/assets/images/mypage/cookiescore.svg"
                    alt="Cookie Score"
                  />
                ))}
              </div>
              <div className="actions">
                <img
                  src="/src/assets/images/mypage/hearticon.svg"
                  alt="Heart Icon"
                />
                <img
                  src="/src/assets/images/mypage/shareicon.svg"
                  alt="Share Icon"
                />
              </div>
            </ReviewRight>
          </ReviewTicket>
        ))}
      </ReviewContainer>
    </ReviewSection>
  );
};

export default ReviewList;
