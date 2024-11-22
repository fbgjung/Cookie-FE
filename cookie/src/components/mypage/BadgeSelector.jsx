import React, { useEffect, useState } from "react";
import styled from "styled-components";

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const BadgeTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: left;
  width: 100%;
  max-width: 450px;
`;

const BadgeList = styled.div`
  display: flex;
  align-items: center;
  background-color: #f4f4f4;
  border-radius: 12px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
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
  }

  span {
    font-size: 0.9rem;
    color: ${(props) => (props.isSelected ? "#f05454" : "#000")};
    font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  }

  input {
    margin-top: 5px;
    accent-color: #f05454;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const BadgeSelector = ({ badges, selectedBadge, onBadgeChange }) => {
  const [currentSelectedBadge, setCurrentSelectedBadge] = useState(selectedBadge);

  useEffect(() => {
    setCurrentSelectedBadge(selectedBadge); // 초기값 설정
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