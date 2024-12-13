import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MainContent from "../components/layout/MainContent";
import AppPages from "./AppPages";
import ScrollToTop from "../components/common/ScrollToTop";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: white;
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
    <AppContainer>
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
    </AppContainer>
  );
};

export default AppScreen;
