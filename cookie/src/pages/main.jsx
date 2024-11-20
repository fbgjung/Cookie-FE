import Header from "../components/Header";
import Navbar from "../components/Navvar";
import styled from "styled-components";

const CommonContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const MainContainer = styled(CommonContainer)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding-bottom: 60px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  padding-top: 60px;
  overflow-y: auto;

  @media (max-width: 600px) {
    padding: 15px;
  }
`;

const HeaderWrapper = styled(CommonContainer)`
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: #04012d;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 0 10px;
  }
`;

const NavbarWrapper = styled(CommonContainer)`
  position: fixed;
  bottom: 0;
  z-index: 100;
  background-color: #ffffff;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 0 10px;
  }
`;

const Main = () => {
  return (
    <>
      <HeaderWrapper></HeaderWrapper>
      <MainContainer>
        <Content>
          <h1>메인입니다</h1>
        </Content>
      </MainContainer>
      <NavbarWrapper></NavbarWrapper>
    </>
  );
};

export default Main;
