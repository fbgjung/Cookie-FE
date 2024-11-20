import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Container = styled.div`
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  min-height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

const BackButton = styled.img`
  position: absolute;
  top: 90px;
  left: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 60px 0 10px 0;
  color: #04012d;
`;

const HeartIcon = styled.img`
  width: 55px;
  height: 55px;
  margin-bottom: 20px;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 0 20px 30px;
  box-sizing: border-box;
`;

const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
`;

const Poster = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const MovieInfo = styled.div`
  padding: 10px;
  text-align: center;

  h2 {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    margin: 10px 0 5px;
  }

  p {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
  }

  .reviews {
    font-size: 0.8rem;
    color: #666;
    margin-top: 5px;
  }

  .likes {
    font-size: 0.8rem;
    color: #666;
    margin-top: 2px;
  }
`;

const movies = [
  {
    id: 1,
    title: "글래디에이터",
    year: "2024",
    country: "미국",
    poster: "/src/assets/images/movies/gladiator.jpg",
    reviews: 100,
    likes: 1978,
  },
  {
    id: 2,
    title: "위키드",
    year: "2024",
    country: "미국",
    poster: "/src/assets/images/movies/wicked.jpg",
    reviews: 120,
    likes: 1503,
  },
  {
    id: 3,
    title: "청설",
    year: "2024",
    country: "한국",
    poster: "/src/assets/images/movies/chungseol.jpg",
    reviews: 80,
    likes: 1120,
  },
  {
    id: 4,
    title: "히든 페이스",
    year: "2024",
    country: "미국",
    poster: "/src/assets/images/movies/hiddenface.jpg",
    reviews: 50,
    likes: 800,
  },
];

const LikedMovies = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <Container>
        <BackButton
          src="/src/assets/images/mypage/ic_back.svg"
          alt="Back"
          onClick={handleBackClick}
        />
        <Title>좋아하는 영화</Title>
        <HeartIcon
          src="/src/assets/images/mypage/red-heart.svg"
          alt="Heart Icon"
        />
        <MoviesGrid>
          {movies.map((movie) => (
            <MovieCard key={movie.id}>
              <Poster src={movie.poster} alt={movie.title} />
              <MovieInfo>
                <h2>{movie.title}</h2>
                <p>
                  {movie.year} {movie.country}
                </p>
                <div className="reviews">리뷰 {movie.reviews}개</div>
                <div className="likes">좋아요 {movie.likes}개</div>
              </MovieInfo>
            </MovieCard>
          ))}
        </MoviesGrid>
      </Container>
    </>
  );
};

export default LikedMovies;
