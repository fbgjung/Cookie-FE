import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "../styles/global";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  /* background-color: var(--ticket-bg); */
  background-color: white;
  height: 100vh;
  padding: 4.375rem 0 0 0;
`;
const MainTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0 2.5rem;
  line-height: 0.5rem;

  h2 {
    margin: 0.8rem;
    color: var(--main);
  }
`;

const SubTitle = styled.div`
  margin: 2.5rem 3.3rem;

  h3 {
    color: var(--main);
    margin: 0;
  }

  p {
    color: var(--main);
    margin: 0;
    font-size: 0.9rem;
  }
`;

const ThemeContainer = styled.div`
  margin: 2.5rem 3.3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  width: 70%;
`;

const ThemeBtn = styled.button`
  background-color: ${(props) =>
    props.$isSelected ? "var(--main)" : "var(--sub-btn)"};
  color: ${(props) => (props.$isSelected ? "white" : "var(--main)")};
  border-radius: 5rem;
  padding: 0.8rem 1rem;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: var(--main);
    color: white;
  }
`;

const SubmitBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20.6rem;

  button {
    background-color: var(--main);
    color: white;
    width: 29rem;
    height: 4rem;
    border-radius: 0.75rem;
    border: none;
    box-shadow: 0 0.625rem 6.25rem rgba(3, 6, 59, 0.5);
    font-size: 1.2rem;
    outline: none;
    cursor: pointer;
  }
`;

function SignUpTheme() {
  const MovieTheme = [
    {
      id: 1,
      theme: "로맨스",
    },
    {
      id: 2,
      theme: "공포",
    },
    {
      id: 3,
      theme: "코미디",
    },
    {
      id: 4,
      theme: "액션",
    },
    {
      id: 5,
      theme: "판타지",
    },
    {
      id: 6,
      theme: "애니메이션",
    },
    {
      id: 7,
      theme: "범죄",
    },
    {
      id: 8,
      theme: "SF",
    },
    {
      id: 9,
      theme: "음악",
    },
    {
      id: 10,
      theme: "스릴러",
    },
    {
      id: 11,
      theme: "퀴어",
    },
    {
      id: 12,
      theme: "전쟁",
    },
    {
      id: 13,
      theme: "다큐맨터리",
    },
  ];
  const [selectedTheme, setSelectedTheme] = useState([]);
  const navigate = useNavigate();
  const handleButtonClick = (theme) => {
    if (selectedTheme.includes(theme)) {
      setSelectedTheme(selectedTheme.filter((item) => item !== theme));
    } else {
      if (selectedTheme.length < 3) {
        setSelectedTheme([...selectedTheme, theme]);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("선택된 테마:", selectedTheme);
    navigate("/");
  };
  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <MainTitle>
          <h2>선호하는 장르를</h2>
          <h2>알려주세요</h2>
        </MainTitle>
        <SubTitle>
          <h3>어떤 장르를 좋아하나요?👀</h3>
          <p>좋아하는 장르 3개를 골라주세요</p>
        </SubTitle>
        <ThemeContainer>
          {MovieTheme.map((item) => (
            <ThemeBtn
              key={item.id}
              $isSelected={selectedTheme.includes(item.theme)}
              $isSelectable={
                selectedTheme.length < 3 || selectedTheme.includes(item.theme)
              }
              onClick={() => handleButtonClick(item.theme)}
            >
              {item.theme}
            </ThemeBtn>
          ))}
        </ThemeContainer>
        <SubmitBtn>
          <button type="button" onClick={handleSubmit}>
            완료
          </button>
        </SubmitBtn>
      </MainContainer>
    </>
  );
}

export default SignUpTheme;
