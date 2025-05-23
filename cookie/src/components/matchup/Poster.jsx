import { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import PropTypes from "prop-types";
import Modal from "./Modal";
import useAuthStore from "../../stores/useAuthStore";
import { toast } from "react-hot-toast";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PosterWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  border-radius: 5px;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease-out;
  transition:
    transform 0.3s ease,
    filter 0.3s ease;

  ${({ isGray }) =>
    isGray &&
    css`
      filter: grayscale(100%);
    `}

  &:hover {
    transform: scale(1.05);
  }

  &:hover .overlay {
    opacity: 1;
  }

  @media (max-width: 1024px) {
    width: 250px;
    height: 360px;
  }

  @media (max-width: 768px) {
    width: 218px;
    height: 320px;
  }

  @media (max-width: 480px) {
    width: 170px;
    height: 250px;
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
  background-color: #ffffff;
  color: #006400;
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

const Poster = ({
  src,
  movieTitle,
  movieId,
  isVoteEnded,
  matchUpId,
  userVote,
  isGray,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { isLogined, openLoginModal } = useAuthStore();

  const handleVoteClick = () => {
    if (userVote) {
      toast.error("이미 참여하신 매치업입니다.");
      return;
    }

    if (isVoteEnded) {
      toast.error("투표가 종료되었습니다.");
      return;
    }

    if (!isLogined()) {
      openLoginModal();
      return;
    }

    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <PosterWrapper isGray={isGray}>
        <PosterImage src={src} alt={`${movieTitle} 포스터`} />
        <Overlay className="overlay">
          <VoteButton onClick={handleVoteClick}>투표하기</VoteButton>
        </Overlay>
      </PosterWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        movieTitle={movieTitle}
        imageUrl={src}
        movieId={movieId}
        
        matchUpId={matchUpId}
      />
    </>
  );
};

Poster.propTypes = {
  src: PropTypes.string.isRequired,
  movieTitle: PropTypes.string.isRequired,
  movieId: PropTypes.number.isRequired,
  isVoteEnded: PropTypes.bool.isRequired,
  matchUpId: PropTypes.number.isRequired,
  userVote: PropTypes.bool.isRequired,
  isGray: PropTypes.bool.isRequired,
};

export default Poster;
