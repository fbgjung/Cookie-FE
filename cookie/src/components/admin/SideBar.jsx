import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import CookieLogo from "/assets/images/cookie-logo.png";
import logout from "../../assets/images/admin/logout.svg";
import setting from "../../assets/images/admin/setting.svg";
// import movie from "../../assets/images/admin/movie.svg";
import award from "../../assets/images/admin/award.svg";
import cookie from "../../assets/images/admin/cookie.svg";
import movie from "../../assets/images/admin/movies.svg";

const PageNav = styled.div`
  width: 409px;
  position: fixed;
  left: 0;
  background-color: #000000;
  margin-right: 2rem;
  padding: 1.5rem;
  color: white;
  font-size: 22px;
  height: 100vh;
  box-sizing: border-box;
`;

const SideBarTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .title__logo {
    margin-right: auto;
    margin-left: 20px;
    width: 130px;
    height: 100px;
    object-fit: cover;
  }

  span {
    margin-right: 0.8rem;
    font-weight: bold;
    color: #ffffff;
  }
  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    margin-top: 5px;
  }
`;

const SideBarContainer = styled.div`
  margin: 5rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  .sidebar__menu {
    background-color: white;
    width: 320px;
    border-radius: 12px;
    padding: 0.5rem;
    color: #a7a7a7;
    font-weight: bold;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: start;
    transition: color 0.3s ease;
    cursor: pointer;
  }
  .sidebar__menu:hover {
    color: #000000;
  }
  img {
    margin-right: 0.5rem;
    width: 30px;
  }
  .active {
    color: #000000;
  }
  .inactive {
    color: var(--sub-text);
  }
`;

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const sideMenu = [
    {
      image: movie,
      title: "Movie",
      link: "/admin/movie",
    },
    {
      image: setting,
      title: "Review / Like",
      link: "/admin/reviews-likes",
    },
    {
      image: award,
      title: "Match Up",
      link: "/admin/matchup",
    },
    {
      image: cookie,
      title: "Badge",
      link: "/admin/badge",
    },
  ];

  const handleClick = (link) => {
    navigate(link);
  };

  const handleLogout = () => {
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    navigate("/admin");
    alert("로그아웃 되었어요!");
  };

  return (
    <PageNav>
      <SideBarTitle>
        <img src={CookieLogo} className="title__logo" alt="logo_icon" />
        <span> Admin</span>
        <button onClick={handleLogout} type="button">
          <img src={logout} />
        </button>
      </SideBarTitle>
      <SideBarContainer>
        {sideMenu.map((menuItem, index) => (
          <div
            key={index}
            className={`sidebar__menu ${location.pathname === menuItem.link ? "active" : "inactive"}`}
            onClick={() => handleClick(menuItem.link)}
          >
            <img src={menuItem.image} alt={`${menuItem.title}_icon`} />
            <p>{menuItem.title}</p>
          </div>
        ))}
      </SideBarContainer>
    </PageNav>
  );
}

export default SideBar;
