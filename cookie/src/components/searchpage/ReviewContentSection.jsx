import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import axiosInstance from "../../api/auth/axiosInstance";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import useUserStore from "../../stores/useUserStore";
import { jwtDecode } from "jwt-decode";

const ReviewContentContainer = styled.div`
  display: flex;
  margin: 1rem 2rem;
  flex-direction: column;
`;

const MacaronIcon = styled.img`
  width: 2rem;
  height: 2rem;
  filter: ${({ active }) => (active ? "brightness(1)" : "brightness(0.5)")};
  transition: filter 0.2s ease;
  cursor: pointer;
`;

const MovieSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .poster {
    width: 6rem;
    height: auto;
    object-fit: cover;
    border-radius: 0.2rem;
    cursor: pointer;
    box-shadow: 0 0 200px 55px rgba(248, 75, 153, 0.2);
  }
`;

const ProfileWrapper = styled.div`
  position: relative; /* 뱃지 배치를 위한 기준 */
  display: inline-block;
`;

const ProfileImage = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  margin-right: 15px;

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }
`;

const BadgeIcon = styled.img`
  position: absolute;
  bottom: -5px;
  right: 0px;
  width: 35px;
  height: 35px;

  @media (max-width: 480px) {
    bottom: 0px;
    width: 30px;
    height: 30px;
  }
`;

const ScoreSection = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  background-color: #fdf8fa;
  border: 1px solid #f84b99;
  border-radius: 0.4rem;
  padding: 0.4rem 0.7rem;
  margin-top: 0.4rem;
`;

const ScoreIcon = styled.svg`
  width: 14px;
  height: 14px;
  background: no-repeat center/cover
    url("/assets/images/review/score-macarong.png");
`;

const ScoreText = styled.p`
  font-weight: 500;
  color: #f84b99;
  font-size: 0.9rem;
`;

const ReviewSection = styled.div`
  .details {
    display: flex;
    flex-direction: column;

    .profile {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;

      .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .name {
          font-size: 16px;
          color: var(--text-wh);
          font-weight: bold;
        }

        .date {
          font-size: 14px;
          color: var(--text-wh); 
        }

        @media (max-width: 480px) {
          .name {
            font-size: 14px;
          }

          .date {
            font-size: 12px;
          }
        }

      .edit-or-delete {
        cursor: pointer;
        position: relative;
        svg {
          width: 24px;
          height: 24px;
          background: no-repeat center/cover url("/assets/images/more-view.svg");
        }
      }
    }
  }
`;

const Left = styled.div`
  display: flex;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Profile = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1.5px solid #b8b5b5;
