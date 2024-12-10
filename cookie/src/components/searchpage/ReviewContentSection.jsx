import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// 스타일 정의
const ReviewContentContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  position: relative;

  .poster {
    width: 120px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 15px;
  }

  .details {
    flex: 1;
    display: flex;
    flex-direction: column;

    .profile {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

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
          font-weight: bold;
        }

        .date {
          font-size: 0.8rem;
          color: #666;
        }
      }
    }

    .movie-info {
      margin-bottom: 10px;

      .movie-title {
        font-size: 1rem;
        font-weight: bold;
        color: #04012d;
      }
    }

    .cookie-score {
      display: flex;
      align-items: center;
      margin-top: 10px;

      .cookie {
        width: 25px;
        height: 25px;
        margin-right: 5px;
        transition: transform 0.2s ease;

        &.selected {
          filter: brightness(1.3);
        }
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
  top: 40px;
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

const ReviewContentSection = ({
  posterSrc,
  profileSrc,
  name,
  date,
  movieTitle,
  cookieScoreCount,
  isMenuOpen,
  toggleMenu,
  handleDelete,
  handleUpdateReview,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const fromReviewFeed = location.state?.fromReviewFeed || false;
  const fromLikedReviews = location.state?.fromLikedReviews || false;
  const fromMyPage = location.state?.fromMyPage || false;
  const fromMyAllReviewList = location.state?.fromMyAllReviewList || false;

  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newMovieScore, setNewMovieScore] = useState(cookieScoreCount);

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

  const handleCookieClick = (index) => {
    setNewMovieScore(index + 1);
  };

  const renderMenuOptions = () => {
    if (fromReviewFeed) {
      return (
        <DropdownMenu>
          <div onClick={() => navigate("/mypage")}>내 정보 관리하기</div>
        </DropdownMenu>
      );
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
      <img className="poster" src={posterSrc} alt="Movie Poster" />

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

            <div className="movie-info">
              <span className="movie-title">{movieTitle}</span>
            </div>

            <div className="cookie-score">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={i}
                  className={`cookie ${i < newMovieScore ? "selected" : ""}`}
                  src="/images/cookiescore.svg"
                  alt="Cookie Score"
                />
              ))}
            </div>
          </>
        ) : (
          <EditForm>
            <textarea
              placeholder="수정할 리뷰 내용을 입력하세요"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
            <div className="cookie-score">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={i}
                  className={`cookie ${i < newMovieScore ? "selected" : ""}`}
                  src="/images/cookiescore.svg"
                  alt="Cookie Score"
                  onClick={() => handleCookieClick(i)}
                />
              ))}
            </div>
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
        <img src="/images/more.svg" alt="More Options" />
        {isMenuOpen && renderMenuOptions()}
      </div>
    </ReviewContentContainer>
  );
};

// PropTypes 지정
ReviewContentSection.propTypes = {
  posterSrc: PropTypes.string.isRequired,
  profileSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  movieTitle: PropTypes.string.isRequired,
  cookieScoreCount: PropTypes.number.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdateReview: PropTypes.func.isRequired,
};

export default ReviewContentSection;
