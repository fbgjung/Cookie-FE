import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";
import PropTypes from "prop-types";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .back-icon {
    cursor: pointer;
    font-size: 1.5rem;
    margin-right: 10px;
    color: white;

    @media (max-width: 768px) {
      font-size: 1.3rem;
      margin-right: 8px;
    }

    @media (max-width: 480px) {
      font-size: 1.1rem;
      margin-right: 5px;
    }
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;

    @media (max-width: 768px) {
      font-size: 1.3rem;
    }

    @media (max-width: 480px) {
      font-size: 1.1rem;
    }
  }
`;

const MovieDetailHeader = ({ onBack }) => {
  return (
    <HeaderContainer>
      <FaChevronLeft className="back-icon" onClick={onBack} />
      <span className="title">영화 상세보기</span>
    </HeaderContainer>
  );
};

MovieDetailHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default MovieDetailHeader;
