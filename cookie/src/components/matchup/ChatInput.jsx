import { useState } from "react";
import styled from "styled-components";
import ChatSendButtonIcon from "/src/assets/images/matchup/chatsendbutton.svg";

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: #ffffff;
  align-items: center;
  border-radius: 20px;

  input {
    flex: 1;
    border: none;
    padding: 15px;
    border-radius: 20px;
    margin-right: 10px;
    font-size: 1rem;
    background-color: #f3f3f3;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      font-size: 0.9rem;
      padding: 12px;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
      padding: 10px;
    }
  }

  img {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
    padding: 5px;

    @media (max-width: 768px) {
      width: 35px;
      height: 35px;
    }

    @media (max-width: 480px) {
      width: 30px;
      height: 30px;
    }
  }

  @media (max-width: 768px) {
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

const ChatInput = ({ onSend }) => {
  const [inputValue, setInputValue] = useState("");

  // 메시지 전송 로직
  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      onSend(inputValue);
      setInputValue("");
    }
  };

  // 엔터 키 입력 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <InputContainer>
      <input
        type="text"
        placeholder="매치업에 대한 의견을 자유롭게 나눠보세요! (욕설, 비방, 어쩌구 .. x)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <img src={ChatSendButtonIcon} alt="Send" onClick={handleSendMessage} />
    </InputContainer>
  );
};

export default ChatInput;
