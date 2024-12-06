import styled from "styled-components";

const SaveButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SaveButton = styled.button`
  background-color: #6a91b1;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 460px;

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
    width: 100%;
    padding: 10px 20px;
    margin-top: 40px;
    font-size: 0.8rem;
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
