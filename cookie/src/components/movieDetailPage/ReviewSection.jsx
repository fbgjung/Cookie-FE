import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";


const Title = styled.h2`
  margin-top: 50px;
`

const ReviewWrapper = styled.div`
  margin-top: 3%;

  h2 {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;

    .review-count {
      font-size: 14px;
      color: #666;
      margin-left: 10px;
    }

    .more-review-button {
      margin-left: auto; /* 버튼을 오른쪽으로 밀기 */
      font-size: 14px;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 4px;
      padding: 5px 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  .review-grid {
    display: grid;
    /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-top: 20px;

    @media (max-width: 600px) {
      grid-template-columns: repeat(1, 1fr);
    }

    .review-item {
      position: relative;
      background-image: url("/images/reviewticket.svg"); // 리뷰 티켓 이미지 경로
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 100%;
      padding: 20px;
      border-radius: 8px;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      cursor: pointer;
      gap: 20px;

      .review-user {
        font-size: 14px;
        font-weight: bold;
        color: #333;
      }

      .review-comment {
        font-size: 12px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .review-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .likes {
          font-size: 12px;
          color: #cc5283;
        }
      }
    }
  }

  .more-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    button {
      font-size: 14px;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;



const ReviewUserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ReviewDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ReviewSection = ({ reviews = [], reviewCount, onViewAllReviews, movie }) => {
  const navigate = useNavigate();
  console.log(reviews);

  return (
    <ReviewWrapper>
      <Title>
        리뷰
        <span className="review-count">{reviewCount}</span>
        <button className="more-review-button" onClick={onViewAllReviews}>더보기</button>
      </Title>
      <div className="review-grid">
        {reviews.map((review, index) => (
          <div className="review-item" key={index}>
            
            <ReviewUserProfile>
              <img
                  src={review.user.profileImage}
                  alt={review.user.nickname}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginBottom: "5px",
                  }}
                />
              <div className="review-user">{review.user.nickname}</div>
            </ReviewUserProfile>
            
            <ReviewDetail>
              <div className="review-comment">{review.content}</div>
              <div className="review-footer">
                <div className="likes">❤️ {review.reviewLike}</div>
              </div>
            </ReviewDetail>
            
          </div>
        ))}
      </div>
      
    </ReviewWrapper>
  );
};

ReviewSection.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
    })
  ).isRequired,
  reviewCount: PropTypes.number.isRequired,
  onViewAllReviews: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired, // 영화 정보 전달
};

export default ReviewSection;
