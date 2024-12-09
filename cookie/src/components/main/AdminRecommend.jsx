import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/auth/axiosInstance";

function AdminRecommend() {
  const navigate = useNavigate();
  const [recommendMovies, setRecommendMovies] = useState([]);

  useEffect(() => {
    const fetchMainPageMovies = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/movies/mainAdminRecommend`
        );
        const recommendMovies = response.data.response;
        setRecommendMovies(recommendMovies);
      } catch (error) {
        console.error("API 호출 오류 발생:", error);
      }
    };

    fetchMainPageMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      <MovieRecommendList>
        <Title>쿠키 추천 영화</Title>
        <div className="recommend__movie">
          {recommendMovies.map((movie, index) => (
            <div key={index} className="recommend__movie--info">
              <div onClick={() => handleMovieClick(movie.id)} style={{ cursor: "pointer" }}>
                <Poster src={movie.poster} alt={movie.title} />
                <MovieInfo>
                  <Review>
                    <ReviewIcon alt="Review Icon"/>
                    <Count>{movie.reviews}</Count>
                  </Review>
                  <Like>
                    <LikeIcon alt="Review Icon"/>
                    <Count>{movie.likes}</Count>
                  </Like>
                </MovieInfo>
              </div>
            </div>
          ))}
        </div>
      </MovieRecommendList>
    </>
  );
}

export default AdminRecommend;

const MovieRecommendList = styled.div`
  .recommend__movie {
    display: flex;
    flex-direction: row;
    align-items: start;
    overflow-x: auto;
  }
`;

const Title  = styled.h2`
  color: var(--text-wh);
  padding: 2rem 0 0 0.375rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

const Review = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.375rem;
`

const ReviewIcon = styled.svg`
  width: 14px;
  height: 14px;
  background: no-repeat center/cover url('/assets/images/main/review.svg');
`

const Count = styled.p`
  font-size: 0.8rem;
  color: #ffffff;
`

const Like = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.375rem;
`

const LikeIcon = styled.svg`
  width: 14px;
  height: 14px;
  margin: 0;
  background: no-repeat center/cover url('/assets/images/main/like.svg');
`

const MovieInfo = styled.div`
  display: flex;
`

const Poster = styled.img`
  transition: transform 0.3s ease;
  border-radius: 0.65rem;
  width: 7.75rem;
  height: 11.07rem;
  padding: 0.4rem 0.375rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.3rem;
    width: 7rem;
    height: 10rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.3rem;
    width: 6.4rem;
    height: 9.5rem;
  }
`;

