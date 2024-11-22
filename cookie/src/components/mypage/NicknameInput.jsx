import styled from "styled-components";
import axios from "axios";
import toast from "react-hot-toast";

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  width: 100%;
  margin-left: 10px;
  max-width: 600px;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
  margin-left: 40px;
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
  margin-left: 40px;
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

const NicknameInput = ({ nickname, onChange, onResetCheck, isChecked }) => {
  const handleCheckNickname = async () => {
    try {
      const response = await axios.post("/api/auth/check-nickname", {
        nickname,
      });

      if (response.data.response === "SUCCESS") {
        toast.success("사용 가능한 닉네임입니다.");
        onResetCheck(true);
      } else if (response.data.response === "DUPLICATED_NICKNAME") {
        toast.error("이미 사용 중인 닉네임입니다.");
        onResetCheck(false);
      }
    } catch (error) {
      toast.error("서버 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("중복 확인 실패:", error);
      onResetCheck(false);
    }
  };

  const handleInputChange = (e) => {
    onChange(e.target.value);
    onResetCheck(false);
  };

  return (
    <NicknameContainer>
      <Label htmlFor="nickname">닉네임</Label>
      <InputWrapper>
        <Input
          id="nickname"
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={handleInputChange}
        />
        <CheckButton onClick={handleCheckNickname} disabled={!nickname}>
          중복확인
        </CheckButton>
      </InputWrapper>
    </NicknameContainer>
  );
};

export default NicknameInput;
