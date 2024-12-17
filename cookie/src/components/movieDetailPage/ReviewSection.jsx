import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Title = styled.h2`
  margin-top: 50px;
  color: white;
`;

const ReviewWrapper = styled.div`
  margin-top: 3%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

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
        color: #F84B99;
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
    gap: 0.8rem;
    margin-top: 20px;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;

    @media (max-width: 600px) {
      grid-template-columns: repeat(1, 1fr);
    }

    .review-item {
      background-color: #FDF8FA;
      border-radius: 0.2rem;
      padding: 1rem;
      display: flex;
      align-items: flex-start;
      gap: 15px;
      cursor: pointer;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      width: 100%;
      box-sizing: border-box; 
      overflow: hidden;
    }
  }
`;

const ReviewUserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-bottom: 5px;
    border: solid 1.5px #b3afb1;
  }

  .review-user {
    font-size: 12px;
    font-weight: bold;
    color: #333;
    text-align: center;
    word-break: break-word;
    max-width: 100%;
  }
`;

const ReviewDetail = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden; 
  gap: 10px;
`;

const ReviewComment = styled.div`
  font-size: 12px;
  color: black;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  max-height: 3em;
  line-height: 1.5em;
`;

const ReviewFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;

  svg {
    width: 14px;
    height: 14px;
    background: no-repeat center/cover url("/assets/images/review/full-heart-review-feed.svg");
  }

  .likes {
    font-size: 12px;
    color: #cc5283;
  }
`;

const ReviewSection = ({
  reviews = [],
  totalReviews,
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
        <span className="review-count">{totalReviews || 0}</span>
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
              />
              <div className="review-user">
                {review?.user?.nickname || "Anonymous"}
              </div>
            </ReviewUserProfile>

            <ReviewDetail>
              <ReviewComment>
                {review?.content || "리뷰 내용이 없습니다."}
              </ReviewComment>
              <ReviewFooter>
                <svg/>
                <div className="likes">{review?.reviewLike || 0}</div>
              </ReviewFooter>
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
  totalReviews: PropTypes.number,
  onViewAllReviews: PropTypes.func.isRequired,
};

export default ReviewSection;