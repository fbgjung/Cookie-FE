import GlobalStyle from "../styles/global";
import CookieImg from "../assets/images/login/cookie_img.svg";
import CookieLogo from "../assets/images/login/cookie_lg.svg";
import styled from "styled-components";
import { OAuth_LOGIN_PROVIDER } from "../config/OAuthConfig";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

export const LoginContainer = styled.div`
  background-color: #000000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  h2 {
    margin-top: 2rem;
    color: #f84b99;
    font-weight: bold;
  }

  .login__img {
    margin: 0.5rem 0;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.25rem;
    }
    .login__img {
      margin: 1.5rem 0;
      width: 10rem;
      height: auto;
    }
    .logo {
      width: 10rem;
      height: auto;
      padding: 0;
    }
  }
`;

export const LoginBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  button {
    background: none;
    border: none;
  }

  img {
    width: 20rem;
    height: auto;
    margin: 0.5rem 0;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    button img {
      margin-top: 1rem;
      width: 20rem;
      height: auto;
      margin: 1;
    }
  }
`;

const GuestLink = styled.div`
  position: absolute;
  top: 10rem;
  right: 1rem;
  font-size: 1rem;
  color: #ffff;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #909090;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    top: 2rem;
  }
`;

function Login() {
  const navigate = useNavigate();
  const guestLogin = useAuthStore((state) => state.guestLogin);

  const handleLoginClick = (url) => {
    window.location.href = url;
  };

  const handleGuestAccess = () => {
    guestLogin();
    navigate("/");
  };

  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        <GuestLink onClick={handleGuestAccess}>게스트로 이용하기</GuestLink>
        <h2 className="regular">“영화 리뷰와 투표, 영화 vs 영화 토론까지!</h2>
        <h2 className="regular">영화 팬들을 위한 종합 커뮤니티”</h2>
        <img className="login__img logo" src={CookieLogo} alt="logo" />
        <img className="login__img" src={CookieImg} alt="logoImg" />
        <LoginBtn>
          {Object.entries(OAuth_LOGIN_PROVIDER).map(([key, { img, url }]) => (
            <button key={key} onClick={() => handleLoginClick(url)}>
              <img src={img} alt={`${key}Login`} />
            </button>
          ))}
        </LoginBtn>
      </LoginContainer>
    </>
  );
}

export default Login;
