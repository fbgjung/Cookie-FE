import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import NotificationIcon from "/src/assets/images/Notification.svg";
import useNotificationStore from "../../stores/notificationStore";

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
  background-color: #6a91b1;
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

    &:last-child {
      border-bottom: none;
    }
  }

  .empty-message {
    text-align: center;
    color: #888;
    font-size: 14px;
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: #888;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const Notification = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const clearNotifications = useNotificationStore(
    (state) => state.clearNotifications
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // 알림 드롭다운 열기/닫기
  const handleNotificationClick = () => {
    setShowDropdown((prev) => !prev);
  };

  // 드롭다운 외부 클릭 감지
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  // 드롭다운 닫기 버튼 클릭
  const handleCloseClick = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showDropdown]);

  // 알림 확인 후 초기화
  useEffect(() => {
    if (!showDropdown && notifications.length > 0) {
      clearNotifications(); // 알림 확인 후 초기화
    }
  }, [showDropdown, notifications, clearNotifications]);

  return (
    <NotificationContainer>
      <img
        src={NotificationIcon}
        alt="Notification Icon"
        onClick={handleNotificationClick}
      />
      {notifications.length > 0 && <Badge>{notifications.length}</Badge>}
      {showDropdown && (
        <NotificationDropdown ref={dropdownRef}>
          <CloseButton onClick={handleCloseClick}>×</CloseButton>
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notif, index) => (
                <li key={index}>
                  {notif.body} <br />
                  <small>{notif.timestamp}</small>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-message">알림이 없습니다!</div>
          )}
        </NotificationDropdown>
      )}
    </NotificationContainer>
  );
};

export default Notification;
