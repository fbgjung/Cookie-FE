import styled from "styled-components";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";
import AppPages from "./AppPages";
// import CookieLogo from "/src/assets/images/Cookie.svg";
import useUserStore from "../stores/useUserStore";

import HomeIcon from "/src/assets/images/navbar_home.svg";
import SearchIcon from "/src/assets/images/navbar_search.svg";
import ReviewIcon from "/src/assets/images/navbar_review.svg";
import MatchupIcon from "/src/assets/images/navbar_matchup.svg";
import ProfileIcon from "/src/assets/images/navbar_profile.svg";

import SelectedHomeIcon from "/src/assets/images/selected_home.svg";
import SelectedSearchIcon from "/src/assets/images/selected_search.svg";
import SelectedReviewIcon from "/src/assets/images/selected_review.svg";
import SelectedMatchupIcon from "/src/assets/images/selected_matchup.svg";
import SelectedProfileIcon from "/src/assets/images/selected_profile.svg";

import Notification from "../components/common/Notification";
import { Toaster } from "react-hot-toast";
import ToggleSwitch from "../components/common/ToggleSwitch";
import useAuthStore from "../stores/useAuthStore";

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0;
  }
`;

const ViewArea = styled.div`
  width: 100vw;
  max-width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;

  @media (min-width: 769px) {
    max-width: 600px;
    border-left: 1px solid var(--border-divider);
    border-right: 1px solid var(--border-divider);
  }

  @media (max-width: 768px) {
    width: 100%;
    border: none;
    margin: 0;
  }
`;

const HeaderContainer = styled.header`
  width: 100vw;
  display: flex;
  max-width: 600px;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  padding: 15px 20px;
  height: 70px;
  box-sizing: border-box;
  /* border-bottom: 1px solid rgba(255, 255, 255, 0.1); */
  position: fixed;
  top: 0;
  z-index: 100;

  .header-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-right button {
    cursor: pointer;
    border-radius: 0.7rem;
    padding: 0.4rem 1rem;
    border: none;
  }
`;

const NavContainer = styled.nav`
  width: 100vw;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  padding: 5px 20px;
  height: 60px;
  box-sizing: border-box;
  border-top: 1px solid #e5e7eb;
  position: fixed;
  bottom: 0;
  z-index: 100;
`;

const NavIcon = styled.img`
  width: 50px;
  height: 50px;
  transition:
    transform 0.2s ease-in-out,
    opacity 0.2s ease-in-out;

  ${({ selected }) =>
    selected &&
    `
    transform: scale(1.2);
    opacity: 1;
  `}

  &:hover {
    transform: scale(1.15);
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
  width: 100vw;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 70px;
  margin-bottom: 60px;
  padding: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100vw;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-y: contain;
  }

  @media (min-width: 769px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
  background-color: white;
  margin: 0;
  padding: 0;
`;

const AppScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.getUserInfo());
  const { openLoginModal } = useAuthStore();
  const handleLogoClick = () => {
    navigate("/");
  };

  const hideHeaderFooterPages = [
    "/login",
    "/sign-up-profile",
    "/sign-up-genre",
    "/admin",
  ];
  const isAuthPage = hideHeaderFooterPages.includes(location.pathname);
  const currentPath = location.pathname;

  const handleLoginClick = () => {
    openLoginModal();
  };

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
          {!isAuthPage && (
            <HeaderContainer>
              <Logo onClick={handleLogoClick}>
                {/* <img src={CookieLogo} alt="Cookie Logo" /> */}
              </Logo>
              <div className="header-right">
                {userInfo.nickName ? (
                  <Notification />
                ) : (
                  <button onClick={handleLoginClick}>로그인</button>
                )}
              </div>
            </HeaderContainer>
          )}
          <MainContent
            style={{
              marginTop: isAuthPage ? 0 : "70px",
              marginBottom: isAuthPage ? 0 : "60px",
            }}
          >
            <ScrollToTop />
            <AppPages />
          </MainContent>
          {!isAuthPage && (
            <NavContainer>
              <Link to="/">
                <NavIcon
                  src={currentPath === "/" ? SelectedHomeIcon : HomeIcon}
                  alt="홈"
                  selected={currentPath === "/"}
                />
              </Link>
              <Link to="/search">
                <NavIcon
                  src={
                    currentPath === "/search" ? SelectedSearchIcon : SearchIcon
                  }
                  alt="검색"
                  selected={currentPath === "/search"}
                />
              </Link>
              <Link to="/review">
                <NavIcon
                  src={
                    currentPath === "/review" ? SelectedReviewIcon : ReviewIcon
                  }
                  alt="리뷰"
                  selected={currentPath === "/review"}
                />
              </Link>
              <Link to="/matchup/1">
                <NavIcon
                  src={
                    currentPath.startsWith("/matchup")
                      ? SelectedMatchupIcon
                      : MatchupIcon
                  }
                  alt="매치업"
                  selected={currentPath.startsWith("/matchup")}
                />
              </Link>
              <Link to="/mypage">
                <NavIcon
                  src={
                    currentPath === "/mypage"
                      ? SelectedProfileIcon
                      : ProfileIcon
                  }
                  alt="내정보"
                  selected={currentPath === "/mypage"}
                />
              </Link>
            </NavContainer>
          )}
        </AppContainer>
      </ViewArea>
    </Container>
  );
};

export default AppScreen;
