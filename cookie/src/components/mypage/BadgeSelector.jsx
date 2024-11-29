import { useEffect, useState } from "react";
import styled from "styled-components";

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  width: 100%;
`;

const BadgeTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px; /* 아래 간격 추가 */
  margin-left: 40px;
  text-align: left;
  width: 100%;
  max-width: 450px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 5px;
  }
`;

const BadgeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 40px;
  align-items: center;
  background-color: #f4f4f4;
  border-radius: 12px;
  padding: 80px;
  width: 100%;
  max-width: 480px;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 60px;
    justify-content: center;

    max-width: 400px;
    gap: 15px;
  }

  @media (max-width: 480px) {
    padding: 50px;
    justify-content: center;
    max-width: 300px;
    gap: 10px;
  }
`;

const BadgeItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-right: 30px;

  img {
    width: 60px;
    height: 60px;
    margin-bottom: 8px;

    @media (max-width: 768px) {
      width: 50px;
      height: 50px;
    }

    @media (max-width: 480px) {
      width: 40px;
      height: 40px;
    }
  }

  span {
    font-size: 0.9rem;
    color: ${(props) => (props.isSelected ? "#f05454" : "#000")};
    font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }

    @media (max-width: 480px) {
      font-size: 0.7rem;
    }
  }

  input {
    margin-top: 5px;
    accent-color: #f05454;

    @media (max-width: 768px) {
      margin-top: 3px;
    }
  }

  &:last-child {
    margin-right: 0;
  }
`;

const BadgeSelector = ({ badges, selectedBadge, onBadgeChange }) => {
  const [currentSelectedBadge, setCurrentSelectedBadge] =
    useState(selectedBadge);

  useEffect(() => {
    setCurrentSelectedBadge(selectedBadge);
  }, [selectedBadge]);

  const handleBadgeSelect = (badge) => {
    const updatedBadges = badges.map((b) => ({
      ...b,
      main: b.name === badge.name,
    }));
    setCurrentSelectedBadge(badge.name);
    onBadgeChange(updatedBadges, badge.name);
  };

  return (
    <BadgeContainer>
      <BadgeTitle>대표 뱃지 선택</BadgeTitle>
      <BadgeList>
        {badges.map((badge) => (
          <BadgeItem
            key={badge.name}
            isSelected={currentSelectedBadge === badge.name}
            onClick={() => handleBadgeSelect(badge)}
          >
            <img
              src={
                currentSelectedBadge === badge.name
                  ? badge.badgeImage
                  : "/path/to/defaultBadge.png"
              }
              alt={badge.name}
            />
            <span>{badge.name}</span>
            <input
              type="radio"
              name="badge"
              checked={currentSelectedBadge === badge.name}
              onChange={() => handleBadgeSelect(badge)}
            />
          </BadgeItem>
        ))}
      </BadgeList>
    </BadgeContainer>
  );
};

export default BadgeSelector;
