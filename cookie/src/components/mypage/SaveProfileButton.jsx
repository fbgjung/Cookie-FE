import styled from "styled-components";

const SaveButtonWrapper = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SaveButton = styled.button`
  background-color: #04012d;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 460px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SaveProfileButton = ({ onClick, disabled }) => {
  return (
    <SaveButtonWrapper>
      <SaveButton onClick={onClick} disabled={disabled}>
        저장하기
      </SaveButton>
    </SaveButtonWrapper>
  );
};

export default SaveProfileButton;
