import PropTypes from "prop-types";
import styled from "styled-components";

// "검색 결과 없음" 메시지 스타일
const NoResultsMessage = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-top: 20px;
`;

// "로딩 중" 메시지 스타일
const LoadingMessage = styled.p`
  font-size: 16px;
  color: #999;
  text-align: center;
  margin-top: 20px;
`;

// 검색 결과 리스트 스타일
const ResultItem = styled.div`
  cursor: pointer;
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 80px;
    height: 120px;
    object-fit: cover;
    border-radius: 4px;
  }

  h4 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }
`;

const SearchResults = ({ results, activeTab, onMovieClick, isLoading }) => {
  // 로딩 중일 때 표시
  if (isLoading) {
    return <LoadingMessage>로딩 중...</LoadingMessage>;
  }

  // 검색 결과가 없을 때 표시
  if (!results || results.length === 0) {
    return <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>;
  }

  // 검색 결과를 렌더링
  return (
    <div>
      {results.map((item) => (
        <ResultItem key={item.id} onClick={() => onMovieClick(item.id)}>
          <img
            src={item.poster || item.profileImage}
            alt={item.title || item.name}
          />
          <div>
            <h4>{item.title || item.name}</h4>
            {activeTab === "movie" && (
              <p>
                {item.plot} / {item.releasedAt}
              </p>
            )}
          </div>
        </ResultItem>
      ))}
    </div>
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