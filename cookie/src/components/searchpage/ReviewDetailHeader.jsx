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
    color: #333;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
`;

const ReviewDetailHeader = ({ onBack }) => {
  return (
    <HeaderContainer>
      <FaChevronLeft className="back-icon" onClick={onBack} />
      <span className="title">리뷰 상세보기</span>
    </HeaderContainer>
  );
};

ReviewDetailHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default ReviewDetailHeader;