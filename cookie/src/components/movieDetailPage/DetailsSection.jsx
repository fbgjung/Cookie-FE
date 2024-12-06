import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
      display: flex;

      span {
        background: #AAD6E7;
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
`

const MovieEvaluationFunction = styled.div`
  display: flex;
  justify-content: space-between;
  .write-review-button {
    cursor: pointer;
  }
`

const MovieScore = styled.p`
`

const DetailsSection = ({ posterUrl, categories = [], description, likes, score, movie }) => {
  console.log(categories);
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
            평점: {score}
            좋아요: {likes}
          </MovieScore>

        </MovieEvaluationFunction>
      </MovieDetailRight>
    </DetailsWrapper>
  );
};

// PropTypes 정의
DetailsSection.propTypes = {
  posterUrl: PropTypes.string.isRequired, // posterUrl은 string 타입의 필수 항목
  categories: PropTypes.arrayOf(PropTypes.string).isRequired, // keywords는 string 배열의 필수 항목
  description: PropTypes.string.isRequired, // description은 string 타입의 필수 항목
  likes: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  movie: PropTypes.object.isRequired, 
};

export default DetailsSection;

