import styled from "styled-components";

const ReviewSection = styled.div`
  margin-top: 20px;
  padding: 0 15px;
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

  gap: 15px;
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
  min-height: 180px;
  padding: 15px;
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
    margin-top: 30%;

    img {
      width: 20px;
      height: 20px;
      margin-top: -3%;
      margin: 0 2px;
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
