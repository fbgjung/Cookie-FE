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
    padding: 20px;
    border-radius: 20px;
    margin-right: 10px;
    font-size: 1rem;
    background-color: #f3f3f3; /* 배경색 조정 */
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;

    padding: 5px; /* 이미지 여백 */
  }
`;

const ChatInput = ({ onSend }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      onSend(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <InputContainer>
      <input
        type="text"
        placeholder="매치업에 대한 의견을 자유롭게 나눠보세요! (욕설, 비방, 어쩌구 .. x)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <img src={ChatSendButtonIcon} alt="Send" onClick={handleSend} />
    </InputContainer>
  );
};

export default ChatInput;
