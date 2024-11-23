import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TitleSection from "../components/matchup/TitleSection";
import Timer from "../components/matchup/Timer";
import PosterList from "../components/matchup/PosterList";
import ProgressBar from "../components/matchup/ProgressBar";
import ChartSection from "../components/matchup/ChartSection";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #04012d;
  color: #ffffff;
  font-family: "Arial", sans-serif;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const MatchupPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [percentage, setPercentage] = useState(50);

  useEffect(() => {
    const targetDate = new Date("2024-11-28T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        hours: hours >= 0 ? hours : 0,
        minutes: minutes >= 0 ? minutes : 0,
        seconds: seconds >= 0 ? seconds : 0,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const posters = [
    { src: "/src/assets/images/matchup/sampleimage1.svg" },
    { src: "/src/assets/images/matchup/sampleimage2.svg" },
  ];

  return (
    <Container>
      <TitleSection />
      <Timer timeLeft={timeLeft} />
      <PosterList posters={posters} />
      <ProgressBar percentage={percentage} />
      <ChartSection />
    </Container>
  );
};

export default MatchupPage;
