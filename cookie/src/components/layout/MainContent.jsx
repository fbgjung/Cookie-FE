import styled from "styled-components";

const MainContentContainer = styled.main`
  flex: 1;
  width: 100vw;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 70px;
  margin-bottom: 60px;
  padding: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100vw;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-y: contain;
  }

  @media (min-width: 769px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const MainContent = ({ children, isAuthPage }) => {
  return (
    <MainContentContainer
      style={{
        marginTop: isAuthPage ? 0 : "70px",
        marginBottom: isAuthPage ? 0 : "60px",
      }}
    >
      {children}
    </MainContentContainer>
  );
};

export default MainContent;
