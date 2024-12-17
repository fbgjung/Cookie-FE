import { useEffect, useState } from "react";
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
  color: #f84b99;
  text-align: left;
  width: 100%;
  margin: 3rem 0 1rem 6rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-left: 4.2rem;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-left: 3rem;
    margin-bottom: 0.5rem;
  }
`;

const BadgeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: white;
  border: 1px solid #f84b99;
  border-radius: 12px;
  padding: 60px;
  width: 100%;
  max-width: 480px;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 40px;
    max-width: 400px;
    gap: 15px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    max-width: 320px;
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
    text-align: center;

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

const EmptyMessage = styled.div`
  font-size: 1rem;
  color: #666;
  text-align: center;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const BadgeSelector = ({ badges, selectedBadge, onBadgeChange }) => {
  const getInitialBadge = () => {
    const mainBadge = badges.find((badge) => badge.main);
    return mainBadge ? mainBadge.name : badges[0]?.name || "";
  };

  const [currentSelectedBadge, setCurrentSelectedBadge] = useState("");

  useEffect(() => {
    if (badges.length > 0) {
      const initialBadge = getInitialBadge();
      setCurrentSelectedBadge(initialBadge);
      onBadgeChange(badges, initialBadge);
    }
  }, [badges, onBadgeChange]);

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
        {badges.length > 0 ? (
          badges.map((badge) => (
            <BadgeItem
              key={badge.name}
              isSelected={currentSelectedBadge === badge.name}
              onClick={() => handleBadgeSelect(badge)}
            >
              <img src={badge.badgeImage} alt={badge.name} />
              <span>{badge.name}</span>
              <input
                type="radio"
                name="badge"
                checked={currentSelectedBadge === badge.name}
                onChange={() => handleBadgeSelect(badge)}
              />
            </BadgeItem>
          ))
        ) : (
          <EmptyMessage>뱃지가 없습니다.</EmptyMessage>
        )}
      </BadgeList>
    </BadgeContainer>
  );
};

export default BadgeSelector;
