import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const skeletonLoading = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 0%;
  }
`;

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 항상 3열로 표시 */
  gap: 15px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 10px; /* 모바일 환경에서 간격 줄이기 */
    padding: 10px; /* 여백 줄이기 */
  }

  @media (max-width: 480px) {
    gap: 8px; /* 더 좁은 화면에서 간격 더 줄이기 */
    padding: 8px; /* 여백도 최소화 */
  }
`;

const Content = styled.div`
  display: ${(props) => (props.$isGrid ? "none" : "flex")};
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const ResultItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  height: auto; /* 자동 높이 */
  aspect-ratio: 2/3; /* 포스터 비율 유지 */
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
  }
`;

const PosterSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 2/3;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${skeletonLoading} 1.5s infinite;
  border-radius: 8px;
  min-height: 250px;
  display: ${(props) => (props.isLoading ? "block" : "none")};
`;

const Poster = styled.img`
  width: 100%; /* 부모 컨테이너의 너비에 맞춤 */
  height: 100%
  aspect-ratio: 2/3; /* 가로 세로 비율 유지 */
  object-fit: cover; /* 이미지가 비율에 맞게 잘리도록 설정 */
  border-radius: 8px;
  background-color: #2c2c2c; /* 로딩 중일 때 배경 색상 */
  display: ${(props) => (props.isLoading ? "none" : "block")};
`;

const Message = styled.p`
  font-size: 16px;
  color: white;
  text-align: center;
  margin-top: 20px;
`;

const EndMessage = styled.p`
  font-size: 16px;
  color: #aaaaaa; /* Softer color for less visual disruption */
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
  width: 100%; /* Ensure full width */
  padding: 10px;
  box-sizing: border-box; /* Include padding in width calculation */
  position: relative; /* For better layout stability */
`;

const SearchResultsForReview = ({
  results,
  onMovieClick,
  onDefaultMovieClick,
  isLoading,
  activeTab,
  defaultResults,
  searchTerm,
  hasMore,
  fetchMoreResults,
}) => {
  // 로딩 중일 때 "로딩 중..." 메시지 표시
  if (isLoading) {
    return <Message>로딩 중...</Message>;
  }

  // 검색 결과가 없을 때 "검색 결과가 없습니다." 메시지 표시
  if (!isLoading && searchTerm.trim() && results.length === 0) {
    return <Message>검색 결과가 없습니다.</Message>;
  }

  const displayResults = results.length > 0 ? results : defaultResults;

  return (
    <div>
      <ResultsContainer>
        {displayResults.map((result) => (
          <ResultItem
          key={result.id || result.movieId}
          onClick={() =>
            results.length > 0
              ? onMovieClick(result) // 검색된 영화 클릭 시
              : onDefaultMovieClick(result) // 디폴트 영화 클릭 시
          }
        >
            <PosterSkeleton isLoading={isLoading} />
            <Poster
              src={result.poster || result.profileImage}
              alt={result.title || result.name}
              isLoading={isLoading}
            />
            <Title>{result.title || result.name}</Title>
          </ResultItem>
        ))}
      </ResultsContainer>
    </div>
  );
};

SearchResultsForReview.propTypes = {
  results: PropTypes.array.isRequired, // 검색 결과 배열
  defaultResults: PropTypes.array.isRequired, // 기본 검색 결과 배열
  onMovieClick: PropTypes.func.isRequired, // 영화 클릭 핸들러
  onDefaultMovieClick: PropTypes.func.isRequired, // 디폴트 영
  isLoading: PropTypes.bool.isRequired, // 로딩 상태
  activeTab: PropTypes.string.isRequired, // 현재 활성화된 탭
  searchTerm: PropTypes.string.isRequired, // 검색어
  hasMore: PropTypes.bool.isRequired, // 추가 데이터를 더 불러올 수 있는지 여부
  fetchMoreResults: PropTypes.func.isRequired, // 더 많은 결과를 불러오는 함수
};

export default SearchResultsForReview;
