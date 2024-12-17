import styled from "styled-components";
import PropTypes from "prop-types";

const ModalOverlay = styled.div`
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
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
`;

const ModalMessage = styled.p`
  margin-bottom: 2rem;
  color: #666;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const ConfirmButton = styled.button`
  background: #ff0777;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #e1066c;
  }
`;

const CancelButton = styled.button`
  background: #ccc;
  color: #333;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #aaa;
  }
`;

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>삭제 확인</ModalTitle>
        <ModalMessage>정말로 삭제하시겠습니까?</ModalMessage>
        <ButtonGroup>
          <ConfirmButton onClick={onConfirm}>삭제</ConfirmButton>
          <CancelButton onClick={onCancel}>취소</CancelButton>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
};

DeleteConfirmationModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;
