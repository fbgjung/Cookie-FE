import styled from "styled-components";
import { useState } from "react";
import ChatContainer from "./ChatContainer";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80vh;
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 16px 16px 0 0; /* 상단 좌우 둥글게 */
  overflow: hidden;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* 테두리 강조 효과 */
`;

const ChatUI = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      username: "상대방", // 상대방 메시지
      content: "안녕하세요! 여기에 의견을 남겨주세요.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const currentUser = "나";

  const handleSend = (content) => {
    const newMessage = {
      id: messages.length + 1,
      username: currentUser,
      content,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <ChatWrapper>
      <ChatContainer>
        <ChatMessages messages={messages} currentUser={currentUser} />
        <ChatInput onSend={handleSend} />
      </ChatContainer>
    </ChatWrapper>
  );
};

export default ChatUI;
