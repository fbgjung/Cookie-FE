import PropTypes from "prop-types";
import styled from "styled-components";

const MainContainer = styled.div`
  min-height: 60vh;
  padding: 2rem 1rem 0 1rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 0 1rem;
    min-height: 40vh;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem 0 0.5rem;
    min-height: 40vh;
  }
`;

const SubTitle = styled.div`
  margin: 1rem 1rem 1.5rem;

  h3 {
    color: #f84b99;
    margin: 0;
    font-size: 1.2rem;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 1.3rem;
    }

    @media (max-width: 480px) {
      font-size: 1.1rem;
    }
  }

  p {
    color: #707070;
    margin: 0;
    font-size: 1rem;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`;

const ThemeContainer = styled.div`
  margin: 1rem auto 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  width: 85%;

  @media (max-width: 768px) {
    gap: 0.4rem;
    width: 75%;
  }

  @media (max-width: 480px) {
    gap: 0.4rem;
    width: 80%;
    margin: 1rem auto 0;
  }
`;

const ThemeBtn = styled.button`
  background-color: ${(props) => (props.$isSelected ? "#f84b99" : "white")};
  color: ${(props) => (props.$isSelected ? "#fdf8fa" : "#02172a")};
  border-radius: 12px;
  padding: 0.6rem 1rem;
  border: 1px solid #f84b99;
  cursor: pointer;

  &:hover {
    background-color: #f84b99;
    color: #fdf8fa;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.6rem;
    font-size: 0.8rem;
  }
`;

const SetGenre = ({ selectedGenreId, onSelectGenre }) => {
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

  const handleButtonClick = (id) => {
    onSelectGenre(id);
  };

  return (
    <MainContainer>
      <SubTitle>
        <h3>좋아하는 장르 1개를 골라주세요👀</h3>
        <p>해당 장르 영화의 새로운 리뷰 알림을 받아볼 수 있어요.</p>
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

SetGenre.propTypes = {
  selectedGenreId: PropTypes.number.isRequired,
  onSelectGenre: PropTypes.func.isRequired,
};

export default SetGenre;
