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

// 스타일 정의
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 540px;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    max-width: 86%;
  }

  @media (max-width: 480px) {
    max-width: 90%;
    margin-bottom: 15px;
  }
`;

const SelectButton = styled.button`
  flex: 1;
  background-color: ${(props) =>
    props.active ? props.activeColor : "#ffffff"};
  color: ${(props) => (props.active ? "#ffffff" : "#333333")};
  border: none;
  border-radius: 5px;
  padding: 10px 0;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  margin: 0;

  &:hover {
    background-color: ${(props) => props.hoverColor};
    color: #ffffff;
  }

  @media (max-width: 1024px) {
    font-size: 0.9rem;
    padding: 8px 0;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 8px 0;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px 0;
  }
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 10px;

  @media (max-width: 480px) {
    justify-content: flex-start;
  }
`;

const ChartWrapper = styled.div`
  background: transparent;
  border-radius: 10px;
  padding: 10px;

  @media (max-width: 768px) {
    padding: 5px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 8px;
  }
`;

const ChartLabel = styled.div`
  color: #ffffff;
  font-size: 1rem;
  text-align: center;
  margin-top: -20px;

  @media (max-width: 480px) {
    font-size: 1rem;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 1.1rem;
  }
`;

// ChartSection 컴포넌트 정의
const ChartSection = ({ movie1, movie2 }) => {
  const [selectedMovie, setSelectedMovie] = useState(movie1.movieTitle);

  // subject 매핑 객체
  const mapSubjectNames = {
    ost: "OST",
    direction: "감독연출",
    story: "스토리",
    dialogue: "대사",
    visual: "영상미",
    acting: "배우연기",
    specialEffect: "특수효과",
  };

  const mapEmotionNames = {
    touching: "감동",
    angry: "분노",
    joy: "즐거움",
    immersion: "몰입감",
    excited: "설렘",
    empathy: "공감",
    tension: "긴장감",
  };

  // 데이터 포맷 함수
  const formatData = (data, map) =>
    Object.keys(data).map((key) => ({
      subject: map[key] || key,
      value: data[key],
    }));

  // 데이터 포맷 적용
  const charmData =
    selectedMovie === movie1.movieTitle
      ? formatData(movie1.charmPoint, mapSubjectNames)
      : formatData(movie2.charmPoint, mapSubjectNames);

  const emotionData =
    selectedMovie === movie1.movieTitle
      ? formatData(movie1.emotionPoint, mapEmotionNames)
      : formatData(movie2.emotionPoint, mapEmotionNames);

  console.log("현재 선택된 영화:", selectedMovie);
  console.log("매력 포인트 데이터:", charmData);
  console.log("감정 포인트 데이터:", emotionData);

  const chartSize =
    window.innerWidth <= 480 ? 200 : window.innerWidth <= 1024 ? 250 : 300;

  const isMovie1Selected = selectedMovie === movie1.movieTitle;
  const chartColorLeft = isMovie1Selected ? "#E50914" : "#006400";
  const chartColorRight = isMovie1Selected ? "#E50914" : "#006400";

  return (
    <SectionContainer>
      <ButtonContainer>
        <SelectButton
          active={isMovie1Selected}
          activeColor="#E50914"
          hoverColor="#E50914"
          onClick={() => setSelectedMovie(movie1.movieTitle)}
        >
          {movie1.movieTitle}
        </SelectButton>
        <SelectButton
          active={!isMovie1Selected}
          activeColor="#006400"
          hoverColor="#006400"
          onClick={() => setSelectedMovie(movie2.movieTitle)}
        >
          {movie2.movieTitle}
        </SelectButton>
      </ButtonContainer>

      <ChartContainer>
        <div>
          <ChartWrapper>
            <RadarChart
              width={chartSize}
              height={chartSize}
              data={emotionData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <PolarGrid stroke="#ffffff" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fill: "#ffffff",
                  fontSize: chartSize <= 200 ? 8 : 10,
                }}
              />
              <PolarRadiusAxis
                angle={38}
                domain={[0, 100]}
                tick={{
                  fill: "#ffffff",
                  fontSize: chartSize <= 200 ? 8 : 10,
                }}
              />
              <Radar
                name="감정포인트"
                dataKey="value"
                stroke={chartColorLeft}
                fill={`${chartColorLeft}80`}
                strokeWidth={2}
              />
            </RadarChart>
          </ChartWrapper>
          <ChartLabel>감정 포인트</ChartLabel>
        </div>

        <div>
          <ChartWrapper>
            <RadarChart
              width={chartSize}
              height={chartSize}
              data={charmData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <PolarGrid stroke="#ffffff" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fill: "#ffffff",
                  fontSize: chartSize <= 200 ? 8 : 10,
                }}
              />
              <PolarRadiusAxis
                angle={38}
                domain={[0, 100]}
                tick={{
                  fill: "#ffffff",
                  fontSize: chartSize <= 200 ? 8 : 10,
                }}
              />
              <Radar
                name="매력포인트"
                dataKey="value"
                stroke={chartColorRight}
                fill={`${chartColorRight}80`}
                strokeWidth={2}
              />
            </RadarChart>
          </ChartWrapper>
          <ChartLabel>매력 포인트</ChartLabel>
        </div>
      </ChartContainer>
    </SectionContainer>
  );
};

// PropTypes 설정
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
