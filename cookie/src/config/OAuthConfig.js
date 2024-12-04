import serverBaseUrl from "./apiConfig";
import googleLogin from "../assets/images/login/google_OAuth.svg";
import naverLogin from "../assets/images/login/naver_OAuth.svg";

export const OAuth_LOGIN_PROVIDER = {
  GOOGLE: {
    img: googleLogin,
    url: "http://localhost:8080/oauth2/authorization/google",
  },
  NAVER: {
    img: naverLogin,
    url: "https://www.cookiekie.com/oauth2/authorization/naver",
  },
};
