import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";

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

const NavContainer = styled.nav`
  width: 100vw;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: black; /* 배경 블랙 */
  padding: 5px 20px;
  height: 60px;
  box-sizing: border-box;
  border-top: 1px solid #444; /* 어두운 회색 경계선 */
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

const Footer = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { matchUpId } = useUserStore((state) => state.getUserInfo());

  return (
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
          src={currentPath === "/search" ? SelectedSearchIcon : SearchIcon}
          alt="검색"
          selected={currentPath === "/search"}
        />
      </Link>
      <Link to="/review">
        <NavIcon
          src={currentPath === "/review" ? SelectedReviewIcon : ReviewIcon}
          alt="리뷰"
          selected={currentPath === "/review"}
        />
      </Link>
      <Link to={`/matchup/${matchUpId || 1}`}>
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
          src={currentPath === "/mypage" ? SelectedProfileIcon : ProfileIcon}
          alt="내정보"
          selected={currentPath === "/mypage"}
        />
      </Link>
    </NavContainer>
  );
};

export default Footer;
