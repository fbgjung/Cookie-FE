import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import axiosInstance from "../api/auth/axiosInstance";

const Container = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  min-height: 100vh;
  max-width: 800px;
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
  left: -90%;
  width: 24px;
  height: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 20px;
    left: -140px;
    height: 20px;
  }

  @media (max-width: 480px) {
    left: -90px;
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
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  padding: 0 20px 30px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
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
`;

const EmptyMessage = styled.div`
  font-size: 1rem;
  color: #999;
  text-align: center;
  margin: 30px 0;
`;

const LikedMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const handleBackClick = () => {
    navigate(-1);
  };

  const fetchLikedMovies = async () => {
    if (loading || page > totalPages) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get("/api/users/likedMovieList", {
        params: { page: page - 1, size: 10 },
      });

      const { movies = [], totalPages = 1 } = response.data.response || {};

      const newMovies = movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster || "/src/assets/images/default-poster.jpg",
        releasedAt: new Date(movie.releasedAt).toLocaleDateString(),
        country: movie.country || "미상",
        likes: movie.likes || 0,
        reviews: movie.reviews || 0,
      }));

      setMovies((prev) => [...prev, ...newMovies]);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("API 요청 실패:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, page, totalPages]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchLikedMovies();
  }, [page]);

  return (
    <Container>
      <BackButton
        src="/src/assets/images/mypage/ic_back.svg"
        alt="뒤로가기"
        onClick={handleBackClick}
      />
      <Title>좋아하는 영화</Title>
      <HeartIcon src="/src/assets/images/mypage/red-heart.svg" alt="하트" />
      {movies.length > 0 ? (
        <MoviesGrid>
          {movies.map((movie, index) => (
            <MovieCard
              ref={movies.length === index + 1 ? lastMovieRef : null}
              key={movie.id}
            >
              <Poster src={movie.poster} alt={movie.title} />
              <MovieInfo>
                <h2>{movie.title}</h2>
                <p>출시일: {movie.releasedAt}</p>
                <p>국가: {movie.country}</p>
                <p>좋아요: {movie.likes}</p>
                <p>리뷰: {movie.reviews}</p>
              </MovieInfo>
            </MovieCard>
          ))}
        </MoviesGrid>
      ) : (
        <EmptyMessage>좋아하는 영화를 선택해보세요!</EmptyMessage>
      )}
    </Container>
  );
};

export default LikedMovies;
