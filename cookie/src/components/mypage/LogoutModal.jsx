import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";

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
  position: relative;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);

  h2 {
    margin-top: 1rem;
    color: #333;
  }
`;

const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #f84b99;
  }
`;

const ConfirmButton = styled.button`
  background: #f84b99;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  margin- top : 1.5rem;

  &:hover {
    background: #c33677;
  }
`;

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <CloseIcon onClick={onCancel} />
        <h2>로그아웃 하시겠습니까?</h2>
        <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default LogoutModal;

LogoutModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
