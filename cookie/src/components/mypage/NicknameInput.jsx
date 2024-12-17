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
  max-width: 500px;
  align-items: center;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 8px;
  color: #f84b99;
  width: 100%;
  text-align: left;
  padding-left: 0.3rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding-left: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding-left: 0.8rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;

  @media (max-width: 768px) {
    margin-left: 0.02rem;
    width: 90%;
  }

  @media (max-width: 480px) {
    margin-left: 0.01rem;
    width: 90%;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid ${(props) => (props.isValid ? "#ccc" : "#f84b99")};
  border-radius: 8px;
  outline: none;
  width: 100%;

  &:focus {
    border: 2px solid #f84b99;
  }

  @media (max-width: 768px) {
    padding: 0.7rem;
    font-size: 0.9rem;
    width: 90%;
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 0.8rem;
    width: 80%;
  }
`;

const CheckButton = styled.button`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  background-color: #f84b99;
  color: #fdf8fa;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #c33677;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.7rem;
    font-size: 0.8rem;
  }
`;

const ErrorMessage = styled.div`
  color: #f84b99;
  font-size: 0.9rem;
  margin-top: 5px;
  text-align: left;
  width: 100%;
  padding-left: 1.5rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding-left: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding-left: 0.8rem;
  }
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
