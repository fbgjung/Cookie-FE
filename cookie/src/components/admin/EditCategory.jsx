import { useEffect, useState } from "react";
import styled from "styled-components";
import useMovieCategoryStore from "../../stores/useMovieGategoryStore";
import Edit from "../../assets/images/admin/Edit.svg";
import axiosInstance from "../../api/auth/axiosInstance";

const CategoryTitle = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;

  img {
    margin-right: 10px;
    width: 30px;
    height: 30px;
  }
`;

const CategoryWrapper = styled.div`
  width: 1239px;
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const CategorySection = styled.div`
  margin: 0 10px;
  background-color: white;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px;
  height: 450px;
`;

const CategoryHeader = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
  width: 70px;
`;

const CategoryList = styled.div`
  display: grid;
  gap: 10px;
  list-style: none;
  padding: 0;
`;

const CategoryItem = styled.div`
  margin-top: ${({ index }) => (index % 2 !== 0 ? "10px" : "0")};
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    width: 140px;
    display: flex;
    align-items: center;
  }

  input[type="checkbox"] {
    margin-right: 10px;
    border: 1px solid var(--sub);
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-color: white;
    appearance: none;
    position: relative;
    border-radius: 3px;
  }
  input[type="checkbox"]:checked {
    background-color: var(--sub);
  }
  input[type="checkbox"]:checked::after {
    content: "";
    width: 10px;
    height: 10px;
    background-color: white;
  }
`;

const MoviePoster = styled.img`
  width: 177px;
  height: 245px;
  border-radius: 12px;
  margin-right: 2px;
`;

const MovieTitle = styled.h2`
  font-size: 24px;
`;

const MovieInfoContainer = styled.div`
  background-color: var(--ticket-bg);
  width: 400px;
  height: 540px;
  padding: 20px 20px;
  border-radius: 12px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
  margin-right: 3px;
  position: relative;
  display: flex;

  &::after {
    content: "";
    position: absolute;
    top: 10px;
    right: -2px;
    height: 480px;
    border-right: 2.5px dotted #a7a7a7;
  }
`;

const MovieCategoryContainer = styled.div`
  background-color: var(--ticket-bg);
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
  height: 540px;
  display: flex;
  padding: 20px 20px;
  border-radius: 12px;
  position: relative;

  button {
    position: absolute;
    bottom: 15px;
    right: 35px;
    padding: 10px 20px;
    background-color: white;
    color: var(--text);
    border: 1px solid var(--sub);
    border-radius: 5px;
    cursor: pointer;
    border-radius: 18px;

    &:hover {
      background-color: var(--sub);
      color: var(--text);
    }
  }
