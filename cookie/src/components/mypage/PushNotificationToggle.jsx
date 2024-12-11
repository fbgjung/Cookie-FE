import styled from "styled-components";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/auth/axiosInstance";
import { toast } from "react-hot-toast";
import { requestNotificationPermission } from "../../firebase/firebaseMessaging";

const PushSection = styled.div`
  margin-top: 20px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const PushTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  margin-left: 5px;
  color: #ffffff;
  font-weight: bold;
`;

const PushContainer = styled.div`
  border: 2px solid transparent;
  border-radius: 12px;
  overflow: hidden;
  background-color: #000;

  box-shadow:
    0 0 8px #00d6e8,
    0 0 16px #00d6e8;
`;

const PushItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #00d6e8;
  }
`;

const PushText = styled.span`
  font-size: 1rem;
  color: #ffffff;
  font-weight: bold;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  height: 24px;
  background: ${(props) => (props.enabled ? "#00d6e8" : "#ccc")};
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background: #ffffff;
    border-radius: 50%;
    top: 2px;
    left: ${(props) => (props.enabled ? "26px" : "2px")};
    transition: left 0.3s ease;
  }
`;

const PushNotificationToggle = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const fetchNotificationStatus = async () => {
      try {
        const response = await axiosInstance.get("/api/notification/status");
        setIsEnabled(response.data.response.enabled);
      } catch (error) {
        console.error("알림 상태 로드 실패:", error);
      }
    };
    fetchNotificationStatus();
  }, []);

  const handleToggle = async () => {
    try {
      const updatedStatus = !isEnabled;

      if (updatedStatus) {
        const fcmToken = await requestNotificationPermission();
        if (fcmToken) {
          await axiosInstance.post("/api/notification/settings", {
            token: fcmToken,
          });
          setIsEnabled(true);
          toast.success("푸시 알림이 활성화되었습니다.");
        } else {
          toast.error("알림을 활성화할 수 없습니다.");
        }
      } else {
        await axiosInstance.post("/api/notification/settings", {
          token: null,
        });
        setIsEnabled(false);
        toast.success("푸시 알림이 비활성화되었습니다.");
      }
    } catch (error) {
      toast.error("알림 상태 변경에 실패했습니다.");
      console.error("알림 상태 업데이트 오류:", error);
    }
  };

  return (
    <PushSection>
      <PushTitle>알림 설정</PushTitle>
      <PushContainer>
        <PushItem onClick={handleToggle}>
          <PushText>푸시 알림 여부</PushText>
          <ToggleSwitch enabled={isEnabled} />
        </PushItem>
      </PushContainer>
    </PushSection>
  );
};

export default PushNotificationToggle;
