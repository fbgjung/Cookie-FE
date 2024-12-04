import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import testImage from "../../assets/images/test.png"; // 더미 이미지 경로

// 그리드 또는 리스트 컨테이너
const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$isGrid ? "repeat(3, 1fr)" : "1fr"};
  gap: 10px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

// 개별 결과 항목 스타일
const ResultItem = styled.div`
  display: ${(props) => (props.$isGrid ? "block" : "flex")};
  align-items: ${(props) => (props.$isGrid ? "center" : "flex-start")};
  gap: ${(props) => (props.$isGrid ? "0" : "10px")};
  cursor: pointer;
`;

// 포스터 이미지 스타일
const Poster = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1.4;
  object-fit: cover;
  border-radius: 5px;
`;

const Content = styled.div`
  display: ${(props) => (props.$isGrid ? "none" : "flex")};
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: gray;
`;

const Message = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-top: 20px;
`;

const SearchResults = ({ results, onMovieClick, isLoading }) => {
  const navigate = useNavigate();
  const isGrid = results.length === 0;

  if (isLoading) {
    return <Message>로딩 중...</Message>;
  }

  if (!isLoading && isGrid) {
    return (
      <ResultsContainer $isGrid={isGrid}>
        {Array.from({ length: 9 }).map((_, index) => (
          <ResultItem
            key={`dummy-${index}`}
            $isGrid={isGrid}
            onClick={() => navigate(`/movie/1`)} // 더미 데이터 클릭 시 이동
          >
            <Poster
              src={testImage} // 더미 이미지 경로
              alt={`Dummy ${index + 1}`}
              $isGrid={isGrid}
            />
          </ResultItem>
        ))}
      </ResultsContainer>
    );
  }

  return (
    <ResultsContainer $isGrid={isGrid}>
      {results.map((result) => (
        <ResultItem
          key={result.id}
          $isGrid={isGrid}
          onClick={() => onMovieClick(result.id)}
        >
          <Poster
            src={result.poster || result.posterUrl}
            alt={result.title || result.name}
            $isGrid={isGrid}
          />
          <Content $isGrid={isGrid}>
            <Title>{result.title || result.name}</Title>
            <Subtitle>{result.plot || result.subtitle}</Subtitle>
          </Content>
        </ResultItem>
      ))}
    </ResultsContainer>
  );
};

SearchResults.propTypes = {
  results: PropTypes.array.isRequired, // 검색 결과 배열
  activeTab: PropTypes.string.isRequired, // 활성화된 탭 (movie, actor, director)
  onMovieClick: PropTypes.func.isRequired, // 영화 클릭 핸들러
  isLoading: PropTypes.bool, // 로딩 상태
};

SearchResults.defaultProps = {
  results: [], // 기본 검색 결과는 빈 배열
  isLoading: false, // 기본 로딩 상태는 false
};

export default SearchResults;