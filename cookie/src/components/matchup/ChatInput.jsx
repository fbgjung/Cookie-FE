import { useState } from "react";
import styled from "styled-components";
import ChatSendButtonIcon from "/src/assets/images/matchup/chatsendbutton.svg";
import useAuthStore from "../../stores/useAuthStore";
import LoginModal from "../common/LoginModal";

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
  }

  img {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
    padding: 5px;
  }
`;

const ChatInput = ({ onSend }) => {
  const [inputValue, setInputValue] = useState("");

  const { isLoggedIn, openLoginModal, closeLoginModal, isLoginModalOpen } =
    useAuthStore();

  const handleSendMessage = () => {
    if (!isLoggedIn) {
      console.warn("[Auth] 로그인이 필요합니다.");
      openLoginModal();
      return;
    }

    if (inputValue.trim() !== "") {
      onSend(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <InputContainer>
        <input
          type="text"
          placeholder="매치업에 대한 의견을 자유롭게 나눠보세요! (욕설 금지)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {inputValue.trim() && (
          <img
            src={ChatSendButtonIcon}
            alt="Send"
            onClick={handleSendMessage}
          />
        )}
      </InputContainer>

      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
    </>
  );
};

export default ChatInput;
