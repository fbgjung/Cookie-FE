import styled from "styled-components";
import GlobalStyle from "../styles/global";
import SideBar from "../components/admin/SideBar";
import CookieLogo from "../assets/images/admin/CookieAdmin.svg";
import CookieImg from "../assets/images/admin/cookie_img.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../api/auth/axiosInstance";

const Viewport = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    font-weight: bold;
    font-size: 25px;
  }
`;

const FormContanier = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem;
  justify-content: center;
  align-items: center;

  label {
    font-size: 1rem;
    color: var(--main);
  }

  input {
    display: block;
    border: 1px solid #a7a7a7;
    border-radius: 8px;
    height: 47px;
    width: 347px;
    margin-top: 0.5rem;
    padding: 0.2rem;
  }

  button {
    font-weight: bold;
    font-size: 20px;
    background-color: white;
    border: 1px solid var(--main);
    color: var(--main);
    border-radius: 8px;
    width: 187px;
    height: 47px;
    margin-top: 1rem;
    cursor: pointer;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }
  button:hover {
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

function AdminLogin() {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(`/api/auth/admin`, {
        id: adminId,
        password: password,
      });

      const { accessToken, refreshToken } = response.data.response;
      console.log(accessToken, refreshToken);
      if (accessToken && refreshToken) {
        sessionStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        navigate("/admin/movie");
      } else {
        throw new Error("토큰 발급 실패");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      if (error.response) {
        const { message } = error.response.data;
        toast.error(
          message || "로그인 실패: 아이디 또는 비밀번호를 확인하세요"
        );
      }
    }
  };
  return (
    <>
      <GlobalStyle />
      <SideBar />
      <Viewport>
        <div>
          Admin
          <img src={CookieLogo} />
          <img src={CookieImg} />
        </div>
        <form action="/submit" method="POST">
          <FormContanier>
            <label for="email">
              아이디
              <input
                type="email"
                id="email"
                name="email"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                required
                placeholder="이메일을 입력하세요"
              />
            </label>

            <label for="password">
              비밀번호
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="비밀번호를 입력하세요"
              />
            </label>

            <button type="submit" onClick={handleLoginClick}>
              Login
            </button>
          </FormContanier>
        </form>
      </Viewport>
    </>
  );
}

export default AdminLogin;
