import styled from "styled-components";

const TimerContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const TimerBox = styled.div`
  background-color: #eafaf5;
  color: #333;
  font-size: 2.5rem;
  font-weight: bold;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const Colon = styled.span`
  font-size: 2.5rem;
  margin-top: 10px;
  font-weight: bold;
  color: #ffffff;
`;

const Timer = ({ timeLeft }) => {
  const { hours, minutes, seconds } = timeLeft;

  return (
    <TimerContainer>
      <TimerBox>{hours.toString().padStart(2, "0")}</TimerBox>
      <Colon>:</Colon>
      <TimerBox>{minutes.toString().padStart(2, "0")}</TimerBox>
      <Colon>:</Colon>
      <TimerBox>{seconds.toString().padStart(2, "0")}</TimerBox>
    </TimerContainer>
  );
};

export default Timer;
