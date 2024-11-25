import styled from "styled-components";
import GlobalStyle from "../styles/global";
import SideBar from "../components/admin/SideBar";

const Viewport = styled.div`
  width: 100%;
`;

function AdminLogin() {
  return (
    <>
      <GlobalStyle />
      <SideBar />
      <Viewport>
        <form action="/submit" method="POST">
          <label for="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="이메일을 입력하세요"
          />

          <label for="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="비밀번호를 입력하세요"
          />

          <button type="submit">가입하기</button>
        </form>
      </Viewport>
    </>
  );
}

export default AdminLogin;
