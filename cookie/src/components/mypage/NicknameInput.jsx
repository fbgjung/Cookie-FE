import styled from "styled-components";

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  width: 100%;
  max-width: 600px;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
  margin-left: 50px;
  color: #333;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  margin-left: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  max-width: 365px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }
`;

const CheckButton = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #04012d;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #0056b3;
  }
`;

const NicknameInput = () => {
  return (
    <NicknameContainer>
      <Label htmlFor="nickname">닉네임</Label>
      <InputWrapper>
        <Input id="nickname" type="text" placeholder="닉네임을 입력하세요" />
        <CheckButton>중복확인</CheckButton>
      </InputWrapper>
    </NicknameContainer>
  );
};

export default NicknameInput;
