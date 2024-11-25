import styled from "styled-components";
import PropTypes from "prop-types";

const BarContainer = styled.div`
  width: 90%;
  max-width: 1000px;
  height: 30px;
  background-color: #d9d9d9;
  border-radius: 15px;
  margin-top: 50px;
  position: relative;
  display: flex;
  align-items: center;
`;

const FilledBarLeft = styled.div`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background-color: #1ee5b0;
  border-radius: 15px 0 0 15px;
  transition: width 0.5s ease;
`;

const FilledBarRight = styled.div`
  height: 100%;
  width: ${(props) => 100 - props.percentage}%;
  background-color: #ff6b6b;
  border-radius: 0 15px 15px 0;
  transition: width 0.5s ease;
`;

const PercentageBubble = styled.div`
  position: absolute;
  top: -40px;
  left: ${(props) =>
    props.isLeftWinning ? props.percentage : 100 - props.percentage}%;
  transform: translateX(-50%);
  background-color: ${(props) => (props.isLeftWinning ? "#1ee5b0" : "#ff6b6b")};
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
    border-top: 10px solid
      ${(props) => (props.isLeftWinning ? "#1ee5b0" : "#ff6b6b")};
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
  const isLeftWinning = percentage >= 50;

  return (
    <BarContainer>
      <FilledBarLeft percentage={percentage} />
      <FilledBarRight percentage={percentage} />
      <PercentageBubble isLeftWinning={isLeftWinning} percentage={percentage}>
        <Icon src="/src/assets/images/matchup/ic_fight.svg" alt="Fight Icon" />
        {isLeftWinning ? percentage : 100 - percentage}%
      </PercentageBubble>
    </BarContainer>
  );
};

ProgressBar.propTypes = {
  movie1Likes: PropTypes.number.isRequired,
  movie2Likes: PropTypes.number.isRequired,
};

export default ProgressBar;
