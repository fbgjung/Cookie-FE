import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import serverBaseUrl from "../../config/apiConfig";
import axios from "axios";


function SpecialMovie({ categorydata }) {
  const filteredCategoryData = categorydata.filter(
    (item) => item.id >= 21 && item.id <= 40
  );
  const [selectedMainCategory, setSelectedMainCategory] = useState("시즌");
  const [selectedSubCategory, setSelectedSubCategory] = useState("설레는봄");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const handleMainCategoryClick = (mainCategory) => {
    setSelectedMainCategory(mainCategory);
    setSelectedSubCategory(null);
  };
  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const fetchMoviesByCategory = async (mainCategory, subCategory) => {
    if (!mainCategory || !subCategory) return;

    try {
      const response = await axios.get(`${serverBaseUrl}/api/movies/categoryMovies`, {
        params: {
          mainCategory: mainCategory,
          subCategory: subCategory,
        },
      });

      setMovies(response.data.movies);
    } catch (error) {
      console.error("영화 불러오기 실패:", error);
    }
  };

  const mainCategories = Array.from(
    new Set(filteredCategoryData.map((item) => item.mainCategory))
  );

  // 선택된 메인 카테고리의 세부카테고리
  const getSubCategories = (mainCategory) => {
    return filteredCategoryData
      .filter((item) => item.mainCategory === mainCategory)
      .map((item) => item.subCategory);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  useEffect(() => {
    if (selectedMainCategory) {
      let firstSubCategory = getSubCategories(selectedMainCategory)[0];
      if (selectedSubCategory === "설레는봄" || !selectedSubCategory) {
        setSelectedSubCategory(firstSubCategory);
      }
    }
  }, [selectedMainCategory]);

  useEffect(() => {
    if (
      selectedMainCategory &&
      selectedSubCategory &&
      selectedSubCategory !== "설레는봄"
    ) {
      fetchMoviesByCategory(selectedMainCategory, selectedSubCategory);
    }
  }, [selectedMainCategory, selectedSubCategory]);


  const handleMoreView = (mainCategory, subCategory) => {
    navigate("/category/movies", { state: { mainCategory, subCategory } });
  };
  
  return (
    <>
      <SpecialMovieList>
        <Title>영화 선택 시간을 덜어드려요</Title>
        <div>
          <div>
            {mainCategories.map((mainCategory, index) => (
              <ThemeBtn
                key={index}
                onClick={() => handleMainCategoryClick(mainCategory)}
                $isSelected={selectedMainCategory === mainCategory}
              >
                {mainCategory}
              </ThemeBtn>
            ))}
          </div>

          {selectedMainCategory && (
            <div className="movie__category">
              {getSubCategories(selectedMainCategory).map(
                (subCategory, index) => (
                  <CategoryBtn
                    key={index}
                    onClick={() => handleSubCategoryClick(subCategory)}
                    $isSelected={selectedSubCategory === subCategory}
                  >
                    {subCategory}
                  </CategoryBtn>
                )
              )}
            </div>
          )}
          <MoreViewText onClick = {() => handleMoreView(selectedMainCategory, selectedSubCategory)}>{selectedSubCategory} 더보기 {'>'}</MoreViewText>

          <div className="specialMovie__list">
            {movies && (
              movies.map((movie, index) => (
                <div
                  key={index}
                  className="specialMovie__list--info"
                  onClick={() => handleMovieClick(movie.id)}
                >
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
              ))
            )}
          </div>
        </div>
      </SpecialMovieList>
    </>
  );
}

export default SpecialMovie;


const SpecialMovieList = styled.div`
  .movie__category {
    display: flex;
    gap: 0.4rem;
    margin: 0.5rem 0 0 0;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 0 0 0.375rem;
  }

  .specialMovie__list {
    display: flex;
    align-items: start;
    overflow-x: scroll;
    height: 13rem;
  }
`;

const ThemeBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 0.8rem 0 0;
  font-size: 1rem;
  color: ${(props) => (props.$isSelected ? "#82DCFF" : "#afafaf")};
  font-weight: ${(props) => (props.$isSelected ? "bold" : "normal")};
  padding: 0 0 0 0.375rem;

  @media (max-width: 768px) {
    margin: 0 0.7rem 0.5rem 0;
    font-size: 0.9rem;
  }
`;

const CategoryBtn = styled.button`
  background-color: ${(props) => (props.$isSelected ? "var(--sub)" : "white")};
  color: ${(props) => (props.$isSelected ? "var(--text)" : "var(--text)")};
  font-size: 13px;
  font-weight: ${(props) => (props.$isSelected ? "bold" : "500")};
  border-radius: 0.3rem;
  border: 1px solid var(--sub);
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: var(--sub);
    color: var(--text);
  }
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 0.4rem 0.8rem;
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
  padding-right: 0.4rem;

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

const MoreViewText = styled.p`
  color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  font-size: 0.8rem;
`