import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/auth/axiosInstance";

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000000;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 1rem 2rem 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fdf8fa;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border: 2px solid #f84b99;
    transform: scale(1.05);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 180px;
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
  color: #999999;
  text-align: center;
  margin: 30px 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0 1rem 3rem;
  width: 100%;

  .title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-left: 0.4rem;
    color: #f84b99;
  }
`;

const PrevIcon = styled.svg`
  width: 32px;
  height: 32px;
  background: no-repeat center/cover url("/assets/images/prev-button.svg");
  cursor: pointer;
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;
const CommentIcon = styled.svg`
  margin-left: 0.5rem;
  width: 14px;
  height: 14px;
  background: no-repeat center/cover
    url("/assets/images/review/comment-review-feed.svg");
`;

const LikedMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

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

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const onBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <HeaderContainer>
        <PrevIcon onClick={onBack}></PrevIcon>
        <span className="title">내가 좋아한 영화</span>
      </HeaderContainer>
      {movies.length > 0 ? (
        <MoviesGrid>
          {movies.map((movie, index) => (
            <MovieCard key={index} onClick={() => handleMovieClick(movie.id)}>
              <Poster src={movie.poster} alt={movie.title} />
              <MovieInfo>
                <h2>{movie.title}</h2>
                <p>{movie.releasedAt}</p>
                <CommentSection>
                  <CommentIcon />
                  <p>{movie.reviews}</p>
                </CommentSection>
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
