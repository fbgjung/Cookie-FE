import React, { useState } from "react";
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
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`;

const WarningMessage = styled.p`
  font-size: 1rem;
  color: #e74c3c;
  margin-bottom: 1rem;
`;

const InputField = styled.input`
  width: 80%;
  padding: 0.5rem;
  margin-top: 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 2.5rem;
`;

const ConfirmButton = styled.button`
  background: ${(props) => (props.disabled ? "#ccc" : "#e74c3c")};
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const CancelButton = styled.button`
  background: #ddd;
  color: black;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;

function WithdrawModal({ onConfirm, onCancel }) {
  const [inputValue, setInputValue] = useState("");

  const isInputValid = inputValue === "탈퇴하겠습니다";

  return (
    <ModalBackground>
      <ModalContainer>
        <h2>경고: 회원 탈퇴</h2>
        <WarningMessage>
          탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
        </WarningMessage>
        <p>
          탈퇴하려면 아래 입력란에 <br />
          <strong>탈퇴하겠습니다</strong>를 입력하세요.
        </p>
        <InputField
          type="text"
          placeholder="탈퇴하겠습니다"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <ButtonContainer>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <ConfirmButton
            disabled={!isInputValid}
            onClick={isInputValid ? onConfirm : undefined}
          >
            탈퇴하기
          </ConfirmButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

export default WithdrawModal;
