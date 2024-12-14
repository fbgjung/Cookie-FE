import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { stepLabelClasses } from "@mui/material";
import axiosInstance from "../../api/auth/axiosInstance";

const ReviewContentContainer = styled.div`
  display: flex;
  margin: 0 2rem;
  flex-direction: column;
  align-items: center;

  .poster {
    width: 7.75rem;
    height: 11rem;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 15px;
    cursor: pointer;
  }

  .details {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;

    .profile {
      display: flex;
      align-items: center;
      margin-top: 40px;
      width: 100%;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .user-info {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 0.9rem;
          color: white;
          font-weight: bold;
        }

        .date {
          font-size: 0.8rem;
          color: #f9f9f9;
        }
      }
    }

    .movie-info {
      margin-bottom: 10px;

      .movie-title {
        font-size: 1rem;
        font-weight: bold;
        color: white;
      }
    }
  }

  .options {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;

    img {
      width: 24px;
      height: 24px;
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  white-space: nowrap;

  div {
    padding: 10px 15px;
    font-size: 0.9rem;
    color: #333;
    cursor: pointer;

    &:hover {
      background: #f9f9f9;
    }
  }
`;

const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  textarea {
    padding: 10px;
    font-size: 0.85rem;
    color: white;

    border: 1px solid #ddd;
    border-radius: 8px;
    resize: none;
    height: 120px;
  }

  .action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    button {
      padding: 8px 14px;
      font-size: 0.8rem;
      background-color: #2589e7;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;

      &:hover {
        background-color: #1b6bbf;
      }

      &.cancel {
        background-color: #aaa;

        &:hover {
          background-color: #888;
        }
      }
    }
  }
`;

const ScoreSection = styled.div`
  display: flex;
  gap: 0.2rem;
  align-items: center;
  background-color: #fdf8fa;
  border: 1px solid #F84B99;
  border-radius: 0.4rem;
  padding: 0.4rem 0.7rem;
  max-width: max-content; // 가로 길이 컨텐츠에 맞춤!
  margin-top: 0.4rem;
`
const ScoreIcon = styled.svg`
  width: 14px;
  height: 14px;
  background: no-repeat center/cover url("/assets/images/review/score-macarong.png");
`

const ScoreText = styled.p`
  font-weight: 500;
  color: #F84B99; 
`

const ReviewLike = styled.div`
  display: flex;

`

const ReviewLikeIcon = styled.svg`
  width: 14px;
  height: 14px;
  background: no-repeat center/cover url("/assets/images/review/heart-review-feed.svg");
`

const ReviewLikeText = styled.p`
`

// 메인 컴포넌트
const ReviewContentSection = ({
  posterSrc,
  profileSrc,
  name,
  date,
  reviewLikeCount,
  cookieScoreCount,
  isMenuOpen,
  toggleMenu,
  handleDelete,
  handleUpdateReview,
  onPosterClick,
  reviewId,
  openLoginModal,
}) => {
  const location = useLocation();

  const fromReviewFeed = location.state?.fromReviewFeed || false;
  const fromLikedReviews = location.state?.fromLikedReviews || false;
  const fromMyPage = location.state?.fromMyPage || false;
  const fromMyAllReviewList = location.state?.fromMyAllReviewList || false;

  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newMovieScore, setNewMovieScore] = useState(cookieScoreCount);

  const [likedByUser, setLikedByUser] = useState(false); 
  const [currentLikeCount, setCurrentLikeCount] = useState(reviewLikeCount);

  const handleLikeClick = async () => {
    const previousLiked = likedByUser;
    const previousLikeCount = currentLikeCount;
    setLikedByUser(!previousLiked);
    setCurrentLikeCount(previousLiked ? previousLikeCount - 1 : previousLikeCount + 1);

    try {
      await axiosInstance.post(`/api/users/review-like/${reviewId}`);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    if (error.response?.data?.message === "자신의 리뷰에는 좋아요를 누를 수 없습니다.") { // 예외 처리 추가
      toast.error("자신의 리뷰에는 좋아요를 누를 수 없습니다.");
    } else {
      openLoginModal?.();
    }
    setLikedByUser(previousLiked);
    setCurrentLikeCount(previousLikeCount);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setNewContent("");
    setNewMovieScore(cookieScoreCount);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      await handleUpdateReview({
        content: newContent,
        movieScore: newMovieScore,
        isSpoiler: false,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("리뷰 업데이트 실패:", error);
      toast.error("리뷰 업데이트에 실패했습니다.");
    }
  };

  const handleDeleteWithConfirmation = () => {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmed) {
      handleDelete();
    }
  };

  const renderMenuOptions = () => {
    if (fromLikedReviews) {
      return null;
    }

    if ((fromMyPage || fromMyAllReviewList) && !fromLikedReviews) {
      return (
        <DropdownMenu>
          <div onClick={handleEditClick}>수정하기</div>
          <div onClick={handleDeleteWithConfirmation}>삭제하기</div>
        </DropdownMenu>
      );
    }

    return null;
  };

  return (
    <ReviewContentContainer>
      <img className="poster" src={posterSrc} alt="Movie Poster" onClick={onPosterClick} />      
      <ScoreSection>
        <ScoreIcon></ScoreIcon>
        <ScoreText>{newMovieScore}</ScoreText>
      </ScoreSection>
      <ReviewLike>
        <ReviewLikeIcon onClick={handleLikeClick}></ReviewLikeIcon>
        <ReviewLikeText>{currentLikeCount}</ReviewLikeText>
      </ReviewLike>

      <div className="details">
        {!isEditing ? (
          <>
            <div className="profile">
              <img src={profileSrc} alt="Profile" />
              <div className="user-info">
                <span className="name">{name}</span>
                <span className="date">{date}</span>
              </div>
            </div>
          </>
        ) : (
          <EditForm>
            <textarea
              placeholder="수정할 리뷰 내용을 입력하세요"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
            <div className="action-buttons">
              <button onClick={handleSaveEdit}>저장</button>
              <button className="cancel" onClick={handleCancelEdit}>
                취소
              </button>
            </div>
          </EditForm>
        )}
      </div>

      <div className="options" onClick={toggleMenu}>
        {!fromReviewFeed && (
          <>
            <img src="/images/more.svg" alt="More Options" />
            {isMenuOpen && renderMenuOptions()}
          </>
        )}
      </div>
    </ReviewContentContainer>
  );
};

ReviewContentSection.propTypes = {
  posterSrc: PropTypes.string.isRequired,
  profileSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  movieTitle: PropTypes.string.isRequired,
  reviewLikeCount: PropTypes.number.isRequired,
  cookieScoreCount: PropTypes.number.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdateReview: PropTypes.func.isRequired,
  onPosterClick: PropTypes.func.isRequired,
  reviewId: PropTypes.string.isRequired,
  openLoginModal: PropTypes.func.isRequired,
};

export default ReviewContentSection;
