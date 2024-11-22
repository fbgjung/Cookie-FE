import { useEffect, useState } from "react";
import styled from "styled-components";
import NotificationIcon from "/src/assets/images/Notification.svg";

const NotificationContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  img {
    height: 30px;
    cursor: pointer;
    transition: height 0.2s ease;

    @media (max-width: 768px) {
      height: 25px;
    }

    @media (max-width: 480px) {
      height: 20px;
    }
  }
`;

const Badge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  padding: 10px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  li:last-child {
    border-bottom: none;
  }
`;

const Notification = () => {
  const [notifications, setNotifications] = useState([]); // 알림 데이터 저장
  const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 표시 상태

  useEffect(() => {
    // SSE 연결
    const eventSource = new EventSource(
      `http://localhost:8080/api/reviews/subscribe/push-notification`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data); // 서버에서 PushNotification 데이터 수신
      setNotifications((prev) => [...prev, data]); // 새 알림 추가
    };

    eventSource.onerror = (error) => {
      console.error("SSE 연결 에러:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleNotificationClick = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <NotificationContainer>
      <img
        src={NotificationIcon}
        alt="Notification Icon"
        onClick={handleNotificationClick}
      />
      {notifications.length > 0 && <Badge>{notifications.length}</Badge>}

      {showDropdown && (
        <NotificationDropdown>
          <ul>
            {notifications.map((notif, index) => (
              <li key={index}>
                <strong>{notif.movieTitle}</strong>에 대한 새로운 리뷰가
                작성되었습니다. (작성자: {notif.writerNickname})
              </li>
            ))}
          </ul>
        </NotificationDropdown>
      )}
    </NotificationContainer>
  );
};

export default Notification;
