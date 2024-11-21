import styled from "styled-components";
import { useParams } from "react-router-dom";
import HeaderSection from "../components/movieDetailPage/HeaderSection";
import DetailsSection from "../components/movieDetailPage/DetailsSection";
import CastSection from "../components/movieDetailPage/CastSection";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  background-color: #f9f9f9;
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 70px 15px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 10px;

  padding: 20px;
  box-sizing: border-box;
`;

const MovieDetail = () => {
  const { id } = useParams();

  const movie = {
    id,
    title: "소년시절의 너",
    year: "2019",
    genre: "범죄/가족/드라마/로맨스",
    country: "중국, 홍콩",
    duration: "2시간 15분",
    rating: "15세",
    description:
      "시험만 잘 치면 멋진 인생을 살 수 있다고 가르치는 세상에서 기댈 곳 없이 세상에 내몰린 우등생 소녀 ‘첸니엔’과 양아치 소년 ‘베이’...",
    posterUrl: "https://via.placeholder.com/120x160?text=포스터",
    stillCuts: [
      "https://via.placeholder.com/600x300?text=스틸컷+1",
      "https://via.placeholder.com/600x300?text=스틸컷+2",
      "https://via.placeholder.com/600x300?text=스틸컷+3",
    ],
    keywords: ["로맨스", "범죄", "실화를 소재로 한", "포근한 가을"],
    cast: [
      { name: "중국상", role: "감독", img: "https://via.placeholder.com/70" },
      { name: "홍콩현", role: "배우", img: "https://via.placeholder.com/70" },
      { name: "첸니엔", role: "배우", img: "https://via.placeholder.com/70" },
      { name: "베이", role: "배우", img: "https://via.placeholder.com/70" },
      { name: "천위안", role: "배우", img: "https://via.placeholder.com/70" },
    ],
  };

  return (
    <Container>
      <ContentWrapper>
        <HeaderSection {...movie} />
        <DetailsSection
          posterUrl={movie.posterUrl}
          keywords={movie.keywords}
          description={movie.description}
        />
        <CastSection cast={movie.cast} />
      </ContentWrapper>
    </Container>
  );
};

export default MovieDetail;