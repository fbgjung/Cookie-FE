import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MainContent from "../components/layout/MainContent";
import AppPages from "./AppPages";
import ScrollToTop from "../components/common/ScrollToTop";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
`;

const ViewArea = styled.div`
  width: 100vw;
  max-width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;

  @media (min-width: 769px) {
    max-width: 600px;
    border-left: 1px solid var(--border-divider);
    border-right: 1px solid var(--border-divider);
  }

  @media (max-width: 768px) {
    width: 100%;
    border: none;
    margin: 0;
  }
`;

const AppScreen = () => {
  const location = useLocation();
  const hideHeaderFooterPages = [
    "/login",
    "/sign-up-profile",
    "/sign-up-genre",
    "/admin",
  ];
  const isAuthPage = hideHeaderFooterPages.includes(location.pathname);

  return (
    <Container>
      <ViewArea>
        <Toaster
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#333333",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
            },
          }}
        />
        {!isAuthPage && <Header />}
        <MainContent isAuthPage={isAuthPage}>
          <ScrollToTop />
          <AppPages />
        </MainContent>
        {!isAuthPage && <Footer />}
      </ViewArea>
    </Container>
  );
};

export default AppScreen;
