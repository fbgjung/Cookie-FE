import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const PosterWrapper = styled.div`
  position: relative;
  width: 160px;
  height: 230px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  &:hover .overlay {
    opacity: 1;
  }
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const VoteButton = styled.button`
  background-color: #1ee5b0;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Poster = ({ src, alt, movieTitle }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleVoteClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <PosterWrapper>
        <PosterImage src={src} alt={alt} />
        <Overlay className="overlay">
          <VoteButton onClick={handleVoteClick}>투표하기</VoteButton>
        </Overlay>
      </PosterWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        movieTitle={movieTitle}
      />
    </>
  );
};

export default Poster;
