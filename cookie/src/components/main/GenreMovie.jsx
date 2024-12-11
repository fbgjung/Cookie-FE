import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/auth/axiosInstance";


function GenreMovie({ categorydata }) {
  const [selectedMainCategory] = useState("장르");
  const [selectedGenre, setSelectedGenre] = useState("로맨스");
  const [genreMovies, setGenreMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchMoviesByGenre = async (genre) => {
    try {
      const response = await axiosInstance.get("/api/movies/categoryMovies", {
        params: {
          mainCategory: "장르",
          subCategory: genre,
        },
      });
      console.log(response.data);
      setGenreMovies(response.data.movies);
    } catch (error) {
      console.error("영화 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    const genreList = categorydata
      .filter((category) => category.mainCategory === "장르")
      .map((category) => category.subCategory);
    setGenres(genreList);
  }, [categorydata]);

  useEffect(() => {
    fetchMoviesByGenre(selectedGenre);
  }, [selectedGenre]);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    fetchMoviesByGenre(genre);
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const handleMoreView = (mainCategory, subCategory) => {
    navigate("/special/category/movies", { state: { mainCategory, subCategory } });
  };

  return (
    <>
      <GenreMovieList>
        <Title>장르로 영화 찾기</Title>
        <div className="genreBtn__contianer">
          {genres
            .filter((genre) => genre !== "N/A")
            .map((genre, index) => (
              <GenreBtn
                key={index}
                $isSelected={selectedGenre === genre}
                onClick={() => handleGenreClick(genre)}
              >
                {genre}
              </GenreBtn>
            ))}
        </div>

        <MoreViewText onClick={() => handleMoreView(selectedMainCategory, selectedGenre)}>
          {selectedGenre} 더보기 {'>'}
        </MoreViewText>

        <div className="genre__movie">
        {genreMovies.map((movie, index) => (
          <div key={index} className="genre__movie--list" onClick={() => handleMovieClick(movie.id)}>
            <Poster src={movie.poster} alt={movie.title} />
            <MovieInfo>
              <Review>
                <ReviewIcon alt="Review Icon" />
                <Count>{movie.reviews}</Count>
              </Review>
              <Like>
                <LikeIcon alt="Review Icon" />
                <Count>{movie.likes}</Count>
              </Like>
            </MovieInfo>
          </div>
        ))}
      </div>
      </GenreMovieList>
    </>
  );
}

export default GenreMovie;


const GenreMovieList = styled.div`
  .genreBtn__contianer {
    margin-bottom: 0.8rem;
  }

  .genre__movie {
    display: flex;
    flex-direction: row;
    align-items: start;
    overflow-x: auto;
  }
`;

const Title = styled.h2`
  color: var(--text-wh);
  padding: 2rem 0 0.7rem 0.375rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Poster = styled.img`
  transition: transform 0.3s ease;
  border-radius: 0.65rem;
  width: 7.75rem;
  height: 11.07rem;
  padding: 0.4rem 0.375rem;
  cursor: pointer;

  @media (max-width: 768px) {
    border-radius: 0.75rem;
    width: 5.875rem;
    height: 9.1875rem;
  }

  @media (max-width: 480px) {
    border-radius: 0.75rem;
    width: 5.375rem;
    height: 8.6875rem;
  }
`;

const GenreBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 0.4rem 0.3rem 0;
  padding: 0 0 0 0.375rem;
  font-size: 1rem;
  color: ${(props) => (props.$isSelected ? "#82DCFF" : "#afafaf")};
  font-weight: ${(props) => (props.$isSelected ? "bold" : "normal")};
  
  @media (max-width: 768px) {
    margin: 0 0.7rem 0.5rem 0;
    font-size: 0.9rem;
  }
`;

const MoreViewText = styled.p`
  color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  font-size: 0.8rem;
`;

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