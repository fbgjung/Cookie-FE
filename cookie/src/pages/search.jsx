import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Navbar from "../components/Navvar";
import SearchBar from "../components/searchpage/SearchBar";
import SearchResults from "../components/searchpage/SearchResults";
import TopButton from "../components/searchpage/TopButton"; // ✨ TopButton import

const Container = styled.div`
  padding: 70px 20px 70px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
`;

const Search = () => {
  const movies = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `랜덤 영화 ${i + 1}`,
    year: 2000 + (i % 23),
    genre: ["스릴러", "액션", "코미디", "드라마", "판타지"][i % 5],
    duration: `${90 + i}분`,
    director: `감독 ${i + 1}`,
    actors: [`배우 ${i + 1}`, `배우 ${i + 2}`],
    imageUrl: `https://via.placeholder.com/80x120?text=영화+${i + 1}`,
  }));

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredDirectors, setFilteredDirectors] = useState([]);
  const [filteredActors, setFilteredActors] = useState([]);
  const [showTopButton, setShowTopButton] = useState(false);

  const navigate = useNavigate();

  // 스크롤 이벤트로 TopButton 표시/숨김 제어
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 검색어 입력에 따라 실시간 필터링
  useEffect(() => {
    if (!searchTerm) {
      setFilteredMovies([]);
      setFilteredDirectors([]);
      setFilteredActors([]);
      return;
    }

    const movieResults = movies.filter((movie) =>
      movie.title.includes(searchTerm)
    );
    const directorResults = movies.filter((movie) =>
      movie.director.includes(searchTerm)
    );
    const actorResults = movies.filter((movie) =>
      movie.actors.some((actor) => actor.includes(searchTerm))
    );

    setFilteredMovies(movieResults);
    setFilteredDirectors(directorResults);
    setFilteredActors(actorResults);
  }, [searchTerm]);

  // 영화 상세 페이지 이동
  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  // 페이지 상단으로 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <Container>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => {}}
        />
        <SearchResults
          filteredMovies={filteredMovies}
          filteredDirectors={filteredDirectors}
          filteredActors={filteredActors}
          onMovieClick={handleMovieClick}
        />
        {/* ✨ TopButton 배치 */}
        <TopButton visible={showTopButton} onClick={scrollToTop} />
      </Container>
      <Navbar />
    </>
  );
};

export default Search;
