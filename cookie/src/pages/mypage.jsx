import styled from "styled-components";
import Header from "../components/Header";
import Navbar from "../components/Navvar";

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 60px;
  background-color: #f9f9f9;
`;

const MypageContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const MyPage = () => {
  return (
    <MypageContainer>
      <Header />
      <MypageContent>
        <h1>마이페이지입니다</h1>
      </MypageContent>
      <Navbar />
    </MypageContainer>
  );
};

export default MyPage;
