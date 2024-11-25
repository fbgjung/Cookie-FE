import styled from "styled-components";
import cookieLogo from "../../assets/images/admin/cookieLogo.svg";
import logout from "../../assets/images/admin/logout.svg";
import setting from "../../assets/images/admin/setting.svg";
import cookieSm from "../../assets/images/admin/cookie_sm.svg";
import movie from "../../assets/images/admin/movie.svg";
import award from "../../assets/images/admin/award.svg";
import cookie from "../../assets/images/admin/cookie.svg";

const PageNav = styled.div`
  width: 409px;
  background-color: var(--main);
  height: 100vh;
  margin: 0 0;
  padding: 1.5rem;
  color: white;
  font-size: 22px;
`;

const SideBarTitle = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;

  .title__logo {
    margin-right: auto;
  }

  span {
    margin-right: 0.8rem;
    font-weight: bold;
  }
`;

const SideBarContainer = styled.div`
  margin: 5rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  .sidebar__menu {
    background-color: white;
    width: 327px;
    height: 50px;
    border-radius: 12px;
    padding: 0.5rem;
    color: var(--main);
    font-weight: bold;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: start;
  }

  img {
    margin-right: 0.5rem;
    width: 40px;
  }
`;

function sideBar() {
  const sideMenu = [
    {
      image: movie,
      title: "Movie",
    },
    {
      image: setting,
      title: "Review / Like",
    },
    {
      image: award,
      title: "Match Up",
    },
    {
      image: cookie,
      title: "Badge",
    },
  ];

  return (
    <PageNav>
      <SideBarTitle>
        <img src={cookieLogo} className="title__logo" alt="logo_icon" />
        <span> Admin</span>
        <img src={logout} />
      </SideBarTitle>
      <SideBarContainer>
        {sideMenu.map((menuItem, index) => (
          <div key={index} className="sidebar__menu">
            <img src={menuItem.image} alt={`${menuItem.title}_icon`} />
            <p>{menuItem.title}</p>
          </div>
        ))}
      </SideBarContainer>
    </PageNav>
  );
}

export default sideBar;
