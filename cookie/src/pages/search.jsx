import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import SearchBar from "../components/searchpage/SearchBar";
import SearchResults from "../components/searchpage/SearchResults";
import TopButton from "../components/searchpage/TopButton";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  background-color: #f9f9f9;
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 70px 15px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;

  button {
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 20px;
    cursor: pointer;
    border: none;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &.active {
      background-color: #04012d;
      color: #fff;
    }

    &.inactive {
      background-color: #f0f0f0;
      color: #666;
    }

    &:hover {
      background-color: #ddd;
    }
  }
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
  const [activeTab, setActiveTab] = useState("movie");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);

  // 디바운스 타이머를 저장할 변수
  const [debounceTimer, setDebounceTimer] = useState(null);

  // 스크롤 상태 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setShowTopButton(scrollTop > 200);

      if (
        window.innerHeight + scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        if (hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  // 검색 API 호출
  const fetchSearchResults = async () => {
    if (!searchTerm.trim()) {
      setResults([]);
      setHasMore(false);
      return;
    }

    const movieResults = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const directorResults = movies.filter((movie) =>
      movie.director.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const actorResults = movies.filter((movie) =>
      movie.actors.some((actor) =>
        actor.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setFilteredMovies(movieResults);
    setFilteredDirectors(directorResults);
    setFilteredActors(actorResults);
  }, [searchTerm]);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      <ContentWrapper>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => {}}
        />
        <Tabs>
          <button
            className={activeTab === "movie" ? "active" : "inactive"}
            onClick={() => handleTabClick("movie")}
          >
            영화명
          </button>
          <button
            className={activeTab === "actor" ? "active" : "inactive"}
            onClick={() => handleTabClick("actor")}
          >
            배우명
          </button>
          <button
            className={activeTab === "director" ? "active" : "inactive"}
            onClick={() => handleTabClick("director")}
          >
            감독명
          </button>
        </Tabs>
        <SearchResults
          results={results}
          activeTab={activeTab}
          onMovieClick={handleMovieClick}
        />
      </ContentWrapper>
      {showTopButton && <TopButton onClick={scrollToTop} />}
    </Container>
  );
};

export default Search;