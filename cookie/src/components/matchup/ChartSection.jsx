import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 540px;
  margin-bottom: 20px;
`;

const SelectButton = styled.button`
  flex: 1;
  background-color: ${(props) => (props.active ? "#1ee5b0" : "#d9d9d9")};
  color: ${(props) => (props.active ? "#ffffff" : "#333333")};
  border: none;
  border-radius: 5px;
  padding: 10px 0;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#17c397" : "#c4c4c4")};
  }

  &:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const ChartContainer = styled.div`
  display: flex;
`;

const ChartWrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const ChartLabel = styled.div`
  color: #ffffff;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 10px;
`;

const ChartSection = ({ movie1, movie2 }) => {
  const [selectedMovie, setSelectedMovie] = useState(movie1.movieTitle);

  const formatData = (data) => {
    return Object.keys(data).map((key) => ({
      subject: key,
      value: data[key],
    }));
  };

  const charmData =
    selectedMovie === movie1.movieTitle
      ? formatData(movie1.charmPoint)
      : formatData(movie2.charmPoint);

  const emotionData =
    selectedMovie === movie1.movieTitle
      ? formatData(movie1.emotionPoint)
      : formatData(movie2.emotionPoint);

  return (
    <SectionContainer>
      <ButtonContainer>
        <SelectButton
          active={selectedMovie === movie1.movieTitle}
          onClick={() => setSelectedMovie(movie1.movieTitle)}
        >
          {movie1.movieTitle}
        </SelectButton>
        <SelectButton
          active={selectedMovie === movie2.movieTitle}
          onClick={() => setSelectedMovie(movie2.movieTitle)}
        >
          {movie2.movieTitle}
        </SelectButton>
      </ButtonContainer>
      <ChartContainer>
        <div>
          <ChartWrapper>
            <RadarChart
              width={300}
              height={300}
              data={charmData}
              margin={{ top: 30, right: 30, bottom: 20, left: 30 }}
            >
              <PolarGrid stroke="#ffffff" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#ffffff", fontSize: 10 }}
              />
              <PolarRadiusAxis
                angle={38}
                domain={[0, 100]}
                tick={{ fill: "#ffffff" }}
              />
              <Radar
                name="매력포인트"
                dataKey="value"
                stroke="rgba(138, 43, 226, 1)"
                fill="rgba(138, 43, 226, 0.5)"
                strokeWidth={2}
              />
            </RadarChart>
          </ChartWrapper>
          <ChartLabel>매력 포인트</ChartLabel>
        </div>
        <div>
          <ChartWrapper>
            <RadarChart
              width={300}
              height={300}
              data={emotionData}
              margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
            >
              <PolarGrid stroke="#ffffff" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#ffffff", fontSize: 10 }}
              />
              <PolarRadiusAxis
                angle={38}
                domain={[0, 100]}
                tick={{ fill: "#ffffff" }}
              />
              <Radar
                name="감정포인트"
                dataKey="value"
                stroke="rgba(34, 193, 195, 1)"
                fill="rgba(34, 193, 195, 0.5)"
                strokeWidth={2}
              />
            </RadarChart>
          </ChartWrapper>
          <ChartLabel>감정 포인트</ChartLabel>
        </div>
      </ChartContainer>
    </SectionContainer>
  );
};

ChartSection.propTypes = {
  movie1: PropTypes.shape({
    movieTitle: PropTypes.string.isRequired,
    charmPoint: PropTypes.objectOf(PropTypes.number).isRequired,
    emotionPoint: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
  movie2: PropTypes.shape({
    movieTitle: PropTypes.string.isRequired,
    charmPoint: PropTypes.objectOf(PropTypes.number).isRequired,
    emotionPoint: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default ChartSection;
