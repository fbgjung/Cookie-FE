import { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import axiosInstance from "../../api/auth/axiosInstance";

const nicknameRegex =
  /^(?=.*[가-힣ㄱ-ㅎㅏ-ㅣA-Za-z0-9])[가-힣A-Za-z0-9]{2,10}$/;

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  align-items: center;
  margin: 0 auto;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 8px;
  /* margin-left: 2rem; */
  color: #f84b99;
  width: 100%;
  margin-left: 4.6rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 5px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
  /* margin-left: 2rem; */
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid ${(props) => (props.isValid ? "#ccc" : "#f84b99")};
  border-radius: 8px;
  outline: none;

  &:focus {
    border: 2px solid #f84b99;
  }
`;

const CheckButton = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #f84b99;
  color: #fdf8fa;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 2%;

  &:hover {
    background-color: #c33677;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #f84b99;
  font-size: 0.9rem;
  margin-left: 40px;
  margin-top: 5px;
`;

const NicknameInput = ({ nickname, onChange, onResetCheck, isChecked }) => {
  const [isValid, setIsValid] = useState(true);

  const handleCheckNickname = async () => {
    if (!nicknameRegex.test(nickname)) {
      toast.error("닉네임은 2~10자의 한글, 영문, 숫자만 가능합니다.");
      setIsValid(false);
      onResetCheck(false);
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/api/users/setting/check-nickname`,
        { params: { nickname } }
      );

      if (response.data.response === "SUCCESS") {
        toast.success("사용 가능한 닉네임입니다.");
        onResetCheck(true);
      } else {
        toast.error("이미 사용 중인 닉네임입니다.");
        onResetCheck(false);
      }
    } catch (error) {
      toast.error("서버 오류가 발생했습니다. 다시 시도해주세요.");
      onResetCheck(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setIsValid(nicknameRegex.test(value));
    onChange(value);
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
          isValid={isValid}
        />
        <CheckButton
          onClick={handleCheckNickname}
          disabled={!nickname || !isValid}
        >
          중복확인
        </CheckButton>
      </InputWrapper>
      {!isValid && (
        <ErrorMessage>
          닉네임은 2~10자의 한글, 영문, 숫자만 가능합니다.
        </ErrorMessage>
      )}
    </NicknameContainer>
  );
};

export default NicknameInput;
