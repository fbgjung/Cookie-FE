import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // PropTypes 추가

const PointSection = styled.div`
  margin-top: 20px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const PointTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  margin-left: 5px;
  color: #ffffff;
  font-weight: bold;
`;

const PointListContainer = styled.div`
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  background-color: black;

  box-shadow:
    0 0 8px #00d6e8,
    0 0 16px #00d6e8;
`;

const PointItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #333;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #00d6e8;
  }
`;

const PointText = styled.span`
  font-size: 1rem;
  color: #ffffff;
  font-weight: bold;
`;

const PointIcon = styled.div`
  color: #ffffff;
  font-size: 1rem;
`;

const PointHistory = ({ badgePoint }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/point-history");
  };

  return (
    <PointSection>
      <PointTitle>포인트 내역</PointTitle>
      <PointListContainer>
        <PointItem onClick={handleNavigate}>
          <PointText>뱃지 포인트 {badgePoint}P</PointText>
          <PointIcon>
            <FaChevronRight />
          </PointIcon>
        </PointItem>
      </PointListContainer>
    </PointSection>
  );
};

// PropTypes 설정
PointHistory.propTypes = {
  badgePoint: PropTypes.number.isRequired,
};

export default PointHistory;
