import styled from "styled-components";
import { useLocation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import AppPages from "./AppPages";
import CookieLogo from "/src/assets/images/Cookie.svg";

import HomeIcon from "/src/assets/images/navbar_home.svg";
import SearchIcon from "/src/assets/images/navbar_search.svg";
import ReviewIcon from "/src/assets/images/navbar_review.svg";
import MatchupIcon from "/src/assets/images/navbar_matchup.svg";
import ProfileIcon from "/src/assets/images/navbar_profile.svg";
import { Link } from "react-router-dom";
import Notification from "../components/Notification";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  width: 100%;
  max-width: 600px; // 데스크톱에서는 최대 너비 유지
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%; // 모바일에서 전체 너비 사용
    padding: 0; // 좌우 패딩 제거
  }
`;

const ViewArea = styled.div`
  width: 100vw; // 뷰포트 전체 너비 사용
  max-width: 100%; // 최대 너비 100%로 설정
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media (min-width: 769px) {
    max-width: 600px; // 데스크톱에서만 최대 너비 제한
    border-left: 1px solid var(--border-divider);
    border-right: 1px solid var(--border-divider);
  }

  @media (max-width: 768px) {
    width: 100%; // 모바일에서 100% 너비
    border: none; // 보더 제거
    margin: 0; // 마진 제거
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
  height: 60px;
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
  cursor: pointer;

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

const MainContent = styled.main`
  flex: 1;
  width: 100%; // 전체 너비 사용
  max-width: 100%; // 최대 너비 100%
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: calc(100vh - 130px); // 헤더와 네비게이션 높이 고려

  @media (max-width: 768px) {
    width: 100vw; // 모바일에서 뷰포트 전체 너비
    padding: 0; // 패딩 제거
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-y: contain;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%; // 전체 너비 사용
  position: relative;
  background-color: white;
  margin: 0;
  padding: 0;
`;

const AppScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };
  const hideHeaderFooterPages = [
    "/login",
    "/sign-up-profile",
    "/sign-up-genre",
    "/admin",
  ];

  return (
    <Container>
      <ViewArea>
        <AppContainer>
          <Toaster
            toastOptions={{
              style: {
                background: "#ffffff",
                color: "#333333",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
              },
            }}
          />
          {/* 헤더 */}
          {!hideHeaderFooterPages.includes(location.pathname) && (
            <HeaderContainer>
              <Logo onClick={handleLogoClick}>
                <img src={CookieLogo} alt="Cookie Logo" />
              </Logo>
              <Notification />
            </HeaderContainer>
          )}
          {/* 메인 콘텐츠 */}
          <MainContent>
            <ScrollToTop />
            <AppPages />
          </MainContent>
          {/* 네비게이션 */}
          {!hideHeaderFooterPages.includes(location.pathname) && (
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
          )}
        </AppContainer>
      </ViewArea>
    </Container>
  );
};

export default AppScreen;
