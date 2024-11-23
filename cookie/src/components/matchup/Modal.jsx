import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  width: 90%;
  max-width: 400px;
  background: #ffffff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666666;
  margin-bottom: 20px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tag = styled.div`
  background-color: ${(props) => (props.selected ? "#04012D" : "#f0f0f0")};
  color: ${(props) => (props.selected ? "#ffffff" : "#333333")};
  border: 1px solid ${(props) => (props.selected ? "#04012D" : "#ddd")};
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 0.9rem;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.selected ? "#04012D" : "#04012D")};
    color: #ffffff;
  }
`;

const VoteButton = styled.button`
  background-color: #04012d;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #04012d;
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: #333333;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #999999;
  }
`;

const Modal = ({ isOpen, onClose, movieTitle }) => {
  const [selectedAttractiveTags, setSelectedAttractiveTags] = useState([]);
  const [selectedEmotionTags, setSelectedEmotionTags] = useState([]);

  const matchUpId = 1;
  const matchUpMovieId = 2;

  const attractiveTagsMap = {
    OST: "ost",
    "감독 연출": "direction",
    스토리: "story",
    대사: "dialogue",
    영상미: "visual",
    "배우 연기": "acting",
    "특수효과 및 CG": "specialEffect",
  };

  const emotionTagsMap = {
    감동: "touching",
    분노: "angry",
    즐거움: "joy",
    몰입감: "immersion",
    긴장감: "tension",
    공감: "empathy",
    설렘: "excited",
  };

  const handleTagClick = (tag, type) => {
    if (type === "attractive") {
      setSelectedAttractiveTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    } else if (type === "emotion") {
      setSelectedEmotionTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    }
  };

  const handleSubmit = async () => {
    const charmPoint = Object.keys(attractiveTagsMap).reduce((acc, tag) => {
      acc[attractiveTagsMap[tag]] = selectedAttractiveTags.includes(tag)
        ? 1
        : 0;
      return acc;
    }, {});

    const emotionPoint = Object.keys(emotionTagsMap).reduce((acc, tag) => {
      acc[emotionTagsMap[tag]] = selectedEmotionTags.includes(tag) ? 1 : 0;
      return acc;
    }, {});

    const payload = {
      charmPoint,
      emotionPoint,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/matchups/${matchUpId}/movies/${matchUpMovieId}/estimation`,
        payload
      );
      if (response.data.response === "SUCCESS") {
        alert("투표가 성공적으로 완료되었습니다!");
        onClose();
      }
    } catch (error) {
      console.error("투표 요청 실패:", error);
      alert("투표 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>

        <Title>{movieTitle}의 매력 포인트를 알려주세요</Title>
        <Description>복수 선택이 가능합니다</Description>
        <TagsContainer>
          {Object.keys(attractiveTagsMap).map((tag) => (
            <Tag
              key={tag}
              selected={selectedAttractiveTags.includes(tag)}
              onClick={() => handleTagClick(tag, "attractive")}
            >
              {tag}
            </Tag>
          ))}
        </TagsContainer>
        <Title>{movieTitle}의 감정 포인트를 알려주세요</Title>
        <Description>복수 선택이 가능합니다</Description>
        <TagsContainer>
          {Object.keys(emotionTagsMap).map((tag) => (
            <Tag
              key={tag}
              selected={selectedEmotionTags.includes(tag)}
              onClick={() => handleTagClick(tag, "emotion")}
            >
              {tag}
            </Tag>
          ))}
        </TagsContainer>
        <VoteButton onClick={handleSubmit}>투표하기</VoteButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
