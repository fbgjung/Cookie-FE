import { Link } from "react-router-dom";
import styled from "styled-components";

import HomeIcon from "/src/assets/images/navbar_home.svg";
import SearchIcon from "/src/assets/images/navbar_search.svg";
import ReviewIcon from "/src/assets/images/navbar_review.svg";
import MatchupIcon from "/src/assets/images/navbar_matchup.svg";
import ProfileIcon from "/src/assets/images/navbar_profile.svg";

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  height: 50px;
  background-color: white;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  border-top: 1px solid #e5e7eb;
  z-index: 100;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0;
  margin: 0;
  height: 100%;
`;

const NavItem = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
  color: #4b5563;

  & img {
    width: 45px;
    height: 45px;
    margin-bottom: 0.15rem;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <Link to="/">
            <img src={HomeIcon} alt="홈" />
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/search">
            <img src={SearchIcon} alt="검색" />
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/review">
            <img src={ReviewIcon} alt="리뷰" />
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/matchup">
            <img src={MatchupIcon} alt="매치업" />
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/profile">
            <img src={ProfileIcon} alt="내정보" />
          </Link>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default Navbar;
