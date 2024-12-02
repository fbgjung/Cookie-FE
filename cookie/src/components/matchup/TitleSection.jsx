import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TopicImage from "/src/assets/images/matchup/topic_image.svg";
import { FiChevronDown } from "react-icons/fi";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/auth/axiosInstance";

Modal.setAppElement("#root");

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const TitleImage = styled.img`
  width: 40px;
  height: 40px;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
`;

const DDayContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DDay = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #1ee5b0;
`;

const HistoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: transparent;
  border: none;
  color: #1ee5b0;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const modalCustomStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    padding: "20px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "auto",
    minHeight: "500px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    margin: 0,
  },
};

const ModalHeader = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333333;
  margin-bottom: 10px;
`;

const ModalList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const ModalListItem = styled.li`
  font-size: 1rem;
  color: #555555;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    color: #1ee5b0;
    text-decoration: underline;
  }
`;

const CloseButton = styled.button`
  margin-top: 20px;
  background-color: #1ee5b0;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #17c397;
  }
`;

const TitleSection = ({ matchUpTitle, endAt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoteEnded, setIsVoteEnded] = useState(false);
  const navigate = useNavigate();

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const fetchHistoryData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/api/matchups/history");
      setHistoryData(response.data.response);
    } catch (error) {
      console.error("히스토리 데이터 요청 실패:", error);

      setHistoryData([
        {
          matchUpId: 1,
          matchUpTitle: "로맨스 영화 빅매치입니다.",
          startAt: "2024-11-20T00:00:00",
          endAt: "2024-11-30T23:59:59",
        },
        {
          matchUpId: 2,
          matchUpTitle: "스릴러 영화 빅매치입니다.",
          startAt: "2024-11-15T00:00:00",
          endAt: "2024-11-18T23:59:59",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchHistoryData();
    }
  }, [isModalOpen]);

  const calculateDDay = () => {
    const now = new Date();
    const endDate = new Date(endAt);
    const difference = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
    return difference > 0 ? `D-${difference}` : "투표 종료";
  };

  const handleTimerEnd = () => {
    setIsVoteEnded(true);
  };

  const handleNavigate = (matchUpId) => {
    setIsModalOpen(false);
    navigate(`/matchup/${matchUpId}/history`);
  };

  return (
    <>
      <TitleContainer>
        <TitleImage src={TopicImage} alt="Topic Icon" />
        <Title>{matchUpTitle}</Title>
        <DDayContainer>
          {isVoteEnded ? (
            <DDay>투표 종료</DDay>
          ) : (
            <DDay>{calculateDDay()}</DDay>
          )}
          <HistoryButton onClick={handleModalToggle}>
            히스토리 보기 <FiChevronDown size={16} />
          </HistoryButton>
        </DDayContainer>
      </TitleContainer>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalToggle}
        style={modalCustomStyles}
      >
        <ModalHeader>히스토리 목록</ModalHeader>
        <ModalList>
          {isLoading ? (
            <ModalListItem>로딩 중...</ModalListItem>
          ) : historyData && historyData.length > 0 ? (
            historyData.map((item) => (
              <ModalListItem
                key={item.matchUpId}
                onClick={() => handleNavigate(item.matchUpId)}
              >
                {item.matchUpId}. {item.matchUpTitle} <br />({item.startAt} ~{" "}
                {item.endAt})
              </ModalListItem>
            ))
          ) : (
            <ModalListItem>히스토리 데이터가 없습니다.</ModalListItem>
          )}
        </ModalList>
        <CloseButton onClick={handleModalToggle}>닫기</CloseButton>
      </Modal>
    </>
  );
};

TitleSection.propTypes = {
  matchUpTitle: PropTypes.string.isRequired,
  endAt: PropTypes.string.isRequired,
};

export default TitleSection;
