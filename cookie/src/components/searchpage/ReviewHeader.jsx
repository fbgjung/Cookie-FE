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
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
  }
`;

const ReviewHeader = ({ onBack }) => {
  return (
    <HeaderContainer>
      <FaChevronLeft className="back-icon" onClick={onBack} />
      <span className="title">리뷰 작성하기</span>
    </HeaderContainer>
  );
};

ReviewHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default ReviewHeader;
