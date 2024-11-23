import { useState, useEffect } from "react";
import styled from "styled-components";

const TimerContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const TimerBox = styled.div`
  background-color: #c4ffef;
  color: #333;
  font-size: 2.5rem;
  font-weight: bold;
  width: 73px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const Colon = styled.span`
  font-size: 2.5rem;
  margin-top: 15px;
  font-weight: bold;
  color: #ffffff;
`;

const Timer = ({ startAt, endAt }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(endAt);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        hours: hours >= 0 ? hours : 0,
        minutes: minutes >= 0 ? minutes : 0,
        seconds: seconds >= 0 ? seconds : 0,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [endAt]);

  const splitDigits = (value) => value.toString().padStart(2, "0").split("");

  const [h1, h2] = splitDigits(timeLeft.hours);
  const [m1, m2] = splitDigits(timeLeft.minutes);
  const [s1, s2] = splitDigits(timeLeft.seconds);

  return (
    <TimerContainer>
      <TimerBox>{h1}</TimerBox>
      <TimerBox>{h2}</TimerBox>
      <Colon>:</Colon>
      <TimerBox>{m1}</TimerBox>
      <TimerBox>{m2}</TimerBox>
      <Colon>:</Colon>
      <TimerBox>{s1}</TimerBox>
      <TimerBox>{s2}</TimerBox>
    </TimerContainer>
  );
};

export default Timer;
