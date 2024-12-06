import GlobalStyle from "../styles/global";
import CookieImg from "../assets/images/login/cookie_img.svg";
import CookieLogo from "../assets/images/login/cookie_lg.svg";
import styled from "styled-components";
import { OAuth_LOGIN_PROVIDER } from "../config/OAuthConfig";

export const LoginContainer = styled.div`
  background-color: #fff4b9;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: #724b2e;
  }

  .login__img {
    margin: 1rem 0;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.25rem;
    }
    .login__img {
      margin: 0.3rem 0;
      width: 15rem;
      height: 15rem;
    }
    .logo {
      width: 10rem;
      height: 6rem;
      padding: 0;
    }
  }
`;

export const LoginBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;

  button {
    background: none;
    border: none;
  }
  img {
    margin: 0.5rem 0;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    button img {
      width: 20rem;
      height: 4rem;
      margin: 0;
    }
  }
`;

function Login() {
  const handleLoginClick = (url) => {
    window.location.href = url;
  };
  return (
    <>
      <GlobalStyle />
      <LoginContainer>
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
