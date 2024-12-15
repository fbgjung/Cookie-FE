import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Title = styled.h2`
  margin-top: 50px;
  color: white;
`;

const ReviewWrapper = styled.div`
  margin-top: 3%;

  h2 {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    color: white;
    align-items: center;

    .review-count {
      font-size: 14px;
      color: white;
      margin-left: 10px;
    }

    .more-review-button {
      margin-left: auto;
      font-size: 14px;
      color: #fff;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      transition: color 0.3s ease;

      &:hover {
        color: #00d6e8;
      }

      &::after {
        content: " >";
        font-size: 14px;
        margin-left: 5px;
      }
    }
  }

  .review-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-top: 20px;

    @media (max-width: 600px) {
      grid-template-columns: repeat(1, 1fr);
    }

    .review-item {
      position: relative;
      background-color: #ffffff; /* 배경색을 흰색으로 설정 */
      border: 1px solid #ddd; /* 테두리 설정 */
      border-radius: 8px; /* 모서리 둥글게 */
      padding: 20px;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      cursor: pointer;
      gap: 20px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 약간의 그림자 추가 */

      .review-user {
        font-size: 14px;
        font-weight: bold;
        color: #333; /* 텍스트 색상 변경 */
      }

      .review-comment {
        font-size: 12px;
        color: black;
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
  color: #333; /* 사용자 이름 색상 변경 */
  align-items: center;
  justify-content: center;
`;

const ReviewDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: #333; /* 리뷰 텍스트 색상 변경 */
  justify-content: space-between;
`;

const ReviewSection = ({
  reviews = [],
  reviewCount,
  onViewAllReviews,
}) => {
  const navigate = useNavigate();

  const handleReviewClick = (reviewId) => {
    navigate(`/reviews/${reviewId}`);
  };

  return (
    <ReviewWrapper>
      <Title>
        리뷰
        <span className="review-count">{reviewCount}</span>
        <button className="more-review-button" onClick={onViewAllReviews}>
          더보기
        </button>
      </Title>
      <div className="review-grid">
        {reviews.map((review, index) => (
          <div
            className="review-item"
            key={index}
            onClick={() => handleReviewClick(review.reviewId)}
          >
            <ReviewUserProfile>
              <img
                src={review?.user?.profileImage || "/default-profile.png"}
                alt={review?.user?.nickname || "Anonymous"}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginBottom: "5px",
                }}
              />
              <div className="review-user">
                {review?.user?.nickname || "Anonymous"}
              </div>
            </ReviewUserProfile>

            <ReviewDetail>
              <div className="review-comment">
                {review?.content || "리뷰 내용이 없습니다."}
              </div>
              <div className="review-footer">
                <div className="likes">❤️ {review?.reviewLike || 0}</div>
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
      reviewId: PropTypes.number.isRequired,
      user: PropTypes.shape({
        profileImage: PropTypes.string,
        nickname: PropTypes.string,
      }).isRequired,
      content: PropTypes.string.isRequired,
      reviewLike: PropTypes.number.isRequired,
    })
  ).isRequired,
  reviewCount: PropTypes.number.isRequired,
  onViewAllReviews: PropTypes.func.isRequired,
};

export default ReviewSection;