import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { useLocation } from "react-router-dom";

const TimerContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;

  @media (max-width: 480px) {
    gap: 5px;
  }
`;

const TimerBox = styled.div`
  background-color: rgb(229, 9, 20);
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: bold;
  width: 75px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 2rem;
    width: 60px;
    height: 65px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    width: 50px;
    height: 55px;
  }

  &:before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 15px;
    background: #ffffff;
    border-radius: 50%;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    height: 10px;
    background: #ffffff;
    border-radius: 50%;
  }
`;

const Colon = styled.span`
  font-size: 2.5rem;
  margin-top: 15px;
  font-weight: bold;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const EndedMessage = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const CloseButton = styled.button`
  background-color: ${(props) => (props.isHistoryPage ? "#006400" : "#f84b99")};
  color: ${(props) => (props.isHistoryPage ? "#ffffff" : "#fdf8fa")};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.isHistoryPage ? "#004d00" : "#ff0777"};
    color: #fff;
  }
`;

Modal.setAppElement("#root");

const Timer = ({ endAt, onVoteEnd }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const location = useLocation();
  const isHistoryPage = location.pathname.includes("/history");

  const timerRef = useRef(null);
  const hasEndedRef = useRef(false);

  useEffect(() => {
    const targetDate = new Date(endAt);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0 && !hasEndedRef.current) {
        hasEndedRef.current = true;
        clearInterval(timerRef.current);
        setIsEnded(true);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });

        if (!isHistoryPage) openModal();
        onVoteEnd();
      } else if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [endAt, onVoteEnd, isHistoryPage]);

  const splitDigits = (value) => value.toString().padStart(2, "0").split("");
  const [h1, h2] = splitDigits(timeLeft.hours);
  const [m1, m2] = splitDigits(timeLeft.minutes);
  const [s1, s2] = splitDigits(timeLeft.seconds);

  const openModal = () => {
    if (!isModalOpen) {
      document.body.style.overflow = "hidden";
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    document.body.style.overflow = "";
    setIsModalOpen(false);
  };

  return (
    <>
      {!isEnded ? (
        <TimerContainer>
          <TimerBox>{h1}</TimerBox>
          <TimerBox>{h2}</TimerBox>
          <Colon>:</Colon>
          <TimerBox>{m1}</TimerBox>
          <TimerBox>{m2}</TimerBox>
          <Colon>:</Colon>
          <TimerBox>{s1}</TimerBox>
          <TimerBox>{s2}</TimerBox>
        </TimerContainer>
      ) : (
        <EndedMessage>투표가 종료되었습니다.</EndedMessage>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          },
          content: {
            position: "absolute",
            inset: "auto",
            backgroundColor: "#ffffff",
            borderRadius: "15px",
            padding: "20px",
            width: "90%",
            maxWidth: "400px",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
            zIndex: 10000,
          },
        }}
      >
        <ModalContent>
          투표가 종료되었습니다.
          <CloseButton onClick={closeModal}>닫기</CloseButton>
        </ModalContent>
      </Modal>
    </>
  );
};

Timer.propTypes = {
  endAt: PropTypes.string.isRequired,
  onVoteEnd: PropTypes.func.isRequired,
};

export default Timer;
