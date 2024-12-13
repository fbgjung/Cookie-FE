import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Notification from "../common/Notification";
import useUserStore from "../../stores/useUserStore";

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

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    margin-left: 10px;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.getUserInfo());

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <HeaderContainer>
      <Logo onClick={handleLogoClick}>
        <span>로고</span>
      </Logo>
      <div className="header-right">
        {userInfo.nickname ? <Notification /> : <button>로그인</button>}
      </div>
    </HeaderContainer>
  );
};

export default Header;
