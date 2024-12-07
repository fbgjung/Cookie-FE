import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CookieImg from "../assets/images/login/cookie_img.svg";

const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #ffffff;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 70vh;
    padding: 20px;
  }
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

const Message = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

const NavigateButton = styled.button`
  background-color: #6a91b1;
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  padding: 12px 24px;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #567895;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 20px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 8px 16px;
  }
`;

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <ErrorPageContainer>
      <Image src={CookieImg} alt="Cookie Logo" />
      <Message>페이지를 찾을 수 없습니다.</Message>
      <NavigateButton onClick={handleNavigateHome}>
        메인페이지로 이동하기
      </NavigateButton>
    </ErrorPageContainer>
  );
};

export default ErrorPage;
