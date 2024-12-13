import styled from "styled-components";
import PropTypes from "prop-types";

const SaveButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SaveButton = styled.button`
  background-color: #00d6e8;
  color: #02172a;
  font-size: 1rem;
  font-weight: bold;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 460px;
  margin-top: -30px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #33efff;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 80%;
    padding: 12px 25px;
    margin-top: 30px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    width: 80%;
    padding: 10px 20px;
    margin-top: -30px;
    font-size: 0.8rem;
  }
`;

const SaveProfileButton = ({ onClick, disabled }) => {
  return (
    <SaveButtonWrapper>
      <SaveButton onClick={onClick} disabled={disabled}>
        수정하기
      </SaveButton>
    </SaveButtonWrapper>
  );
};

SaveProfileButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SaveProfileButton.defaultProps = {
  disabled: false,
};

export default SaveProfileButton;
