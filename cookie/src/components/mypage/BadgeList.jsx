import styled from "styled-components";

const BadgeSection = styled.div`
  text-align: center;
  margin-top: 120px;
  background-color: #f8f8f8;
  padding: 10px 20px;
  border-radius: 16px;
`;

const BadgeTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #333;
  font-weight: 500;
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;

  overflow-x: auto;
  padding: 0 10px;
`;

const BadgeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  background-color: ${(props) => props.bgColor || "#fff"};
  border-radius: 10px;
  padding: 10px;
  position: relative;
  text-align: center;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 10%;
    right: -8px;
    height: 80%;
    border-right: 1px solid #ddd;
  }
`;

const BadgeImage = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
`;

const BadgeLabel = styled.span`
  font-size: 0.9rem;
  color: ${(props) => props.color || "#333"};
`;

const BadgeList = ({ title, badges }) => {
  return (
    <BadgeSection>
      <BadgeTitle>{title}</BadgeTitle>
      <BadgeContainer>
        {badges.map((badge, index) => (
          <BadgeItem key={index} bgColor={badge.bgColor}>
            <BadgeImage src={badge.image} alt={`${badge.label} Badge`} />
            <BadgeLabel color={badge.textColor}>{badge.label}</BadgeLabel>
          </BadgeItem>
        ))}
      </BadgeContainer>
    </BadgeSection>
  );
};

export default BadgeList;
