import { useState } from "react";
import styled from "styled-components";

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
  position: absolute; /* 부모 요소 기준 우측 상단에 위치 */
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

  const attractiveTags = [
    "감독 연출",
    "OST",
    "스토리",
    "대사",
    "영상미",
    "배우 연기",
    "특수효과 및 CG",
  ];

  const emotionTags = [
    "감동",
    "분노",
    "즐거움",
    "몰입감",
    "긴장감",
    "공감",
    "설렘",
  ];

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

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        {/* Close Button */}
        <CloseButton onClick={onClose}>×</CloseButton>

        {/* Modal Title and Content */}
        <Title>{movieTitle}의 매력 포인트를 알려주세요</Title>
        <Description>복수 선택이 가능합니다</Description>
        <TagsContainer>
          {attractiveTags.map((tag) => (
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
          {emotionTags.map((tag) => (
            <Tag
              key={tag}
              selected={selectedEmotionTags.includes(tag)}
              onClick={() => handleTagClick(tag, "emotion")}
            >
              {tag}
            </Tag>
          ))}
        </TagsContainer>
        <VoteButton>투표하기</VoteButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
