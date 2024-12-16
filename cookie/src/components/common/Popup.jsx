import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Bottom-to-top animation
const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 10000;
`;

const PopupContent = styled.div`
  background: white;
  width: 500px;
  height: 600px;
  background-image: url("/assets/common/popup.png");
  background-size: cover;
  background-position: center;
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  animation: ${slideUp} 0.5s ease-out;
  cursor: pointer;
`;

const PopupFooter = styled.div`
  background: white;
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ddd;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const CloseButton = styled.button`
  background: white;
  color: black;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const CircleCheckbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #333;
  border-radius: 50%;
  position: relative;
  cursor: pointer;

  &:checked::before {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 10px;
    height: 10px;
    background: #ff0077;
    border-radius: 50%;
  }
`;

const CheckboxLabel = styled.span`
  font-size: 0.9rem;
  color: #333;
`;

const Popup = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const hidePopupUntil = localStorage.getItem("hidePopupUntil");
    if (
      hidePopupUntil &&
      new Date().getTime() < new Date(hidePopupUntil).getTime()
    ) {
      setVisible(false);
    }
  }, []);

  const handleImageClick = () => {
    navigate("/search");
    setVisible(false);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    const oneHourLater = new Date(new Date().getTime() + 60 * 60 * 1000); // 1시간 후
    localStorage.setItem("hidePopupUntil", oneHourLater.toISOString());
    setVisible(false);
  };

  const handleHideToday = (e) => {
    e.stopPropagation();
    localStorage.setItem("hidePopupUntil", new Date().toISOString());
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <PopupContainer>
      <PopupContent onClick={handleImageClick}>
        <PopupFooter>
          <CheckboxWrapper onClick={handleHideToday}>
            <CircleCheckbox id="hideCheckbox" />
            <CheckboxLabel>오늘 하루 안보기</CheckboxLabel>
          </CheckboxWrapper>
          <CloseButton onClick={handleClose}>닫기</CloseButton>
        </PopupFooter>
      </PopupContent>
    </PopupContainer>
  );
};

export default Popup;
