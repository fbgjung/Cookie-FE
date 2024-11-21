import styled from "styled-components";
import specialMovie from "../assets/images/main/special_icon.svg";
import cookieMovie from "../assets/images/main/video_icon.svg";
import MatchUpContainer from "../components/main/MatchUpContainer";
import GlobalStyle from "../styles/global";

const CommonContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const MainContainer = styled(CommonContainer)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
  padding-bottom: 60px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 1rem;

  @media (max-width: 600px) {
    padding: 15px;
  }
`;

const HeaderWrapper = styled(CommonContainer)`
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: #04012d;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 0 10px;
  }
`;

const NavbarWrapper = styled(CommonContainer)`
  position: fixed;
  bottom: 0;
  z-index: 100;
  background-color: #ffffff;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 0 10px;
  }
`;

const Main = () => {
  const dummyMovies = [
    {
      matchTitle: "박찬욱 감독의 복수 3부작 빅매치",
      data: [
        {
          id: 1,
          poster: "https://via.placeholder.com/83x118",
          movie: "올드보이",
          matchDate: "2024-12-31",
        },
        {
          id: 2,
          poster: "https://via.placeholder.com/83x118",
          movie: "복수는나의것",
          matchDate: "2024-12-31",
        },
      ],
    },
  ];

  return (
    <>
      <GlobalStyle />
      <HeaderWrapper></HeaderWrapper>
      <MainContainer>
        <img src={"https://via.placeholder.com/600x250"} alt="배너" />
        <Content>
          <MatchUpContainer dummydata={dummyMovies} />
        </Content>
      </MainContainer>
      <NavbarWrapper></NavbarWrapper>
    </>
  );
};

export default Main;
