import React, { useEffect, useState } from "react";
import styled from "styled-components";
import specialIcon from "../../assets/images/main/special_icon.svg";
import { useNavigate, useParams } from "react-router-dom";

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
  }

  .specialMovie__list {
    display: flex;
    align-items: center;
    gap: 1rem;
    overflow-x: scroll;
  }

  .specialMovie__list--info {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .specialMovie__list--info img {
    border-radius: 0.75rem;
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
  margin-right: 0.3rem;
  font-size: 1rem;
  color: ${(props) => (props.$isSelected ? "var(--main)" : "#afafaf")};
  font-weight: ${(props) => (props.$isSelected ? "bold" : "normal")};
`;

const CategoryBtn = styled.button`
  background-color: ${(props) =>
    props.$isSelected ? "var(--main)" : "var(--sub-btn)"};
  color: ${(props) => (props.$isSelected ? "white" : "var(--main)")};
  font-size: 13px;
  font-weight: ${(props) => (props.$isSelected ? "bold" : "normal")};
  border-radius: 5rem;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: var(--main);
    color: white;
  }
  white-space: nowrap;
`;

function SpecialMovie() {
  const category = [
    {
      테마별: [
        "실화를 소재로 한",
        "가족과함께",
        "연인과 함께",
        "킬링타임",
        "비오는날",
        "디즈니",
      ],
      연령대별: ["10대", "20대", "30대", "40대", "50대"],
      시즌별: [
        "봄",
        "여름",
        "가을",
        "겨울",
        "어린이날",
        "크리스마스",
        "새해",
        "명절",
      ],
    },
  ];

  //테마 랜덤으로 지정하기 (임의 데이터)
  function getRandomItems(arr, maxCount) {
    const count = Math.floor(Math.random() * maxCount) + 1; // 1개 또는 2개 선택
    const shuffled = arr.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count); // 섞은 배열에서 첫 번째 count 개 항목을 선택
  }
  const specialMovies = Array.from({ length: 20 }, (_, i) => ({
    movieId: i + 1,
    title: `영화 ${i + 1}`,
    poster: `https://via.placeholder.com/124x177`,
    plot: `이 영화는 영화 ${i + 1}에 대한 설명입니다.`,
    nation: ["미국", "한국", "대만", "중국", "캐나다", "프랑스"][i % 6],
    released: `20${10 + (i % 20)}`,
    runtime: `${120 + i}분`,
    score: Math.floor(Math.random() * 5) + 1,
    rating: i + 1 <= 10 ? "teenager" : "adult",
    genre: ["스릴러", "액션", "코미디", "드라마", "판타지"][i % 5],
    reviews: Math.floor(Math.random() * 1901) + 100,
    likes: Math.floor(Math.random() * 1701) + 300,

    theme: getRandomItems(
      [
        "디즈니",
        "킬링타임",
        "실화를 소재로 한",
        "가족과 함께",
        "연인과 함께",
        "비오는날",
      ],
      2
    ),
    ageGroup: getRandomItems(["10대", "20대", "30대", "40대", "50대"], 2),
    season: getRandomItems(
      ["봄", "여름", "가을", "겨울", "어린이날", "크리스마스", "새해", "명절"],
      2
    ),
  }));

  const [selectedCategory, setSelectedCategory] = useState("테마별"); //테마 카테고리
  const [selectedValue, setSelectedValue] = useState(null); // 세부 카테고리
  const [filteredMovies, setFilteredMovies] = useState(specialMovies); //영화정보
  const [selectedTheme, setSelectedTheme] = useState("");
  const categoryKeys = Object.keys(category[0]);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedValue(null);
  };

  const handleValueClick = (value) => {
    setSelectedTheme(value);

    const newFilteredMovies = specialMovies.filter((movie) =>
      movie.theme.includes(value)
    );
    setFilteredMovies(newFilteredMovies);
  };

  // 렌더링 후 첫 기본값 설정
  useEffect(() => {
    if (selectedCategory) {
      const firstValue = category[0][selectedCategory][0];
      setSelectedTheme(firstValue);
    }
  }, [selectedCategory]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };
  return (
    <>
      <SpecialMovieList>
        <div className="specialMovie__title">
          <img src={specialIcon} alt="special_icon" />
          <h2>뭘 좋아할지 몰라서 다준비했어(이름추천받아요)</h2>
        </div>
        <div>
          <div>
            {categoryKeys.map((categoryKey) => (
              <ThemeBtn
                key={categoryKey}
                onClick={() => handleCategoryClick(categoryKey)}
                $isSelected={selectedCategory === categoryKey}
              >
                {categoryKey}
              </ThemeBtn>
            ))}
          </div>

          {selectedCategory && (
            <div className="movie__categoty">
              {category[0][selectedCategory]?.map((value) => (
                <CategoryBtn
                  key={value}
                  onClick={() => handleValueClick(value)}
                  $isSelected={selectedTheme === value}
                >
                  {value}
                </CategoryBtn>
              ))}
            </div>
          )}

          <div className="specialMovie__list">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <div
                  key={movie.movieId}
                  className="specialMovie__list--info"
                  onClick={handleMovieClick}
                >
                  <img src={movie.poster} alt={movie.title} />
                  <div>
                    <p>
                      <strong>{movie.title}</strong>
                    </p>
                    <p>
                      {movie.released}﹒{movie.nation}
                    </p>
                    <p className="movie__info--sub">리뷰 수: {movie.reviews}</p>
                    <p className="movie__info--sub">좋아요 수: {movie.likes}</p>
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