`;

const ReviewScore = styled.img`
  width: 1.2rem;
  height: 1.2rem;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
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
      color: #f84b99;
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
    color: #222222;
    border: 1px solid #ddd;
    border-radius: 8px;
    resize: none;
    height: 120px;
    outline: none;
  }

  .action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    button {
      padding: 8px 14px;
      font-size: 0.8rem;
      background-color: #ff0777;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;

      &:hover {
        background-color: #ff0777;
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

const ScoreEditContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const ScoreRadio = styled.label`
  display: inline-block;
  cursor: pointer;

  input {
    display: none;
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
    opacity: ${(props) => (props.checked ? 1 : 0.3)};
    transition: opacity 0.2s;
  }
`;

const ReviewLikeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0 0 0;
  flex-direction: column;

  p {
    color: #f84b99;
  }
`;

const ReviewLikeIcon = styled.svg`
  width: 42px;
  height: 42px;
  background: no-repeat center/cover
    url(${({ $likedByUser }) =>
      $likedByUser
        ? "/assets/images/review/full-heart-review-feed.svg"
        : "/assets/images/review/heart-review.svg"});
  cursor: pointer;
`;

const ReviewLikeText = styled.p`
  font-size: 1.5rem;
`;

const ReviewText = styled.div`
  font-size: 1rem;
  color: var(--text-wh);
  line-height: 1.5;
  margin: 1rem 1rem 0 0;

  p {
    margin-bottom: 10px;
    font-weight: 500;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 2rem 0;
`;

const ReviewContentSection = ({
  posterSrc,
  profileSrc,
  badgeSrc,
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
  reviewContent,
  reviewScore,
  openLoginModal,
  likedByUser,
  userId,
}) => {
  const location = useLocation();

  const { userInfo } = useUserStore(); // 전역 상태의 유저 정보 가져오기
  const loggedInUserId = userInfo?.userId; // 로그인된 유저 ID 추출

  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newMovieScore, setNewMovieScore] = useState(cookieScoreCount);
  const [liked, setLiked] = useState(likedByUser);
  const [currentLikeCount, setCurrentLikeCount] = useState(reviewLikeCount);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Control modal visibility

  const handleLikeClick = async () => {
    const previousLiked = liked;
    const previousLikeCount = currentLikeCount;

    if (!loggedInUserId) {
      openLoginModal();
      return;
    }

    if (userId === loggedInUserId) {
      toast.error("본인의 리뷰에는 좋아요를 누를 수 없습니다.");
      return;
    }

    setLiked(!previousLiked);
    setCurrentLikeCount(
      previousLiked ? previousLikeCount - 1 : previousLikeCount + 1
    );

    try {
      await axiosInstance.post(`/api/users/review-like/${reviewId}`);
    } catch (error) {
      console.error("Failed to toggle like:", error);
      setLiked(previousLikeCount);
      setCurrentLikeCount(previousLikeCount);
    }
  };

  // Edit Handlers
  const handleEditClick = () => {
    setIsEditing(true);
    setNewContent(reviewContent);
    setNewMovieScore(reviewScore);
  };

  const handleCancelEdit = () => setIsEditing(false);

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

  // Delete Handlers
  const handleDeleteWithConfirmation = () => setShowDeleteModal(true);

  const confirmDelete = () => {
    handleDelete(); // Trigger delete action
    setShowDeleteModal(false); // Close modal
  };

  const cancelDelete = () => setShowDeleteModal(false);

  const renderMenuOptions = () => {
    return (
      <DropdownMenu>
        <div onClick={handleEditClick}>수정하기</div>
        <div onClick={handleDeleteWithConfirmation}>삭제하기</div>
      </DropdownMenu>
    );
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      <ReviewContentContainer>
        <MovieSection>
          <img
            className="poster"
            src={posterSrc}
            alt="Movie Poster"
            onClick={onPosterClick}
          />
          <ScoreSection>
            <ScoreIcon />
            <ScoreText>평점 {newMovieScore}</ScoreText>
          </ScoreSection>
        </MovieSection>

        <Divider />

        <ReviewSection>
          <div className="details">
            {!isEditing ? (
              <>
                <div className="profile">
                  <Left>
                    <ProfileWrapper>
                      <ProfileImage src={profileSrc} alt={name} />
                      {badgeSrc && <BadgeIcon src={badgeSrc} alt="대표 뱃지" />}
                    </ProfileWrapper>
                    <div className="user-info">
                      <span className="name">{name}</span>
                      <span className="date">{date}</span>
                    </div>
                  </Left>
                  <Right>
                    {[...Array(reviewScore)].map((_, index) => (
                      <ReviewScore
                        key={index}
                        src="/assets/images/review/score-macarong.png"
                        alt="score"
                      />
                    ))}
                    {loggedInUserId === userId && (
                      <div className="edit-or-delete" onClick={toggleMenu}>
                        <svg />
                        {isMenuOpen && renderMenuOptions()}
                      </div>
                    )}
                  </Right>
                </div>
              </>
            ) : (
              <EditForm>
                <ScoreEditContainer>
                  {[1, 2, 3, 4, 5].map((score) => (
                    <MacaronIcon
                      key={score}
                      src="/assets/images/review/score-macarong.png"
                      alt={`${score} 점`}
                      active={score <= newMovieScore}
                      onClick={() => setNewMovieScore(score)}
                    />
                  ))}
                </ScoreEditContainer>
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
        </ReviewSection>

        {!isEditing && (
          <ReviewText>
            <p>{reviewContent}</p>
          </ReviewText>
        )}

        {!isEditing && (
          <>
            <ReviewLikeSection>
              <ReviewLikeIcon $likedByUser={liked} onClick={handleLikeClick} />
              <ReviewLikeText>{currentLikeCount}</ReviewLikeText>
            </ReviewLikeSection>
            <Divider />
          </>
        )}
      </ReviewContentContainer>
    </>
  );
};

export default ReviewContentSection;
