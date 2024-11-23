import styled from "styled-components";
import TopicImage from "/src/assets/images/matchup/topic_image.svg";

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 20px;
`;

const TitleImage = styled.img`
  width: 40px;
  height: 40px;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
`;

const DDay = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #1ee5b0;
`;

const TitleSection = () => (
  <TitleContainer>
    <TitleImage src={TopicImage} alt="Topic Icon" />
    <Title>박찬욱 감독의 복수 3부작 빅매치</Title>
    <DDay>D-Day 5</DDay>
  </TitleContainer>
);

export default TitleSection;
