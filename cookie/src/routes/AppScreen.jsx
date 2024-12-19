import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MainContent from "../components/layout/MainContent";
import AppPages from "./AppPages";
import ScrollToTop from "../components/common/ScrollToTop";

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  }
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

const QrBox = styled.div`
  position: fixed;
  bottom: 100px;
  right: 260px;
  background: #ffffff;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  text-align: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const QrCode = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
`;

const QrText = styled.p`
  font-size: 0.7rem;
  color: #333;
  margin: 0;
  line-height: 1.2;
  text-align: center;
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
    <>
      <QrBox>
        <QrCode src="/assets/images/qrcode.png" alt="QR Code" />
        <QrText>
          쿠키를 태블릿과
          <br />
          모바일에서도 즐겨보세요!
        </QrText>
        <QrText>
          QR 코드를
          <br />
          스캔해주세요.
        </QrText>
      </QrBox>
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
    </>
  );
};

export default AppScreen;
