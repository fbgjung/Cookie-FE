import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import axiosInstance from "../../api/auth/axiosInstance";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const DetailsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 20px;
  align-items: flex-start;

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

    .categories {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;

      span {
        background: #aad6e7;
        padding: 5px 10px;
        border-radius: 8px;
        font-size: 12px;
        color: #555;
      }
    }

    p {
      font-size: 14px;
      color: #333;
      line-height: 1.6;
    }
  }
`;

const MovieDetailRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieEvaluationFunction = styled.div`
  display: flex;
  justify-content: space-between;

  .write-review-button {
    cursor: pointer;
  }
`;

const MovieScore = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
`;

const HeartIcon = styled(FaHeart)`
  color: ${(props) => (props.liked ? "#ff4d4d" : "#ccc")};
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: #ff4d4d;
  }
`;

const DetailsSection = ({ posterUrl, categories = [], description, likes, score, movie, liked }) => {
  const navigate = useNavigate();

  const [likeCount, setLikeCount] = useState(likes);
  const [likeValid, setLikeValid] = useState(false);

  useEffect(() => {
    setLikeValid(liked);
    setLikeCount(likes);
  }, [liked, likes]);

  const checkLogin = () => {
    const token = localStorage.getItem("refreshToken");
    if (!token) {
      toast.error("로그인이 필요한 서비스입니다!");
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleLikeClick = async () => {
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
        posterUrl: posterUrl,
       },
    });
  };

  return (
    <DetailsWrapper>
      <img src={posterUrl} alt="포스터" />

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
          <button className="write-review-button" onClick={handleWriteReviewClick}>
            리뷰 작성하기
          </button>
          <MovieScore>
            <HeartIcon liked={likeValid} onClick={handleLikeClick} /> {likeCount} | 평점: {score}
          </MovieScore>
        </MovieEvaluationFunction>
      </MovieDetailRight>
    </DetailsWrapper>
  );
};

DetailsSection.propTypes = {
  posterUrl: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  description: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  movie: PropTypes.object.isRequired,
};

export default DetailsSection;