`;

const categoryData = [
  { categoryId: 1, mainCategory: "장르", subCategory: "로맨스" },
  { categoryId: 2, mainCategory: "장르", subCategory: "공포" },
  { categoryId: 3, mainCategory: "장르", subCategory: "코미디" },
  { categoryId: 4, mainCategory: "장르", subCategory: "액션" },
  { categoryId: 5, mainCategory: "장르", subCategory: "판타지" },
  { categoryId: 6, mainCategory: "장르", subCategory: "애니메이션" },
  { categoryId: 7, mainCategory: "장르", subCategory: "범죄" },
  { categoryId: 8, mainCategory: "장르", subCategory: "SF" },
  { categoryId: 9, mainCategory: "장르", subCategory: "음악" },
  { categoryId: 10, mainCategory: "장르", subCategory: "스릴러" },
  { categoryId: 11, mainCategory: "장르", subCategory: "전쟁" },
  { categoryId: 12, mainCategory: "장르", subCategory: "다큐멘터리" },
  { categoryId: 13, mainCategory: "장르", subCategory: "드라마" },
  { categoryId: 14, mainCategory: "장르", subCategory: "가족" },
  { categoryId: 15, mainCategory: "장르", subCategory: "역사" },
  { categoryId: 16, mainCategory: "장르", subCategory: "미스터리" },
  { categoryId: 17, mainCategory: "장르", subCategory: "TV 영화" },
  { categoryId: 18, mainCategory: "장르", subCategory: "서부극" },
  { categoryId: 19, mainCategory: "장르", subCategory: "모험" },
  { categoryId: 20, mainCategory: "장르", subCategory: "N/A" },
  { categoryId: 21, mainCategory: "시즌", subCategory: "설레는 봄" },
  { categoryId: 22, mainCategory: "시즌", subCategory: "청량한 여름" },
  { categoryId: 23, mainCategory: "시즌", subCategory: "포근한 가을" },
  { categoryId: 24, mainCategory: "시즌", subCategory: "눈 오는 겨울" },
  { categoryId: 25, mainCategory: "시즌", subCategory: "어린이날" },
  { categoryId: 26, mainCategory: "시즌", subCategory: "크리스마스" },
  { categoryId: 27, mainCategory: "시즌", subCategory: "새해" },
  { categoryId: 28, mainCategory: "시즌", subCategory: "명절" },
  { categoryId: 29, mainCategory: "테마", subCategory: "심화를 소재로 한" },
  { categoryId: 30, mainCategory: "테마", subCategory: "가족과 함께" },
  { categoryId: 31, mainCategory: "테마", subCategory: "연인과 함께" },
  { categoryId: 32, mainCategory: "테마", subCategory: "열린결말" },
  { categoryId: 33, mainCategory: "테마", subCategory: "비 오는 날" },
  { categoryId: 34, mainCategory: "테마", subCategory: "킬링타임" },
  { categoryId: 35, mainCategory: "테마", subCategory: "디즈니" },
  { categoryId: 36, mainCategory: "연령대", subCategory: "10대" },
  { categoryId: 37, mainCategory: "연령대", subCategory: "20대" },
  { categoryId: 38, mainCategory: "연령대", subCategory: "30대" },
  { categoryId: 39, mainCategory: "연령대", subCategory: "40대" },
  { categoryId: 40, mainCategory: "연령대", subCategory: "50대" },
];

const EditCategory = ({ movie }) => {
  const { movieId, title, movieCategories } = movie;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchMovieCategories = async (movieId) => {
    try {
      const response = await axiosInstance.get(`/api/admin/movie/${movieId}`);
      console.log(response);
      const movieCategories = response.data.response.movieCategories;

      const connectedCategories = movieCategories
        .filter((category) => category.connect)
        .map((category) => category.categoryId);

      return connectedCategories;
    } catch (error) {
      console.error("Error fetching movie categories", error);
      return [];
    }
  };

  const handleEditClick = async (movie) => {
    console.log("movie", movie);
    const movieId = movie.movieId;
    console.log("movieId", movieId);
    setIsEditOpen(true);
    setSelectedMovie(movie);

    const movieCategories = await fetchMovieCategories(movieId);

    setSelectedMovie((prevMovie) => {
      if (prevMovie) {
        return {
          ...prevMovie,
          movieCategories: movieCategories,
        };
      }
      return prevMovie;
    });
  };
  const updateMovieCategories = (updatedCategories) => {
    setSelectedMovie((prevMovie) => {
      if (prevMovie) {
        const allCategories = [...prevMovie.categories, ...updatedCategories];

        const uniqueCategories = Array.from(
          new Map(allCategories.map((item) => [item.categoryId, item])).values()
        );

        return {
          ...prevMovie,
          categories: uniqueCategories,
        };
      }
      return prevMovie;
    });
  };
  useEffect(() => {
    if (movieCategories && movieCategories.length > 0) {
      const updatedCategories = movieCategories.map((category) => ({
        ...category,
        isChecked: category.isConnect, // isConnect 값에 따라 체크 여부 설정
      }));
      setCategories(updatedCategories);

      // selectedCategories 배열을 초기화
      const selected = movieCategories
        .filter((category) => category.isConnect)
        .map((category) => category.categoryId);
      setSelectedCategories(selected);
    }
  }, [movieCategories]);

  // 카테고리 체크박스를 클릭했을 때 호출되는 함수
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId); // 선택 해제
      } else {
        return [...prevSelected, categoryId]; // 선택
      }
    });

    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.categoryId === categoryId
          ? {
              ...category,
              isChecked: !category.isChecked,
              isConnect: !category.isChecked, // isConnect 값 반전
            }
          : category
      )
    );
  };

  // 수정 버튼 클릭 시, 변경된 카테고리 정보를 서버에 전송
  const handleUpdate = async () => {
    const updatedCategories = categories.map((category) => ({
      categoryId: category.categoryId,
      mainCategory: category.mainCategory,
      subCategory: category.subCategory,
      isConnect: category.isChecked, // isChecked 값을 isConnect로 전송
    }));

    // 수정된 카테고리들을 서버에 전송
    try {
      await axiosInstance.put(`/api/admin/movie/${movieId}`, {
        updatedCategories,
      });
      alert("카테고리가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("카테고리 수정 실패", error);
      alert("카테고리 수정 중 오류가 발생했습니다.");
    }
  };

  const groupedCategories = categoryData.reduce((acc, category) => {
    const mainCategory = category.mainCategory;
    if (!acc[mainCategory]) acc[mainCategory] = [];
    acc[mainCategory].push(category);
    return acc;
  }, {});

  return (
    <>
      <CategoryTitle>
        <img src={Edit} />
        <h1>카테고리 수정</h1>
      </CategoryTitle>
      <CategoryWrapper>
        {movie && (
          <MovieInfoContainer>
            <MoviePoster src={movie.posterUrl} alt="Movie Poster" />
            <MovieTitle>{title}</MovieTitle>
          </MovieInfoContainer>
        )}
        <MovieCategoryContainer>
          {Object.entries(groupedCategories).map(
            ([mainCategory, categories]) => (
              <CategorySection key={mainCategory}>
                <CategoryHeader>{mainCategory}</CategoryHeader>
                <CategoryList
                  style={
                    mainCategory === "장르"
                      ? { gridTemplateColumns: "repeat(2, 1fr)" }
                      : {}
                  }
                >
                  {categories.map((category) => (
                    <CategoryItem key={category.categoryId}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(
                            category.categoryId
                          )}
                          onChange={() =>
                            handleCategoryChange(category.categoryId)
                          }
                        />
                        {category.subCategory}
                      </label>
                    </CategoryItem>
                  ))}
                </CategoryList>
              </CategorySection>
            )
          )}
          <button onClick={handleUpdate}>수정</button>
        </MovieCategoryContainer>
      </CategoryWrapper>
    </>
  );
};

export default EditCategory;
