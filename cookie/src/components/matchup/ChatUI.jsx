import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatContainer from "./ChatContainer";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import axiosInstance from "../../api/auth/axiosInstance";
import useUserStore from "../../stores/useUserStore";

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50vh;
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const ChatUI = ({ stompClient }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const { userId, matchUpId } = useUserStore((state) => state.userInfo);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/matchup-chat/${matchUpId}/messages`
        );
        const loadedMessages = response.data.response.map((message) => ({
          id: message.senderUserId,
          nickname: message.senderNickname,
          content: message.content,
          timestamp: new Date(message.sentAt).toLocaleTimeString(),
          profile: message.senderProfileImage,
        }));

        setMessages(loadedMessages);
        scrollToBottom();
      } catch (error) {
        console.error("채팅 기록 로드 실패:", error);
      }
    };

    fetchMessages();
  }, [matchUpId]);

  useEffect(() => {
    if (!stompClient) return;

    console.log("STOMP 상태:", stompClient.connected);

    const subscription = stompClient.subscribe(
      `/topic/chat/${matchUpId}`,
      (message) => {
        const newMessage = JSON.parse(message.body);
        console.log("Received message:", newMessage);

        setMessages((prev) => [
          ...prev,
          {
            id: newMessage.senderUserId,
            nickname: newMessage.senderNickname,
            content: newMessage.content,
            timestamp: new Date(newMessage.sentAt).toLocaleTimeString(),
            profile: newMessage.senderProfileImage,
          },
        ]);

        scrollToBottom();
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [stompClient, matchUpId]);

  const handleSend = (content) => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/app/chat/${matchUpId}/messages`,
        body: JSON.stringify({
          senderUserId: userId,
          content,
        }),
      });
      console.log("이떄 매치업 아디뭐임?", matchUpId);
    } else {
      console.error("STOMP 연결이 활성화되지 않았습니다.");
    }
  };

  return (
    <ChatWrapper>
      <ChatContainer>
        <ChatMessages
          messages={messages}
          currentUserId={userId}
          messagesEndRef={messagesEndRef}
        />
        <ChatInput onSend={handleSend} />
      </ChatContainer>
    </ChatWrapper>
  );
};

export default ChatUI;
