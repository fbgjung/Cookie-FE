import React from "react";
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
  border-radius: 8px;
  width: 400px;
  text-align: center;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);

  h2 {
    margin-bottom: 1.5rem;
    color: #333;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const ConfirmButton = styled.button`
  background: #00d6e8;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background: #00bcd4;
  }
`;

const CancelButton = styled.button`
  background: #ccc;
  color: #333;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #bbb;
  }
`;

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <h2>로그아웃 하시겠습니까?</h2>
        <ButtonGroup>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
          <CancelButton onClick={onCancel}>취소</CancelButton>
        </ButtonGroup>
      </ModalContainer>
    </ModalBackground>
  );
};

export default LogoutModal;
