import serverBaseUrl from "./apiConfig";
import googleLogin from "/assets/images/login/google.svg";
import naverLogin from "/assets/images/login/naver.png";

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
