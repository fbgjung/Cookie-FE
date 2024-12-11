import styled from "styled-components";

import toast from "react-hot-toast";
import axiosInstance from "../../api/auth/axiosInstance";

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    margin: 0 auto;
    max-width: 100%;
    padding: 0 10px;
  }
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
  margin-left: 40px;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-top: 10px;
    margin-left: 30px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-top: 10px;
    margin-left: 30px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
  margin-left: 40px;

  @media (max-width: 768px) {
    margin-left: 30px;
    width: 90%;
  }

  @media (max-width: 480px) {
    flex-direction: row;
    gap: 10px;
    width: 82%;
    margin-left: 30px;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 10px;
    width: calc(100% - 120px);
  }
`;

const CheckButton = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #6a91b1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 2%;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 12px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 7px;
    width: 60px;
  }
`;

const NicknameInput = ({ nickname, onChange, onResetCheck, isChecked }) => {
  const handleCheckNickname = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/users/setting/check-nickname`
      );

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
