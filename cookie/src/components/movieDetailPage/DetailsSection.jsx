import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa";
import axiosInstance from "../../api/auth/axiosInstance";
import useAuthStore from "../../stores/useAuthStore";

const DetailsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 20px;
  align-items: flex-start;
  flex-wrap: wrap; /* Ensures it wraps on smaller screens */

  img {
    width: 120px;
    height: auto;
    border-radius: 8px;
    flex-shrink: 0;
  }

  .details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .categories {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
      flex-wrap: wrap;

      span {
        background: #aad6e7;
        padding: 5px 10px;
        border-radius: 8px;
        font-size: 12px;
        color: black;
      }
    }

    p {
      font-size: 14px;
      color: #ffffff;
      line-height: 1.6;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const PosterImage = styled.img`
  width: 120px;
  height: auto;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 100px;
  }

  @media (max-width: 480px) {
    width: 80px;
  }
`;

const MovieDetailRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MovieEvaluationFunction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .write-review-button {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
`;

const MovieScore = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const HeartIcon = styled(FaHeart)`
  color: ${(props) => (props.liked ? "#ff4d4d" : "#ffffff")};
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: #ff4d4d;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
`;

const ReviewButton = styled.button`
  background: #00d6e8;
  color: black;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #00c4d3;
    transform: scale(1.05);
  }

  &:active {
    background: #00aabf;
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const DetailsSection = ({
  posterUrl,
  categories = [],
  description,
  likes,
  score,
  movie,
  liked,
}) => {
  const navigate = useNavigate();
  const { openLoginModal } = useAuthStore();

  const [likeCount, setLikeCount] = useState(likes);
  const [likeValid, setLikeValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLikeValid(liked);
    setLikeCount(likes);
  }, [liked, likes]);

  const checkLogin = () => {
    const token = localStorage.getItem("refreshToken");
    if (!token) {
      openLoginModal();
      return false;
    }
    return true;
  };

  const handleLikeClick = async () => {
    if (!checkLogin()) return;

    const previousLiked = likeValid;
    const previousLikeCount = likeCount;

    setLikeValid(!previousLiked);
    setLikeCount(previousLiked ? previousLikeCount - 1 : previousLikeCount + 1);

    try {
      await axiosInstance.post(`/api/users/movie-like/${movie.id}`);
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
      setLikeValid(previousLiked);
      setLikeCount(previousLikeCount);
    }
  };

  const ReviewButton = styled.button`
    background: #00d6e8;
    color: black;
    font-size: 14px;
    font-weight: bold;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #00c4d3;
      transform: scale(1.05);
    }

    &:active {
      background: #00aabf;
      transform: scale(0.95);
    }
  `;

  const handleWriteReviewClick = () => {
    if (!checkLogin()) return;

    navigate("/reviews/write", {
      state: {
        movieId: movie.id,
        movieTitle: movie.title,
        posterUrl,
      },
    });
  };

  const handlePosterClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const roundedScore = Math.round(score * 100) / 100;

  return (
    <>
      <DetailsWrapper>
        <PosterImage src={posterUrl} alt="포스터" onClick={handlePosterClick} />

        <MovieDetailRight>
          <div className="details">
            <div className="categories">
              {categories.map((category, index) => (
                <span key={index}>{category.subCategory}</span>
              ))}
            </div>
            <p>{description}</p>
          </div>

          <MovieEvaluationFunction>
            <ReviewButton onClick={handleWriteReviewClick}>
              리뷰 작성
            </ReviewButton>
            <MovieScore>
              <HeartIcon liked={likeValid} onClick={handleLikeClick} />{" "}
              {likeCount} | 평점: {roundedScore}
            </MovieScore>
          </MovieEvaluationFunction>
        </MovieDetailRight>
      </DetailsWrapper>

      {isModalOpen && (
        <ModalOverlay onClick={handleModalClose}>
          <ModalImage src={posterUrl} alt="확대된 포스터" />
        </ModalOverlay>
      )}
    </>
  );
};

DetailsSection.propTypes = {
  posterUrl: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  description: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  movie: PropTypes.object.isRequired,
  liked: PropTypes.bool.isRequired,
};

export default DetailsSection;
