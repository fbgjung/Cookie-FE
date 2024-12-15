import styled from "styled-components";
import PropTypes from "prop-types";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1rem 0 ;

  .title {
    font-size: 1.2rem;
    font-weight: bold;
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

const ReviewHeader = ({ movieTitle, onBack }) => {
  return (
    <HeaderContainer>
      <PrevIcon onClick={onBack}></PrevIcon>
      <span className="title">{movieTitle} 리뷰 작성하기</span>
    </HeaderContainer>
  );
};

ReviewHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default ReviewHeader;
