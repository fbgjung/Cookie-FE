import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✨ 추가: 상세 페이지 이동을 위한 useNavigate 추가
import styled from "styled-components";
import Header from "../components/Header"; // Header 컴포넌트 가져오기
import Navbar from "../components/Navvar"; // Navbar 컴포넌트 가져오기
import SearchIcon from "@mui/icons-material/Search"; // MUI 아이콘 가져오기

const Container = styled.div`
  padding: 70px 20px 70px; /* 헤더와 네비게이션 공간 확보 */
  max-width: 600px; /* 화면 중앙 정렬을 위해 추가 */
  margin: 0 auto; /* 화면 중앙에 고정 */
  background-color: #f9f9f9; /* 배경색 설정 */
`;

const SearchBarContainer = styled.div`
  position: relative;
  margin: 20px 0px 50px 0px;
  height: 40px;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 91%;
  height: 100%;
  padding: 10px 20px 10px 30px; /* 오른쪽에 아이콘 공간 확보 */
  font-size: 20px;
  border: 1px solid #ddd;
  border-radius: 30px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const SearchIconButton = styled.button`
  position: absolute;
  top: 75%;
  right: 0px; /* 오른쪽 끝에 배치 */
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: #333;
    font-size: 24px;
  }

  &:hover svg {
    color: #555;
  }
`;

const MovieList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MovieItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  cursor: pointer; /* ✨ 추가: 클릭 가능하도록 pointer 스타일 추가 */

  img {
    width: 80px;
    height: 120px;
    margin-right: 15px;
    object-fit: cover;
    border-radius: 5px;
  }

  div {
    display: flex;
    flex-direction: column; /* 텍스트를 세로로 배치 */
    justify-content: flex-start; /* 텍스트를 상단 정렬 */
    align-items: flex-start; /* 텍스트를 왼쪽 정렬 */
    font-size: 16px;
    color: #333;
    line-height: 1.6;

    h4 {
      align-self: flex-start;
      font-size: 20px;
      font-weight: bold;
      margin: 0 0 5px 0;
      color: #04012d;
    }

    p {
      margin: 0;
      font-size: 14px;
      color: #555;
    }
  }
`;

const TopButton = styled.button`
  position: fixed;
  bottom: 90px; /* 네비게이션 바로 위에 고정 */
  right: calc(50% - 270px); /* 웹앱 내부 오른쪽에 고정 */
  display: ${({ visible }) => (visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background: white;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 1000;

  &::after {
    content: "↑";
    font-size: 18px;
    color: #333;
    font-weight: bold;
  }

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    background-color: #f1f1f1;
  }
`;

const Search = () => {
  const movies = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `랜덤 영화 ${i + 1}`,
    year: 2000 + (i % 23),
    genre: ["스릴러", "액션", "코미디", "드라마", "판타지"][i % 5],
    duration: `${90 + i}분`,
    imageUrl: `https://via.placeholder.com/80x120?text=영화+${i + 1}`,
  }));

  const [searchTerm, setSearchTerm] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);

  const navigate = useNavigate(); // ✨ 추가: useNavigate 훅으로 라우팅 제어

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    // 검색 동작을 실행 (예: API 호출 등)
    alert(`검색어: ${searchTerm}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`); // ✨ 추가: 영화 클릭 시 상세 페이지로 이동
  };

  return (
    <>
      <Header />
      <Container>
        <SearchBarContainer>
          <SearchInput
            placeholder="영화 제목 또는 배우/감독명을 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIconButton onClick={handleSearch}>
            <SearchIcon />
          </SearchIconButton>
        </SearchBarContainer>
        <MovieList>
          {movies.map((movie) => (
            <MovieItem
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)} // ✨ 추가: 클릭 이벤트
            >
              <img src={movie.imageUrl} alt={movie.title} />
              <div>
                <h4>{movie.title}</h4>
                <p>{`${movie.year} · ${movie.genre}`}</p>
                <p>{movie.duration}</p>
              </div>
            </MovieItem>
          ))}
        </MovieList>
        <TopButton visible={showTopButton} onClick={scrollToTop} />
      </Container>
      <Navbar />
    </>
  );
};

export default Search;
