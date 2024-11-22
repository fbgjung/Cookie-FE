import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ReviewWrapper = styled.div`
  margin-top: 30px;

  h2 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .review-count {
      font-size: 14px;
      color: #666;
    }
  }

  .review-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;

    .review-item {
      position: relative;
      background-image: url("/assets/images/mypage/reviewticket.svg"); // 리뷰 티켓 이미지 경로
      background-size: cover;
      background-position: center;
      width: 100%;
      height: 120px;
      padding: 10px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;

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

        .more {
          font-size: 12px;
          color: #007bff;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;

const ReviewSection = ({ reviews, reviewCount }) => {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate("/reviews"); // 더보기 클릭 시 리뷰 페이지로 이동
  };

  return (
    <ReviewWrapper>
      <h2>
        리뷰 <span className="review-count">{reviewCount}+</span>
      </h2>
      <div className="more" onClick={handleMoreClick}>
        더보기
      </div>
      <div className="review-grid">
        {reviews.slice(0, 4).map((review, index) => (
          <div className="review-item" key={index}>
            <div className="review-user">{review.userName}</div>
            <div className="review-comment">{review.comment}</div>
            <div className="review-footer">
              <div className="likes">❤️ {review.likes}</div>
            </div>
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
};

export default ReviewSection;