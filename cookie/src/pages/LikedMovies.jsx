import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  min-height: 100vh;
  max-width: 800px; /* 더 넓은 화면 대응 */
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    padding-top: 15px;
    max-width: 90%;
  }
`;

const BackButton = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 50px 0 10px;
  color: #04012d;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 40px 0 8px;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin: 30px 0 5px;
  }
`;

const HeartIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    margin-bottom: 15px;
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 기본 4열 */
  gap: 20px;
  width: 100%;
  padding: 0 20px 30px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* 태블릿 화면에서 3열 */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 모바일 화면에서 2열 */
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 작은 화면에서는 1열 */
    gap: 10px;
  }
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

  @media (max-width: 768px) {
    height: 180px;
  }

  @media (max-width: 480px) {
    height: 150px;
  }
`;

const MovieInfo = styled.div`
  padding: 10px;
  text-align: center;

  h2 {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    margin: 10px 0 5px;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }

  p {
    font-size: 0.9rem;
    color: #666;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }

    @media (max-width: 480px) {
      font-size: 0.7rem;
    }
  }

  .reviews,
  .likes {
    font-size: 0.8rem;
    margin-top: 5px;

    @media (max-width: 768px) {
      font-size: 0.7rem;
    }

    @media (max-width: 480px) {
      font-size: 0.6rem;
    }
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

  {
    id: 4,
    title: "히든 페이스",
    year: "2024",
    country: "미국",
    poster: "/src/assets/images/movies/hiddenface.jpg",
    reviews: 50,
    likes: 800,
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

  {
    id: 4,
    title: "히든 페이스",
    year: "2024",
    country: "미국",
    poster: "/src/assets/images/movies/hiddenface.jpg",
    reviews: 50,
    likes: 800,
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

  {
    id: 4,
    title: "히든 페이스",
    year: "2024",
    country: "미국",
    poster: "/src/assets/images/movies/hiddenface.jpg",
    reviews: 50,
    likes: 800,
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
    <Container>
      <BackButton
        src="/src/assets/images/mypage/ic_back.svg"
        alt="뒤로가기"
        onClick={handleBackClick}
      />
      <Title>좋아하는 영화</Title>
      <HeartIcon src="/src/assets/images/mypage/red-heart.svg" alt="하트" />
      <MoviesGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id}>
            <Poster src={movie.poster} alt={movie.title} />
            <MovieInfo>
              <h2>{movie.title}</h2>
              <p>
                {movie.year} {movie.country}
              </p>
              <p className="reviews">리뷰 {movie.reviews}개</p>
              <p className="likes">좋아요 {movie.likes}개</p>
            </MovieInfo>
          </MovieCard>
        ))}
      </MoviesGrid>
    </Container>
  );
};

export default LikedMovies;
