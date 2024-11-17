import styled from "styled-components";
import CookieLogo from "/src/assets/images/Cookie.svg";
import NotificationIcon from "/src/assets/images/Notification.svg";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #04012d;
  padding: 10px 20px;
  height: 40px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 40px;
  }

  span {
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    margin-left: 10px;
    font-family: "Inter", sans-serif;
  }
`;

const Notification = styled.div`
  img {
    height: 30px;
    cursor: pointer;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>
        <img src={CookieLogo} alt="Cookie Logo" />
      </Logo>
      <Notification>
        <img src={NotificationIcon} alt="Notification Icon" />
      </Notification>
    </HeaderContainer>
  );
};

export default Header;
