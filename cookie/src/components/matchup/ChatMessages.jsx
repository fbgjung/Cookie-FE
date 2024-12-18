import { useLayoutEffect, useState, useRef } from "react";
import styled from "styled-components";

const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 10px 0;

  ${(props) => props.isUser && "flex-direction: row-reverse;"}

  @media (max-width: 768px) {
    margin: 8px 0;
  }

  @media (max-width: 480px) {
    margin: 5px 0;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0px 10px 0;

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    margin: 5px 5px 0;
  }
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const Nickname = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 5px;
  ${(props) => props.isUser && "text-align: right;"}

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const MessageBubble = styled.div`
  background-color: ${(props) => (props.isUser ? "#F44336" : "#4CAF50")};
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 15px;
  max-width: 100%;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
  line-height: 1.2;
  font-size: 1rem;
  font-family: "Arial", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
  position: relative;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 7px 10px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px 8px;
    max-width: 100%;
  }
`;
const ChatMessagesContainer = styled.div`
  position: relative;
  height: 100%;
  overflow-y: auto;
  padding: 15px;

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const ChatMessages = ({ messages, currentUserId, messagesEndRef }) => {
  const containerRef = useRef();
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const nearBottom = scrollHeight - scrollTop <= clientHeight + 10;
    setIsScrolledToBottom(nearBottom);
  };

  useLayoutEffect(() => {
    if (containerRef.current && isScrolledToBottom) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isScrolledToBottom]);

  return (
    <ChatMessagesContainer ref={containerRef} onScroll={handleScroll}>
      {messages.map((message, index) => {
        const isUser = message.id === currentUserId;
        return (
          <MessageWrapper key={`${message.id}-${index}`} isUser={isUser}>
            {!isUser && (
              <ProfileImage
                src={message.profile || "/default-profile.png"}
                alt={`${message.nickname} 프로필`}
              />
            )}
            <MessageContent isUser={isUser}>
              {!isUser && <Nickname>{message.nickname}</Nickname>}
              <MessageBubble isUser={isUser}>{message.content}</MessageBubble>
              {/* <span>{message.timestamp}</span> */}
            </MessageContent>
          </MessageWrapper>
        );
      })}
      <div ref={messagesEndRef} />
    </ChatMessagesContainer>
  );
};

export default ChatMessages;
