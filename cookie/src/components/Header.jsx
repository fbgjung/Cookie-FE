import styled from "styled-components";
import CookieLogo from "/src/assets/images/Cookie.svg";
import NotificationIcon from "/src/assets/images/Notification.svg";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #04012d;
  padding: 15px 20px;
  height: 70px;
  z-index: 100;
  box-sizing: border-box;
  box-shadow: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 40px;

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

    @media (max-width: 768px) {
      height: 25px;
    }

    @media (max-width: 480px) {
      height: 20px;
    }
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
