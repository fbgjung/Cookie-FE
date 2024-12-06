import React, { useEffect, useState } from "react";
import styled from "styled-components";
import specialIcon from "../../assets/images/main/special_icon.svg";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/auth/axiosInstance";

const SpecialMovieList = styled.div`
  position: relative;
  overflow-x: hidden;

  .specialMovie__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .movie__categoty {
    display: flex;
    gap: 0.4rem;
    margin: 0.5rem 0 1rem 0;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .specialMovie__list {
    display: flex;
    align-items: start;
    padding: 0.625rem;
    gap: 1rem;
    overflow-x: scroll;
  }

  .specialMovie__list--info {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    cursor: pointer;
    width: 124px;
  }

  .specialMovie__list--info img {
    border-radius: 0.75rem;
    width: 124px;
    height: 177px;
  }

  .specialMovie__list--info p {
    text-align: start;
  }

  .movie__info--sub {
    color: #afafaf;
    font-size: 13px;
  }
`;

const ThemeBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 0.8rem 0.8rem 0;
  font-size: 1rem;
  color: ${(props) => (props.$isSelected ? "var(--text)" : "#afafaf")};
  font-weight: ${(props) => (props.$isSelected ? "bold" : "normal")};
`;

const CategoryBtn = styled.button`
  background-color: ${(props) => (props.$isSelected ? "var(--sub)" : "white")};
  color: ${(props) => (props.$isSelected ? "var(--text)" : "var(--text)")};
  font-size: 13px;
  font-weight: ${(props) => (props.$isSelected ? "bold" : "normal")};
  border-radius: 5rem;
  border: 1px solid var(--sub);
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: var(--sub);
    color: var(--text);
  }
  white-space: nowrap;
`;

function SpecialMovie({ categorydata }) {
  const filteredCategoryData = categorydata.filter(
    (item) => item.id >= 21 && item.id <= 40
  );
  const [selectedMainCategory, setSelectedMainCategory] = useState("시즌");
  const [selectedSubCategory, setSelectedSubCategory] = useState("설레는봄");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

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
      const response = await axiosInstance.get("/api/movies/categoryMovies", {
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

  return (
    <>
      <SpecialMovieList>
        <div className="specialMovie__title">
          <img src={specialIcon} alt="special_icon" />
          <h2>뭘 좋아할지 몰라서 다준비했어(이름추천받아요)</h2>
        </div>
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
            <div className="movie__categoty">
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

          <div className="specialMovie__list">
            {movies.length > 0 ? (
              movies.map((movie, index) => (
                <div
                  key={index}
                  className="specialMovie__list--info"
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <img src={movie.poster} alt={movie.title} />
                  <div>
                    <p>
                      <strong>{movie.title}</strong>
                    </p>
                    <p>
                      {new Date(movie.releasedAt).getFullYear()}﹒
                      {movie.country}
                    </p>
                    <p className="movie__info--sub">리뷰: {movie.reviews}개</p>
                    <p className="movie__info--sub">좋아요: {movie.likes}개</p>
                  </div>
                </div>
              ))
            ) : (
              <p>해당 영화가 없어요🥲</p>
            )}
          </div>
        </div>
      </SpecialMovieList>
    </>
  );
}

export default SpecialMovie;
