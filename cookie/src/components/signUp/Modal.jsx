import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff4b9;
  padding: 1.875rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  width: 29.375rem;
  @media (max-width: 768px) {
    width: 22rem;
    height: 17rem;
    padding: 1rem;
  }
  h2 {
    margin: 0 0 2rem 0;
    color: #724b2e;
  }
  h3 {
    margin: 0 0 0.3rem 0;
    color: #724b2e;
  }
  div {
    display: flex;
    margin: 2rem 0 2rem 0;
  }
  p {
    color: #724b2e;
  }
  @media (max-width: 768px) {
    h2 {
      font-size: 1.3rem;
    }
    h3 {
      font-size: 0.9rem;
    }
    p {
      font-size: 0.85rem;
    }
  }
`;

const ModalButton = styled.button`
  background-color: ${(props) => (props.$isSelected ? "#aad6e7" : "white")};
  color: ${(props) => (props.$isSelected ? "#724b2e" : "#724b2e")};
  border-radius: 5rem;
  padding: 0.8rem 1rem;
  border: 1px solid #aad6e7;
  cursor: pointer;
  font-size: 1rem;
  width: 8.5rem;
  &:hover {
    background-color: #aad6e7;
    color: "#724b2e";
  }
  @media (max-width: 768px) {
    width: 7.5rem;
    height: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #a7a7a7;
  text-decoration: underline;
  text-underline-offset: 0.375rem;
  font-size: 1rem;
  @media (max-width: 768px) {
    font-size: 0.8rem;
    text-underline-offset: 0.25rem;
  }
`;
const Modal = ({
  onClose,
  onPushNotification,
  onEmailNotification,
  onNoNotification,
}) => {
  return (
    <>
      <ModalBackground onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <h2>알림 수신 동의(선택)</h2>
          <h3>좋아하는 장르에 새로운 리뷰가 등록될 때 알려드릴까요?</h3>
          <p>새로운 리뷰가 등록되면 빠르게 알려드릴게요!</p>

          <ButtonContainer>
            <ModalButton onClick={onPushNotification}>🔔 푸쉬알림</ModalButton>
            <ModalButton onClick={onEmailNotification}>💌 이메일</ModalButton>
          </ButtonContainer>
          <CloseBtn onClick={onNoNotification}>알림을 원하지 않습니다</CloseBtn>
        </ModalContainer>
      </ModalBackground>
    </>
  );
};

export default Modal;
