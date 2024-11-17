import Header from "../components/Header";
import Navbar from "../components/Navvar";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 60px;
  background-color: #f9f9f9;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Main = () => {
  return (
    <MainContainer>
      <Header />
      <Content>
        <h1>메인입니다</h1>
      </Content>
      <Navbar /> {/* Navbar를 항상 하단에 고정 */}
    </MainContainer>
  );
};

export default Main;
