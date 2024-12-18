import styled from "styled-components";
import PropTypes from "prop-types";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 18px;
  margin-left: -8px;
  margin-bottom: 22px;
`;

const PrevIcon = styled.div`
  width: 32px;
  height: 32px;
  background: url("/assets/images/prev-button.svg") no-repeat center/cover;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
  }
`;

const Title = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  color: #f84b99;
  margin-left: 10px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const MovieDetailHeader = ({ onBack, title }) => {
  return (
    <HeaderContainer>
      <PrevIcon onClick={onBack} />
      <Title>{title || "영화 제목 없음"}</Title>
    </HeaderContainer>
  );
};

MovieDetailHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default MovieDetailHeader;
