import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import AppPages from "./AppPages";
import CookieLogo from "/src/assets/images/Cookie.svg";
import NotificationIcon from "/src/assets/images/Notification.svg";
import HomeIcon from "/src/assets/images/navbar_home.svg";
import SearchIcon from "/src/assets/images/navbar_search.svg";
import ReviewIcon from "/src/assets/images/navbar_review.svg";
import MatchupIcon from "/src/assets/images/navbar_matchup.svg";
import ProfileIcon from "/src/assets/images/navbar_profile.svg";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  width: 600px;
`;

const ViewArea = styled.div`
  width: 100%;
  max-width: 600px;
  min-width: 360px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  border-left: 1px solid var(--border-divider);
  border-right: 1px solid var(--border-divider);
  margin: 0 auto;

  @media (max-width: 1440px) {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #04012d;
  padding: 15px 20px;
  height: 70px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContainer = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  padding: 5px 20px;
  height: 50px;
  box-sizing: border-box;
  border-top: 1px solid #e5e7eb;
  position: sticky;
  bottom: 0;
  z-index: 100;

  img {
    width: 50px;
    height: 50px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 40px;
    transition: height 0.2s ease;

    @media (max-width: 768px) {
      height: 35px;
    }

    @media (max-width: 480px) {
      height: 30px;
    }
  }

  span {
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    margin-left: 10px;
    font-family: "Inter", sans-serif;
    transition: font-size 0.2s ease;

    @media (max-width: 768px) {
      font-size: 20px;
    }

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }
`;

const Notification = styled.div`
  img {
    height: 30px;
    cursor: pointer;
    transition: height 0.2s ease;

    @media (max-width: 768px) {
      height: 25px;
    }

    @media (max-width: 480px) {
      height: 20px;
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: calc(100vh - 120px);
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  background-color: white;
`;

const AppScreen = () => {
  return (
    <Container>
      <ViewArea>
        <BrowserRouter>
          <AppContainer>
            <HeaderContainer>
              <Logo>
                <img src={CookieLogo} alt="Cookie Logo" />
              </Logo>
              <Notification>
                <img src={NotificationIcon} alt="Notification Icon" />
              </Notification>
            </HeaderContainer>

            <MainContent>
              <ScrollToTop />
              <AppPages />
            </MainContent>

            <NavContainer>
              <Link to="/">
                <img src={HomeIcon} alt="홈" />
              </Link>
              <Link to="/search">
                <img src={SearchIcon} alt="검색" />
              </Link>
              <Link to="/review">
                <img src={ReviewIcon} alt="리뷰" />
              </Link>
              <Link to="/matchup">
                <img src={MatchupIcon} alt="매치업" />
              </Link>
              <Link to="/mypage">
                <img src={ProfileIcon} alt="내정보" />
              </Link>
            </NavContainer>
          </AppContainer>
        </BrowserRouter>
      </ViewArea>
    </Container>
  );
};

export default AppScreen;
