import { API_CONFIG } from "./apiConfig";
import googleLogin from "../assets/images/login/google_OAuth.svg";
import naverLogin from "../assets/images/login/naver_OAuth.svg";

export const OAuth_LOGIN_PROVIDER = {
  GOOGLE: {
    img: googleLogin,
    url: `${API_CONFIG.serverBaseUrl}/auth/google`,
  },
  NAVER: {
    img: naverLogin,
    url: `${API_CONFIG.serverBaseUrl}/auth/naver`,
  },
};
