import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/auth/axiosInstance";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/api/notification");
        console.log(response.data.response);
        
        if (response.data && response.data.response) {
          const formattedNotifications = response.data.response.map((notification) => {
            return {
              notificationId: notification.notificationId,
              body: notification.body,
              senderProfileImage: notification.senderProfileImage,
              timestamp: formatTimestamp(notification.timestamp),
              reviewId: notification.reviewId,
              status: notification.status
            };
          });

          setNotifications(formattedNotifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  const handleNavigate = (reviewId) => {
    navigate(`/reviews/${reviewId}`);
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axiosInstance.post("/api/notification/read-status", { notificationId });

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.notificationId === notificationId
            ? { ...notification, status: "READ" }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <NotificationContainer>
      <NoticeWrapper>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <NoticeItem key={index}>
              <img
                src={notification.senderProfileImage}
                alt="Sender Profile"
                className="profile-img"
              />
              <div className="content">
                <div className="body-and-status">
                  <p>{notification.body}</p>
                  {notification.status === "READ" && <span className="read-status">읽음</span>}
                </div>
                <span className="timestamp">{notification.timestamp}</span>
              </div>
            
              <button
                  className="navigate-button"
                  onClick={() => {
                    handleMarkAsRead(notification.notificationId);
                    handleNavigate(notification.reviewId);
                  }}
                >
                  &gt;
                </button>
            </NoticeItem>
          ))
        ) : (
          <p>알림이 없습니다.</p>
        )}
      </NoticeWrapper>
    </NotificationContainer>
  );
};

export default Notification;


const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #f9f9f9;
  height: 100vh;
`;

const NoticeWrapper = styled.div`
  border-radius: 0.2rem;
  width: 95%;
  margin: 10px 0;
`;

const NoticeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin: 0.5rem 0;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 0.2rem;
  cursor: pointer;

  .profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1rem;
  }

  .content {
    flex: 1;

    .body-and-status {
      display: flex;
      align-items: center;
      
      p {
        margin: 0;
        font-size: 1rem;
      }

      .read-status {
        font-size: 0.8rem;
        color: #FF0777;
        margin-left: 10px;
      }
    }

    .timestamp {
      display: block;
      font-size: 0.8rem;
      color: #888;
      margin-top: 0.5rem;
    }
  }

  .navigate-button {
    border: none;
    background: none;
    color: #888;
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #333;
    }
  }

  &:hover {
    border: 2px solid #F84B99;
    background-color: #FDF8FA;
  }
`;
