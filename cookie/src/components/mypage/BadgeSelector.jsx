import { useState } from "react";
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

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
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

const BadgeSelector = () => {
  const [selectedBadge, setSelectedBadge] = useState("romance");

  const badges = [
    {
      id: "roomance",
      name: "로맨스 매니아",
      activeSrc: "/src/assets/images/mypage/romancebadge.svg",
      inactiveSrc: "/src/assets/images/mypage/defaultbadge.svg",
    },
    {
      id: "action",
      name: "액션 매니아",
      activeSrc: "/src/assets/images/mypage/actionbadge.svg",
      inactiveSrc: "/src/assets/images/mypage/defaultbadge.svg",
    },
    {
      id: "sf",
      name: "SF 매니아",
      activeSrc: "/src/assets/images/mypage/sfbadge.svg",
      inactiveSrc: "/src/assets/images/mypage/defaultbadge.svg",
    },
    {
      id: "crime",
      name: "범죄 매니아",
      activeSrc: "/src/assets/images/mypage/crimebadge.svg",
      inactiveSrc: "/src/assets/images/mypage/defaultbadge.svg",
    },
    {
      id: "comedy",
      name: "코미디 매니아",
      activeSrc: "/src/assets/images/mypage/comedybadge.svg",
      inactiveSrc: "/src/assets/images/mypage/defaultbadge.svg",
    },

    {
      id: "comedy",
      name: "코미디 매니아",
      activeSrc: "/src/assets/images/mypage/comedybadge.svg",
      inactiveSrc: "/src/assets/images/mypage/defaultbadge.svg",
    },

    {
      id: "comedy",
      name: "코미디 매니아",
      activeSrc: "/src/assets/images/mypage/comedybadge.svg",
      inactiveSrc: "/src/assets/images/mypage/defaultbadge.svg",
    },

    {
      id: "comedy",
      name: "코미디 매니아",
      activeSrc: "/src/assets/images/mypage/comedybadge.svg",
      inactiveSrc: "/src/assets/images/mypage/defaultbadge.svg",
    },

    {
      id: "comedy",
      name: "코미디 매니아",
      activeSrc: "/src/assets/images/mypage/comedybadge.svg",
      inactiveSrc: "/src/assets/images/mypage/defaultbadge.svg",
    },
  ];

  const handleBadgeSelect = (id) => {
    setSelectedBadge(id);
  };

  return (
    <BadgeContainer>
      <BadgeTitle>대표 뱃지 선택</BadgeTitle>
      <BadgeList>
        {badges.map((badge) => (
          <BadgeItem
            key={badge.id}
            isSelected={selectedBadge === badge.id}
            onClick={() => handleBadgeSelect(badge.id)}
          >
            <img
              src={
                selectedBadge === badge.id ? badge.activeSrc : badge.inactiveSrc
              }
              alt={badge.name}
            />
            <span>{badge.name}</span>
            <input
              type="radio"
              name="badge"
              checked={selectedBadge === badge.id}
              onChange={() => handleBadgeSelect(badge.id)}
            />
          </BadgeItem>
        ))}
      </BadgeList>
    </BadgeContainer>
  );
};

export default BadgeSelector;
