import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import SearchBar from "../components/searchpage/SearchBar";
import SearchResults from "../components/searchpage/SearchResultsForReview";
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
  align-items: center;
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

const SearchForReview = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [activeTab, setActiveTab] = useState("movie"); // 활성 탭 상태
  const [results, setResults] = useState([]); // 검색 결과
  const [defaultResults, setDefaultResults] = useState([]);
  const [page, setPage] = useState(0); // 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부
  const [showTopButton, setShowTopButton] = useState(false); // 상단 이동 버튼 상태

  const fetchSearchResults = async () => {
    try {
      if (searchTerm.trim()) {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/search`, {
          params: { type: activeTab, keyword: searchTerm, page, size: 10 },
        });
        const newResults = response.data || [];
        console.log(newResults);
        setResults((prevResults) =>
          page === 0 ? newResults : [...prevResults, ...newResults]
        );
        setHasMore(!response.data?.last);
      } else {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/search/default`);
        const defaultResults = response.data.response || [];
        console.log("디폴트",defaultResults);
        setDefaultResults(defaultResults);
        setHasMore(false); 
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
      setHasMore(false);
    }
  };
  
  useEffect(() => {
    if (searchTerm.trim()) {
      setPage(0);
      fetchSearchResults();
    } else {
      if (defaultResults.length === 0) {
        fetchSearchResults();
      }
    }
  }, [searchTerm, activeTab]);
  

  useEffect(() => {
    if (page > 0) {
      fetchSearchResults();
    }
  }, [page]);

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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleMovieClick = (movie) => {
    console.log("Received movie in handleMovieClick:", movie);

    if (!movie.id || !movie.title || !movie.poster) {
      console.error("영화 정보가 올바르지 않습니다:", movie);
      return;
    }

    navigate("/reviews/write", {
      state: { 
        movieId: movie.id,
        movieTitle: movie.title,
        posterUrl: movie.poster,
       },
    });
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
          onSearch={fetchSearchResults}
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
          results={results || []} // results가 undefined인 경우 빈 배열로 전달
          onMovieClick={handleMovieClick}
          isLoading={results.length === 0 && searchTerm.trim()} // 로딩 상태 처리
          activeTab={activeTab}
          defaultResults={defaultResults || []}
        />
      </ContentWrapper>
      {showTopButton && <TopButton onClick={scrollToTop} />}
    </Container>
  );
};

export default SearchForReview;