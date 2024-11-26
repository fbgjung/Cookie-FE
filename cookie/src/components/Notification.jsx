import { useState } from "react";
import styled from "styled-components";
import NotificationIcon from "/src/assets/images/Notification.svg";
import useNotificationStore from "../stores/notificationStore";
import { useEffect } from "react";

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
  const notifications = useNotificationStore((state) => state.notifications);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleNotificationClick = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    console.log("컴포넌트 상태 알림 변경:", notifications);
  }, [notifications]);

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
