import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PointSection = styled.div`
  margin-top: 20px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const PointListContainer = styled.div`
  border: 2px solid #000;
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
`;

const PointItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 20px;
  cursor: pointer;

  &:hover {
    background-color: #00d6e8;
  }
`;

const PointTitle = styled.span`
  font-size: 0.8rem;
  color: #333;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
  width: 100%;
`;

const PointContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const PointText = styled.span`
  font-size: 1rem;
  color: #333;
  font-weight: bold;
`;

const PointIcon = styled.div`
  color: #333;
  font-size: 1.2rem;
`;

const PointHistory = ({ badgePoint }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/point-history");
  };

  return (
    <PointSection>
      <PointListContainer>
        <PointItem onClick={handleNavigate}>
          <PointTitle>포인트 내역</PointTitle>
          <PointContent>
            <PointText>뱃지 포인트 {badgePoint}P</PointText>
            <PointIcon>
              <FaChevronRight />
            </PointIcon>
          </PointContent>
        </PointItem>
      </PointListContainer>
    </PointSection>
  );
};

PointHistory.propTypes = {
  badgePoint: PropTypes.number.isRequired,
};

export default PointHistory;
