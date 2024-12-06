import googleLogin from "../assets/images/login/google_OAuth.svg";
import naverLogin from "../assets/images/login/naver_OAuth.svg";
import serverBaseUrl from "./apiConfig";

export const OAuth_LOGIN_PROVIDER = {
  GOOGLE: {
    img: googleLogin,
    url: `${serverBaseUrl}/oauth2/authorization/google`,
  },
  NAVER: {
    img: naverLogin,
    url: `${serverBaseUrl}/oauth2/authorization/naver`,
  },
};
