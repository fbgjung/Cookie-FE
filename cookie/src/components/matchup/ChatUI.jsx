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
  height: 100vh; /* 전체 화면 높이 */
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const ChatUI = ({ stompClient }) => {
  const [messages, setMessages] = useState([]);
  const [isInputTriggered, setIsInputTriggered] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 초기 로딩 상태 관리
  const matchUpId = 1;
  const messagesEndRef = useRef(null);

  const currentUserId = useUserStore((state) => state.userInfo.userId);

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
        setMessages(
          response.data.response.map((message) => ({
            id: message.senderUserId,
            nickname: message.senderNickname,
            content: message.content,
            timestamp: new Date(message.sentAt).toLocaleTimeString(),
            profile: message.senderProfileImage,
          }))
        );
        setIsInitialLoad(false); // 첫 로딩 완료
      } catch (error) {
        console.error("채팅 기록 로드 실패:", error);
      }
    };

    fetchMessages();
  }, [matchUpId]);

  useEffect(() => {
    if (!stompClient || !stompClient.connected) return;

    const subscription = stompClient.subscribe(
      `/topic/chat/${matchUpId}`,
      (message) => {
        const newMessage = JSON.parse(message.body);

        console.log("서버 응답 메시지:", newMessage);
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

        // 새 메시지를 수신할 때만 스크롤 이동
        if (!isInitialLoad) {
          scrollToBottom();
        }
      }
    );

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [stompClient, matchUpId, isInitialLoad]);

  const handleSend = (content) => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/app/chat/${matchUpId}/messages`,
        body: JSON.stringify({
          senderUserId: currentUserId,
          content,
        }),
      });
      console.log("이때의 유저값", currentUserId);
      setIsInputTriggered(true);
    } else {
      console.error("STOMP 연결이 활성화되지 않았습니다.");
    }
  };

  return (
    <ChatWrapper>
      <ChatContainer>
        <ChatMessages
          messages={messages}
          currentUserId={currentUserId}
          messagesEndRef={messagesEndRef}
        />
        <ChatInput onSend={handleSend} />
      </ChatContainer>
    </ChatWrapper>
  );
};

export default ChatUI;
