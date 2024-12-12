import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/auth/axiosInstance";

const Container = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: 조ㅑㅅ;
  min-height: 100vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const BackButton = styled.img`
  position: absolute;
  top: 20px;
  left: 5%;
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 30px 0 20px;
  color: black;
  text-align: center;
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

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
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

  &:hover {
    border-color: #33efff;
    transform: scale(1.05);
    border: 2px solid black;
    border-radius: 10px;
    transition: all 0.3s ease;
  }
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
    margin: 8px 0 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  p {
    font-size: 0.8rem;
    color: #666;
    margin: 3px 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    @media (max-width: 768px) {
      font-size: 0.75rem;
    }
  }
`;

const EmptyMessage = styled.div`
  font-size: 1rem;
  color: #ffffff;
  text-align: center;
  margin: 30px 0;
`;

const LikedMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const fetchLikedMovies = async () => {
    try {
      const response = await axiosInstance.get("/api/users/likedMovieList");
      const fetchedMovies = response.data.response.movies || [];
      setMovies(fetchedMovies);
    } catch (error) {
      console.error("좋아하는 영화 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchLikedMovies();
  }, []);

  return (
    <Container>
      <BackButton
        src="/assets/images/mypage/ic_back.svg"
        alt="뒤로가기"
        onClick={handleBackClick}
      />
      <Title>좋아하는 영화</Title>
      <HeartIcon src="/assets/images/mypage/red-heart.svg" alt="하트" />

      {movies.length > 0 ? (
        <MoviesGrid>
          {movies.map((movie, index) => (
            <MovieCard key={index}>
              <Poster src={movie.poster} alt={movie.title} />
              <MovieInfo>
                <h2>{movie.title}</h2>
                <p>출시일: {movie.releasedAt}</p>
                <p>리뷰 수: {movie.reviews}</p>
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
