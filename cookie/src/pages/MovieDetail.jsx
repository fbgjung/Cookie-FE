import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 70px 20px;
  background-color: #f9f9f9;
`;

const MovieHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 100%;
    border-radius: 10px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
    font-weight: bold;
  }

  p {
    font-size: 14px;
    color: #555;
  }
`;

const Section = styled.div`
  margin-bottom: 30px;

  h2 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    line-height: 1.5;
    color: #333;
  }
`;

const MovieDetail = () => {
  const { id } = useParams();

  // 영화 데이터를 임시로 하드코딩 (추후 API로 교체 가능)
  const movie = {
    id,
    title: `랜덤 영화 ${id}`,
    year: 2023,
    genre: "드라마",
    duration: "2시간 15분",
    description: "영화 줄거리가 여기에 들어갑니다.",
    imageUrl: `https://via.placeholder.com/600x300?text=영화+${id}`,
  };

  return (
    <>
      <Header />
      <Container>
        <MovieHeader>
          <img src={movie.imageUrl} alt={movie.title} />
          <h1>{movie.title}</h1>
          <p>{`${movie.year} · ${movie.genre} · ${movie.duration}`}</p>
        </MovieHeader>
        <Section>
          <h2>줄거리</h2>
          <p>{movie.description}</p>
        </Section>
        <Section>
          <h2>출연/제작</h2>
          <p>출연자 및 제작자 정보가 여기에 들어갑니다.</p>
        </Section>
        <Section>
          <h2>리뷰</h2>
          <p>리뷰 내용이 여기에 들어갑니다.</p>
        </Section>
      </Container>
      <Navbar />
    </>
  );
};

export default MovieDetail;
