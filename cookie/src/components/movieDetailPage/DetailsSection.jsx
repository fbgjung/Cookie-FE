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
  /* align-items: flex-start; */
  /* flex-wrap: wrap; */
  flex-direction: row;

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
        background: #313131;
        padding: 5px 12px;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 500;
        color: #ffffff;
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

const MovieDetailLeft = styled.div`
  display: flex;
  flex-direction: column;
`
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


const ScoreSection = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  background-color: #fdf8fa;
  border: 1px solid #F84B99;
  border-radius: 0.4rem;
  padding: 0.4rem 0.7rem;
  margin-top: 0.4rem;
  justify-content: center;
`
const ScoreIcon = styled.svg`
  width: 14px;
  height: 14px;
  background: no-repeat center/cover url("/assets/images/review/score-macarong.png");
`

const ScoreText = styled.p`
  font-weight: 500;
  color: #F84B99; 
  font-size: 0.9rem;
`


const ReviewAndLike = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  p {
    color: #ffffff;
    font-size: 0.8rem;
  }
`
const Review = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  svg {
    width: 40px;
    height: 40px;
    background: no-repeat center/cover url("/assets/images/movie/pencil.svg");
    cursor: pointer;
    margin-bottom: 0.5rem;
  }
 `

const Like = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  flex-direction: column;
  color: #ffffff;
  p {
    color: #ffffff;
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const HeartIcon = styled(FaHeart)`
  color: ${(props) => (props.liked ? "#ff4d4d" : "#ffffff")};
  font-size: 40px;
  cursor: pointer;

  &:hover {
    color: #ff4d4d;
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
  console.log(likes);
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
    let token = sessionStorage.getItem("accessToken");

    if (!token) {
      token = localStorage.getItem("refreshToken");
    }

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

  const roundedScore = Math.round(score * 10) / 10;

  return (
    <>
      <DetailsWrapper>
        <MovieDetailLeft>
          <PosterImage src={posterUrl} alt="포스터" onClick={handlePosterClick} />
          <ScoreSection>
            <ScoreIcon></ScoreIcon>
            <ScoreText>평점 {roundedScore.toFixed(1)}</ScoreText>
          </ScoreSection>   
        </MovieDetailLeft>
        
        <MovieDetailRight>
          <div className="details">
            <div className="categories">
              {categories.map((category, index) => (
                <span key={index}>{category.subCategory}</span>
              ))}
            </div>
            <p>{description}</p>
          </div>
        </MovieDetailRight>
      </DetailsWrapper>


      <ReviewAndLike>
        <Review>
          <svg onClick={handleWriteReviewClick}/>
          <p>리뷰</p>
        </Review>
        <Like>
          <HeartIcon liked={likeValid} onClick={handleLikeClick} />
          <p>좋아요 {likeCount > 999 ? "999+" : likeCount}</p>
        </Like>
      </ReviewAndLike>
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

