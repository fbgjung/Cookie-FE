import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "../api/auth/axiosInstance";
import goBackBtn from "../assets/images/main/goBack_wh.svg";
import { SkeletonOverlay } from "../components/main/AdminRecommend";

const CategoryMovieFeed = () => {
  const location = useLocation();
  const mainCategory = location.state.mainCategory;
  const subCategory = location.state.subCategory;

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const observer = useRef();
  const navigate = useNavigate();

  const fetchMovies = async (page) => {
    if (isLoading || page >= totalPages) return;
    setIsLoading(true);

    try {
      const response = await axiosInstance.get("/api/movies/categoryMovies", {
        params: {
          mainCategory: mainCategory,
          subCategory: subCategory,
          page: page,
          size: 10,
        },
      });

      setMovies((prevMovies) => [...prevMovies, ...response.data.movies]);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page + 1);
    } catch (error) {
      console.error("영화 불러오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const lastMovieElementRef = (node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMovies(currentPage);
      }
    });
    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    fetchMovies(0);
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };
  return (
    <Container>
      <GoBackBtn onClick={() => navigate(-1)}>
        <img src={goBackBtn} />
      </GoBackBtn>
      <Header>
        {mainCategory} - {subCategory}
      </Header>

      <CategoryTitle></CategoryTitle>
      <MovieList>
        <div className="movie__List--info">
          {movies.map((movie, index) => (
            <MovieItem
              key={movie.id}
              ref={index === movies.length - 1 ? lastMovieElementRef : null}
              onClick={() => handleMovieClick(movie.id)}
            >
              {isLoading ? (
                <SkeletonOverlay />
              ) : (
                <Poster src={movie.poster} alt={movie.title} />
              )}
              <Info></Info>
            </MovieItem>
          ))}
        </div>
      </MovieList>
      {isLoading && <Loading>Loading...</Loading>}
    </Container>
  );
};

export default CategoryMovieFeed;

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  min-width: 600px;
  min-height: 1245px;
  margin: 0 auto;
  background-color: #000000;
  @media (max-width: 430px) {
    min-width: 430px;
    padding: 0px;
  }
  @media (max-width: 393px) {
    min-width: 390px;
    padding: 0px;
  }
`;
const GoBackBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 1rem;
  margin-bottom: 1.5rem;
  @media (max-width: 430px) {
    margin: 1.5rem 0;
  }
  @media (max-width: 393px) {
    margin: 1.5rem 0;
  }
`;
const Header = styled.h2`
  font-size: 24px;
  margin-bottom: 1.25rem;
  text-align: center;
  color: white;
  @media (max-width: 430px) {
    font-size: 22px;
  }
  @media (max-width: 393px) {
    font-size: 22px;
  }
`;

const CategoryTitle = styled.div`
  color: white;
  font-size: 30px;
  margin-bottom: 1rem;
`;

const MovieList = styled.div`
  display: flex;
  justify-content: center;

  .movie__List--info {
    display: flex;
    flex-wrap: wrap;
    gap: 22px;
    justify-content: start;
    align-items: center;
    padding: 0 2em;
  }
  @media (max-width: 430px) {
    padding: 0rem;
  }
  @media (max-width: 393px) {
    padding: 0rem;
  }
`;

const MovieItem = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;

  @media (max-width: 430px) {
    width: 107px;
  }
  @media (max-width: 393px) {
    width: 94px;
  }
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 0.3rem;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const Info = styled.div`
  font-size: 14px;
  color: white;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Loading = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
`;
