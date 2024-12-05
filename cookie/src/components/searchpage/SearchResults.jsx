import PropTypes from "prop-types";
import styled from "styled-components";

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$isGrid ? "repeat(3, 1fr)" : "1fr"};
  gap: 10px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const ResultItem = styled.div`
  display: ${(props) => (props.$isGrid ? "block" : "flex")};
  align-items: ${(props) => (props.$isGrid ? "center" : "flex-start")};
  gap: ${(props) => (props.$isGrid ? "0" : "10px")};
  cursor: pointer;
`;

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

const SearchResults = ({ results, onMovieClick, isLoading, activeTab }) => {
  if (isLoading) {
    return <Message>로딩 중...</Message>;
  }

  if (!isLoading && (!results || results.length === 0)) {
    return <Message>검색 결과가 없습니다.</Message>;
  }

  return (
    <ResultsContainer $isGrid={false}>
      {results.map((result) => (
        <ResultItem key={result.id} onClick={() => onMovieClick(result.id)}>
          <Poster src={result.poster || result.profileImage} alt={result.title || result.name} />
          <Content>
            <Title>{result.title || result.name}</Title>
            {activeTab === "movie" && (
              <Subtitle>
                {result.plot} · {result.releasedAt} · {result.runtime}분
              </Subtitle>
            )}
          </Content>
        </ResultItem>
      ))}
    </ResultsContainer>
  );
};

SearchResults.propTypes = {
  results: PropTypes.array.isRequired, // 검색 결과 배열
  onMovieClick: PropTypes.func.isRequired, // 영화 클릭 핸들러
  isLoading: PropTypes.bool.isRequired, // 로딩 상태
  activeTab: PropTypes.string.isRequired, // 현재 활성화된 탭
};

export default SearchResults;