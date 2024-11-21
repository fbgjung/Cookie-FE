import PropTypes from "prop-types";
import styled from "styled-components";

const DetailsWrapper = styled.div`
  display: flex;
  margin-top: 20px;

  img {
    width: 120px;
    height: auto;
    border-radius: 8px;
  }

  .details {
    margin-left: 20px;
    flex: 1;

    .keywords {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;

      span {
        background: #e5e7eb;
        padding: 5px 10px;
        border-radius: 20px;
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

const DetailsSection = ({ posterUrl, keywords, description }) => {
  return (
    <DetailsWrapper>
      <img src={posterUrl} alt="포스터" />
      <div className="details">
        <div className="keywords">
          {keywords.map((keyword, index) => (
            <span key={index}>{keyword}</span>
          ))}
        </div>
        <p>{description}</p>
      </div>
    </DetailsWrapper>
  );
};

// PropTypes 정의
DetailsSection.propTypes = {
  posterUrl: PropTypes.string.isRequired, // posterUrl은 string 타입의 필수 항목
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired, // keywords는 string 배열의 필수 항목
  description: PropTypes.string.isRequired, // description은 string 타입의 필수 항목
};

export default DetailsSection;
