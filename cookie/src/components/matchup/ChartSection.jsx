import { useState } from "react";
import styled from "styled-components";
import RadarChart from "./RadarChart";

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 20px;
`;

const SelectButton = styled.button`
  background-color: ${(props) => (props.active ? "#1ee5b0" : "#d9d9d9")};
  color: ${(props) => (props.active ? "#ffffff" : "#333333")};
  border: none;
  border-radius: 5px;
  padding: 10px 98px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#17c397" : "#c4c4c4")};
  }
`;

const ChartContainer = styled.div`
  display: flex;
  gap: 40px;
`;

const ChartLabel = styled.div`
  color: #ffffff;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 10px;
`;

const ChartSection = () => {
  const [selectedMovie, setSelectedMovie] = useState("올드보이");

  const radarData = {
    올드보이: {
      labels: [
        "감독 연출",
        "배우 연기",
        "음악",
        "스토리",
        "영상미",
        "영상미",
        "영상미",
      ],
      매력포인트: [8, 9, 7, 8.5, 9],
      감정포인트: [7.5, 8, 7, 8, 8.5],
    },
    복수는나의것: {
      labels: ["감독 연출", "배우 연기", "음악", "스토리", "영상미"],
      매력포인트: [7, 8, 7.5, 7, 8],
      감정포인트: [8, 7.5, 7, 7.5, 7],
    },
  };

  const currentData = radarData[selectedMovie];

  return (
    <SectionContainer>
      <ButtonContainer>
        <SelectButton
          active={selectedMovie === "올드보이"}
          onClick={() => setSelectedMovie("올드보이")}
        >
          올드보이
        </SelectButton>
        <SelectButton
          active={selectedMovie === "복수는나의것"}
          onClick={() => setSelectedMovie("복수는나의것")}
        >
          복수는 나의 것
        </SelectButton>
      </ButtonContainer>
      <ChartContainer>
        <div>
          <RadarChart
            labels={currentData.labels}
            data={currentData.매력포인트}
            backgroundColor="rgba(138, 43, 226, 0.5)"
            borderColor="rgba(138, 43, 226, 1)"
          />
          <ChartLabel>매력 포인트</ChartLabel>
        </div>
        <div>
          <RadarChart
            labels={currentData.labels}
            data={currentData.감정포인트}
            backgroundColor="rgba(34, 193, 195, 0.5)"
            borderColor="rgba(34, 193, 195, 1)"
          />
          <ChartLabel>감정 포인트</ChartLabel>
        </div>
      </ChartContainer>
    </SectionContainer>
  );
};

export default ChartSection;
