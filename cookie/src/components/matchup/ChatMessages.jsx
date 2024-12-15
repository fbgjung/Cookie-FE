import { useLayoutEffect, useState, useRef } from "react";
import styled from "styled-components";

const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  ${(props) => props.isUser && "flex-direction: row-reverse;"}

  @media (max-width: 480px) {
    margin: 5px 0;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 10px;

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    margin: 0 5px;
  }
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

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const MessageBubble = styled.p`
  background-color: ${(props) => (props.isUser ? "#04012D" : "#e5e5e5")};
  color: ${(props) => (props.isUser ? "#fff" : "#000")};
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 70%;
  word-wrap: break-word;
  position: relative;

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
        ? "border-left-color: #04012D;"
        : "border-right-color: #e5e5e5;"}
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 8px 12px;
    max-width: 90%;
  }
`;

const ChatMessagesContainer = styled.div`
  position: relative;
  height: 100%;
  overflow-y: auto;
  padding: 15px;

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const ChatMessages = ({ messages, currentUserId, messagesEndRef }) => {
  const containerRef = useRef();
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

  // 스크롤 위치 관리
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const nearBottom = scrollHeight - scrollTop <= clientHeight + 100;
    setIsScrolledToBottom(nearBottom);
  };

  // 메시지 변화 시 즉시 스크롤
  useLayoutEffect(() => {
    if (isScrolledToBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isScrolledToBottom, messagesEndRef]);

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
              <span>{message.timestamp}</span>
            </MessageContent>
          </MessageWrapper>
        );
      })}
      <div ref={messagesEndRef} />
    </ChatMessagesContainer>
  );
};

export default ChatMessages;
