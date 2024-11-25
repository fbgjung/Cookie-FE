import styled from "styled-components";

const BarContainer = styled.div`
  width: 80%;
  max-width: 1000px;
  height: 30px;
  background-color: #d9d9d9;
  border-radius: 15px;
  margin-top: 50px;
  position: relative;
  display: flex;
  align-items: center;
`;

const FilledBar = styled.div`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background-color: #1ee5b0;
  border-radius: 15px;
  transition: width 0.5s ease;
`;

const PercentageBubble = styled.div`
  position: absolute;
  top: -40px;
  left: ${(props) => props.percentage}%;
  transform: translateX(-50%);
  background-color: #1ee5b0;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #1ee5b0;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const ProgressBar = ({ movie1Likes, movie2Likes }) => {
  const totalVotes = movie1Likes + movie2Likes;
  const percentage =
    totalVotes > 0 ? Math.round((movie1Likes / totalVotes) * 100) : 50;

  return (
    <BarContainer>
      <FilledBar percentage={percentage} />
      <PercentageBubble percentage={percentage}>
        <Icon src="/src/assets/images/matchup/ic_fight.svg" alt="Fight Icon" />
        {percentage}%
      </PercentageBubble>
    </BarContainer>
  );
};

export default ProgressBar;
