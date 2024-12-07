import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const DetailsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 20px;

  img {
    width: 120px;
    height: auto;
    border-radius: 8px;
  }

  .details {
    flex: 1;
    display: flex;
    flex-direction: column;

    .categories {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;

      span {
        background: #aad6e7;
        padding: 5px 10px;
        border-radius: 8px;
        font-size: 12px;
        color: #555;
      }
    }

    p {
      font-size: 14px;
      color: #333;
      line-height: 1.6;
    }
  }
`;

const MovieDetailRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieEvaluationFunction = styled.div`
  display: flex;
  justify-content: space-between;

  .write-review-button {
    cursor: pointer;
  }
`;

const MovieScore = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
`;

const HeartIcon = styled(FaHeart)`
  color: #ff4d4d;
  font-size: 16px;
`;

const DetailsSection = ({ posterUrl, categories = [], description, likes, score, movie }) => {
  const navigate = useNavigate();

  const handleWriteReviewClick = () => {
    navigate("/reviews/write", {
      state: { movie },
    });
  };

  return (
    <DetailsWrapper>
      <img src={posterUrl} alt="포스터" />

      <MovieDetailRight>
        <div className="details">
          <div className="categories">
            {categories.map((category, index) => (
              <span key={index}>{category.subCategory}</span>
            ))}
          </div>
          <p>{description}</p>
        </div>

        <MovieEvaluationFunction>
          <button className="write-review-button" onClick={handleWriteReviewClick}>
            리뷰 작성하기
          </button>
          <MovieScore>
            <HeartIcon /> {likes} | 평점: {score}
          </MovieScore>
        </MovieEvaluationFunction>
      </MovieDetailRight>
    </DetailsWrapper>
  );
};

DetailsSection.propTypes = {
  posterUrl: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  description: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  movie: PropTypes.object.isRequired,
};

export default DetailsSection;
