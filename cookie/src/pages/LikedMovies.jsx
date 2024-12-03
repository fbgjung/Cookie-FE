import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import axiosInstance from "../api/auth/axiosInstance";

const Container = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    padding-top: 30px;
    max-width: 90%;
  }
`;

const BackButton = styled.img`
  position: absolute;
  top: 5%;
  left: -85%;
  width: 24px;
  height: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    top: 4%;
    left: -60%;
    width: 20px;
    height: 20px;
  }

  @media (max-width: 480px) {
    top: 4%;
    left: -40%;
    width: 18px;
    height: 18px;
  }

  @media (max-width: 360px) {
    top: 2%;
    left: -20%;
    width: 16px;
    height: 16px;
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

  .runtime,
  .score {
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
      console.log("Fetching liked movies with params:", {
        page: page - 1,
        size: 10,
      });

      const response = await axiosInstance.get("/api/users/likedMovieList", {
        params: {
          page: page - 1,
          size: 10,
        },
      });

      console.log("Response:", response.data);

      const { reviews, totalPages } = response.data.response;

      const newMovies = reviews.map((review) => ({
        id: review.reviewId,
        title: review.movie.title,
        poster: review.movie.poster,
        runtime: review.movie.runtime,
        score: review.movieScore,
        releasedAt: review.createdAt,
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

    // 데이터 로딩
    fetchLikedMovies();
  }, []);

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
          {movies.map((movie, index) => {
            if (movies.length === index + 1) {
              return (
                <MovieCard ref={lastMovieRef} key={movie.id}>
                  <Poster src={movie.poster} alt={movie.title} />
                  <MovieInfo>
                    <h2>{movie.title}</h2>
                    <p>작성일: {movie.releasedAt}</p>
                    <p className="runtime">평점: {movie.score.toFixed(1)}</p>
                  </MovieInfo>
                </MovieCard>
              );
            } else {
              return (
                <MovieCard key={movie.id}>
                  <Poster src={movie.poster} alt={movie.title} />
                  <MovieInfo>
                    <h2>{movie.title}</h2>
                    <p>작성일: {movie.releasedAt}</p>
                    <p className="runtime">평점: {movie.score.toFixed(1)}</p>
                  </MovieInfo>
                </MovieCard>
              );
            }
          })}
        </MoviesGrid>
      ) : (
        <EmptyMessage>좋아하는 영화를 선택해보세요!</EmptyMessage>
      )}
    </Container>
  );
};

export default LikedMovies;
