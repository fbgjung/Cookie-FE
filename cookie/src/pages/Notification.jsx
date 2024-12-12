import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

const Notification = () => {
  const userInfo = useUserStore((state) => state.getUserInfo());
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dummyData = [
      {
        body: "류설윤님이 올드보이에 리뷰를 남겼어요.",
        senderProfileImage:
          "https://uplus-bucket.s3.ap-northeast-2.amazonaws.com/aa5ae67f-3%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-12-05%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%201.53.50.png",
        timestamp: "2024-12-12 14:23",
        reviewId: 79,
      },
      {
        body: "김의진님이 쿵푸팬더에 리뷰를 남겼어요.",
        senderProfileImage:
          "https://uplus-bucket.s3.ap-northeast-2.amazonaws.com/6bc46d8d-b_default.jpeg",
        timestamp: "2024-12-12 15:00",
        reviewId: 84,
      },
    ];

    setNotifications(dummyData);
  }, []);

  const handleNavigate = (reviewId) => {
    navigate(`/reviews/${reviewId}`);
  };

  return (
    <NotificationContainer>
      <TitleSection>
        <h2>{userInfo.nickName}님의 알림 목록</h2>
      </TitleSection>
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
                <p>{notification.body}</p>
                <span className="timestamp">{notification.timestamp}</span>
              </div>
              <button
                className="navigate-button"
                onClick={() => handleNavigate(notification.reviewId)}
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

const TitleSection = styled.div`
  /* width: 95%; */
  margin-top: 2rem;

  h2 {
    color: #000000;
  }
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

    p {
      margin: 0;
      font-size: 1rem;
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
    border: px solid #b846ea;
    background-color: #e9f5f9;
    border: 2px solid #00D6E8;
  }
`;
