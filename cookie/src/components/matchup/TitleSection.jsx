import { useState } from "react";
import styled from "styled-components";
import TopicImage from "/src/assets/images/matchup/topic_image.svg";
import { FiChevronDown } from "react-icons/fi";
import Modal from "react-modal";

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
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    padding: "20px",
    width: "90%",
    maxWidth: "400px",
    margin: "auto",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
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

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const calculateDDay = () => {
    const now = new Date();
    const endDate = new Date(endAt);
    const difference = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
    return difference > 0 ? `D-${difference}` : "종료";
  };

  return (
    <>
      <TitleContainer>
        <TitleImage src={TopicImage} alt="Topic Icon" />
        <Title>{matchUpTitle}</Title>
        <DDayContainer>
          <DDay>{calculateDDay()}</DDay>
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
          <ModalListItem>1. 올드보이 - 2003년</ModalListItem>
          <ModalListItem>2. 친절한 금자씨 - 2005년</ModalListItem>
          <ModalListItem>3. 복수는 나의 것 - 2002년</ModalListItem>
        </ModalList>
        <CloseButton onClick={handleModalToggle}>닫기</CloseButton>
      </Modal>
    </>
  );
};

export default TitleSection;
