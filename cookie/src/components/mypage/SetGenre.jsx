import { useState } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  background-color: white;
  min-height: 60vh; /* 화면 전체 높이 */
  padding: 2rem 1rem 0 1rem; /* 위쪽 여백 줄임 */

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 0 1rem; /* 태블릿 크기에서 패딩 조정 */
    min-height: 40vh; /* 화면 전체 높이 */
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem 0 0.5rem; /* 모바일 크기에서 패딩 최소화 */
    min-height: 40vh; /* 화면 전체 높이 */
  }
`;

const SubTitle = styled.div`
  margin: 1rem 1rem 1.5rem;

  h3 {
    color: var(--main);
    margin: 0;
    font-size: 1.2rem;
    margin-left: 10px;
    text-align: center; /* 모바일에서 가운데 정렬 */
    margin-left: 0; /* 왼쪽 여백 제거 */

    @media (max-width: 768px) {
      font-size: 1.3rem;
    }

    @media (max-width: 480px) {
      font-size: 1.1rem;
      text-align: center; /* 모바일에서 가운데 정렬 */
      margin-left: 0; /* 왼쪽 여백 제거 */
    }
  }

  p {
    color: var(--main);
    margin: 0;
    font-size: 1rem;
    margin-left: 10px;
    text-align: center; /* 모바일에서 가운데 정렬 */
    margin-left: 0; /* 왼쪽 여백 제거 */

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
      text-align: center; /* 모바일에서 가운데 정렬 */
      margin-left: 0; /* 왼쪽 여백 제거 */
    }
  }
`;

const ThemeContainer = styled.div`
  margin: 1rem auto; /* 위아래 간격과 좌우 가운데 정렬 */
  display: flex;
  flex-wrap: wrap; /* 여러 줄로 배치 가능 */
  gap: 1rem; /* 버튼 간격 */
  justify-content: center; /* 버튼 중앙 정렬 */
  align-items: center; /* 버튼 수직 정렬 */
  width: 85%;

  @media (max-width: 768px) {
    gap: 0.8rem; /* 태블릿 크기에서 버튼 간격 줄임 */
    width: 75%;
  }

  @media (max-width: 480px) {
    gap: 0.6rem; /* 모바일 크기에서 버튼 간격 줄임 */
    width: 65%;
    margin: 1rem auto; /* 좌우 여백 자동 */
  }
`;

const ThemeBtn = styled.button`
  background-color: ${(props) =>
    props.$isSelected ? "var(--main)" : "var(--sub-btn)"};
  color: ${(props) => (props.$isSelected ? "white" : "var(--main)")};
  border-radius: 5rem;
  padding: 0.8rem 1rem;
  border: none;
  cursor: pointer;

  font-size: 1rem; /* 기본 버튼 폰트 크기 */

  &:hover {
    background-color: var(--main);
    color: white;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem; /* 태블릿 크기에서 패딩 줄임 */
    font-size: 0.9rem; /* 버튼 글꼴 크기 줄임 */
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.6rem; /* 모바일 크기에서 패딩 최소화 */
    font-size: 0.8rem; /* 버튼 글꼴 크기 더 줄임 */
  }
`;

const SetGenre = () => {
  const MovieGenre = [
    { id: 1, genre: "로맨스" },
    { id: 2, genre: "공포" },
    { id: 3, genre: "코미디" },
    { id: 4, genre: "액션" },
    { id: 5, genre: "판타지" },
    { id: 6, genre: "애니메이션" },
    { id: 7, genre: "범죄" },
    { id: 8, genre: "SF" },
    { id: 9, genre: "음악" },
    { id: 10, genre: "스릴러" },
    { id: 11, genre: "전쟁" },
    { id: 12, genre: "다큐멘터리" },
    { id: 13, genre: "드라마" },
    { id: 14, genre: "가족" },
    { id: 15, genre: "역사" },
    { id: 16, genre: "미스터리" },
    { id: 17, genre: "TV영화" },
    { id: 18, genre: "서부극" },
    { id: 19, genre: "모험" },
  ];

  const [selectedGenreId, setSelectedGenreId] = useState(null);

  const handleButtonClick = (id) => {
    setSelectedGenreId(id);
  };

  return (
    <MainContainer>
      <SubTitle>
        <h3>어떤 장르로 수정할까요?👀</h3>
        <p>좋아하는 장르 1개를 골라주세요</p>
      </SubTitle>
      <ThemeContainer>
        {MovieGenre.map((item) => (
          <ThemeBtn
            key={item.id}
            $isSelected={selectedGenreId === item.id}
            onClick={() => handleButtonClick(item.id)}
          >
            {item.genre}
          </ThemeBtn>
        ))}
      </ThemeContainer>
    </MainContainer>
  );
};

export default SetGenre;
