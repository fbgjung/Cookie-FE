import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import debounce from "lodash.debounce";
import SearchBar from "../components/searchpage/SearchBar";
import SearchResults from "../components/searchpage/SearchResultsForReview";
import TopButton from "../components/searchpage/TopButton";
import serverBaseUrl from "../config/apiConfig";
import GlobalStyle from "../styles/global";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: black;
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }

  @media (max-width: 480px) {
    padding: 40px 10px;
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
  background: black;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  background: #333;
  border-radius: 25px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-top: -30px;
  }

  @media (max-width: 480px) {
    border-radius: 15px;
    margin-top: -20px;
  }
`;

const TabButton = styled.button`
  flex: 1;
  padding: 15px 0;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  color: ${({ isActive }) => (isActive ? "white" : "#f9f9f9")};
  background: transparent;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ isActive }) => (isActive ? "white" : "#00C4D3")};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 0;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 10px 0;
  }
`;

const Slider = styled.div`
  position: absolute;
  bottom: 0;
  left: ${({ activeIndex }) => `${activeIndex * 33.33}%`};
  width: 33.33%;
  height: 5px;
  background: #00d6e8;
  transition: left 0.3s ease;

  @media (max-width: 480px) {
    height: 3px;
  }
`;

const SearchInfoText = styled.p`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  width: 100%;
  max-width: 600px;
  margin-bottom: 10px;
  line-height: 1.5;
  padding-left: 25px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding-left: 15px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding-left: 10px;
  }
`;

const DefaultResultsHeader = styled.div`
  color: #00c4d3;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const SearchForReview = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("movie");
  const [activeIndex, setActiveIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [defaultResults, setDefaultResults] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSearchResults = async () => {
    setIsLoading(true);
    try {
      if (searchTerm.trim()) {
        const response = await axios.get(`${serverBaseUrl}/api/search`, {
          params: { type: activeTab, keyword: searchTerm, page, size: 10 },
        });
        const newResults = response.data || [];
        setResults((prevResults) =>
          page === 0 ? newResults : [...prevResults, ...newResults]
        );
        setHasMore(!response.data?.last);
      } else {
        const response = await axios.get(`${serverBaseUrl}/api/search/default`);
        const defaultResults = response.data.response || [];
        setDefaultResults(defaultResults);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
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

  const debouncedScrollHandler = debounce(() => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    setShowTopButton(scrollTop > 200);

    if (
      window.innerHeight + scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, 300); // 300ms delay

  useEffect(() => {
    window.addEventListener("scroll", debouncedScrollHandler);
    return () => window.removeEventListener("scroll", debouncedScrollHandler);
  }, [hasMore, isLoading]);

  const handleTabClick = (tab, index) => {
    setActiveTab(tab);
    setActiveIndex(index);
  };

  const handleMovieClick = (movie) => {
    console.log("Received movie in handleMovieClick:", movie);
  
    // 데이터 형식에 따라 분기 처리
    const movieId = movie.id || movie.movieId; // id 또는 movieId
    const movieTitle = movie.title || movie.movieTitle; // title 또는 movieTitle
    const posterUrl = movie.poster;
  
    // 유효성 검사
    if (!movieId || !movieTitle || !posterUrl) {
      console.error("영화 정보가 올바르지 않습니다:", movie);
      return;
    }
  
    // 네비게이트
    navigate("/reviews/write", {
      state: { 
        movieId,
        movieTitle,
        posterUrl,
      },
    });
  };

  const handleDefaultMovieClick = (movie) => {
    console.log("Received default movie in handleDefaultMovieClick:", movie);
    if (!movie.movieId || !movie.movieTitle || !movie.poster) {
      console.error("기본 영화 정보가 올바르지 않습니다:", movie);
      return;
    }
    navigate("/reviews/write", {
      state: {
        movieId: movie.movieId,
        movieTitle: movie.movieTitle,
        posterUrl: movie.poster,
       },
    });
  };


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      <GlobalStyle />
      <SearchInfoText>
        영화 제목, 배우/ 감독명을
        <br />
        입력해주세요.
      </SearchInfoText>
      <ContentWrapper>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={fetchSearchResults}
        />
        <Tabs>
          <TabButton
            isActive={activeTab === "movie"}
            onClick={() => handleTabClick("movie", 0)}
          >
            영화명
          </TabButton>
          <TabButton
            isActive={activeTab === "actor"}
            onClick={() => handleTabClick("actor", 1)}
          >
            배우명
          </TabButton>
          <TabButton
            isActive={activeTab === "director"}
            onClick={() => handleTabClick("director", 2)}
          >
            감독명
          </TabButton>
          <Slider activeIndex={activeIndex} />
        </Tabs>
        {!searchTerm.trim() && (
          <DefaultResultsHeader>박스오피스 TOP 10</DefaultResultsHeader>
        )}
        <SearchResults
          results={results || []}
          onMovieClick={handleMovieClick}
          onDefaultMovieClick={handleDefaultMovieClick}
          isLoading={isLoading}
          activeTab={activeTab}
          defaultResults={defaultResults || []}
          searchTerm={searchTerm}
        />
      </ContentWrapper>
      {showTopButton && <TopButton onClick={scrollToTop} />}
    </Container>
  );
};

export default SearchForReview;
