import React from "react";
import GlobalStyle from "../styles/global";
import CookieImg from "../assets/images/login/cookie_img.svg";
import CookieLogo from "../assets/images/login/cookie_lg.svg";
import kakaoLogin from "../assets/images/login/kakao_OAuth.svg";
import googleLogin from "../assets/images/login/google_OAuth.svg";
import naverLogin from "../assets/images/login/naver_OAuth.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const LoginContainer = styled.div`
  background-color: var(--main);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: white;
    line-height: 3px;
  }

  .login__img {
    margin: 1rem 0;
  }
`;

export const LoginBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;

  img {
    margin: 0.5rem 0;
    cursor: pointer;
  }
`;

function Login() {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        <h2 className="regular">“영화 리뷰와 투표, 영화 vs 영화 토론까지!</h2>
        <h2 className="regular">영화 팬들을 위한 종합 커뮤니티”</h2>
        <img className="login__img" src={CookieLogo} alt="logo" />
        <img className="login__img" src={CookieImg} alt="logoImg" />
        <LoginBtn>
          <a href="#">
            <img src={kakaoLogin} alt="kakaoLogin" />
          </a>
          <a href="#">
            <img src={googleLogin} alt="googleLogin" />
          </a>
          <a href="#">
            <img
              src={naverLogin}
              alt="naverLogin"
              onClick={() => navigate("/sign-up")}
            />
          </a>
        </LoginBtn>
      </LoginContainer>
    </>
  );
}

export default Login;
