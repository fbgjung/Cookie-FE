import styled from "styled-components";
import PropTypes from "prop-types";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;

  .title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-left: 0.4rem;
    color: #f84b99;
  }
`;

const PrevIcon = styled.svg`
  width: 32px;
  height: 32px;
  background: no-repeat center/cover url("/assets/images/prev-button.svg");
  cursor: pointer;
`

const ReviewDetailHeader = ({ onBack, movieTitle }) => {
  return (
    <HeaderContainer>
      <PrevIcon onClick={onBack}></PrevIcon>
      <span className="title">{movieTitle} 리뷰</span>
    </HeaderContainer>
  );
};

ReviewDetailHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default ReviewDetailHeader;
