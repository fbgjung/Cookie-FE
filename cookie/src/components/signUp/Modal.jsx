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
  background: white;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 420px;

  h2 {
    margin: 0 0 2rem 0;
  }
  h3 {
    margin: 0 0 0.3rem 0;
  }
  div {
    display: flex;
    margin: 2rem 0 2rem 0;
  }
`;

const ModalButton = styled.button`
  background-color: ${(props) =>
    props.$isSelected ? "var(--main)" : "var(--sub-btn)"};
  color: ${(props) => (props.$isSelected ? "white" : "var(--main)")};
  border-radius: 5rem;
  padding: 0.8rem 1rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: var(--main);
    color: white;
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
  text-underline-offset: 6px;
  font-size: 16px;
`;
const Modal = ({
  onClose,
  onPushNotification,
  onEmailNotification,
  onSubmit,
}) => {
  return (
    <>
      <ModalBackground onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <h2>알림 수신 동의(선택)</h2>
          <h3>좋아하는 장르에 새로운 리뷰가 등록될 때 알려드릴까요?</h3>
          <p>새로운 리뷰가 등록되면 빠르게 알려드릴게요!</p>

          <ButtonContainer>
            <ModalButton
              onClick={() => {
                onPushNotification();
              }}
            >
              🔔 푸쉬알림
            </ModalButton>
            <ModalButton
              onClick={() => {
                onEmailNotification();
              }}
            >
              💌 이메일
            </ModalButton>
          </ButtonContainer>
          <CloseBtn
            onClick={() => {
              handleCloseModal();
            }}
          >
            알림을 원하지 않습니다
          </CloseBtn>
        </ModalContainer>
      </ModalBackground>
    </>
  );
};

export default Modal;
