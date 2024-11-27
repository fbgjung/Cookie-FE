import { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  ${(props) => props.isUser && "flex-direction: row-reverse;"}
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 10px;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const Nickname = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  ${(props) => props.isUser && "text-align: right;"}
`;

const MessageBubble = styled.p`
  position: relative;
  background-color: ${(props) => (props.isUser ? "#04012D" : "#e5e5e5")};
  color: ${(props) => (props.isUser ? "#fff" : "#000")};
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 70%;
  word-wrap: break-word;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    ${(props) => (props.isUser ? "right: -15px" : "left: -15px")};
    transform: translateY(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent;
    ${(props) =>
      props.isUser
        ? "border-left-color: #04012D;" // 내 메시지 색
        : "border-right-color: #e5e5e5;"}// 상대방 메시지 색
  }
`;

const Timestamp = styled.span`
  font-size: 0.8rem;
  color: #888;
  margin-top: 5px;
`;

const ChatMessagesContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 15px;
`;
const ChatMessages = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ChatMessagesContainer>
      {messages.map((message) => {
        const isUser = message.username === currentUser;
        return (
          <MessageWrapper key={message.id} isUser={isUser}>
            {!isUser && (
              <ProfileImage
                src={message.profile || "/default-profile.png"}
                alt={`${message.username} 프로필`}
              />
            )}
            <MessageContent isUser={isUser}>
              {!isUser && <Nickname>{message.username}</Nickname>}
              <MessageBubble isUser={isUser}>{message.content}</MessageBubble>
              <Timestamp>{message.timestamp}</Timestamp>
            </MessageContent>
          </MessageWrapper>
        );
      })}
      <div ref={messagesEndRef} />
    </ChatMessagesContainer>
  );
};

export default ChatMessages;
