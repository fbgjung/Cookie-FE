import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
// import { stepLabelClasses } from "@mui/material";
import axiosInstance from "../../api/auth/axiosInstance";

const ReviewContentContainer = styled.div`
  display: flex;
  margin: 1rem 2rem;
  flex-direction: column;
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
`

const ScoreSection = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  background-color: #fdf8fa;
  border: 1px solid #F84B99;
  border-radius: 0.4rem;
  padding: 0.4rem 0.7rem;
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
  font-size: 0.9rem;
`

const ReviewSection = styled.div`
  .details {
    display: flex;
    flex-direction: column;

    .profile {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      img {
        
      }

      .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .name {
          font-size: 0.9rem;
          color: #000000;
          font-weight: bold;
        }

        .date {
          font-size: 0.8rem;
          color: #000000;
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

    .movie-info {
      margin-bottom: 10px;

      .movie-title {
        font-size: 1rem;
        font-weight: bold;
        color: white;
      }
    }
  }
`

const Left = styled.div`
  display: flex;
`

const Right = styled.div`
  display: flex;
  align-items: center;
`

const Profile = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1.5px solid #b8b5b5;
`
const ReviewScore = styled.img`
  width: 1.2rem;
  height: 1.2rem;
 
`

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
      color: #F84B99;
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

const ReviewLikeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0 0 0;
  flex-direction: column;

  p {
    color: #F84B99;
  }
`

const ReviewLikeIcon = styled.svg`
  width: 42px;
  height: 42px;
  background: no-repeat center/cover
    url(${({ $likedByUser }) =>
      $likedByUser
        ? "/assets/images/review/full-heart-review-feed.svg"
        : "/assets/images/review/heart-review-feed.svg"});
  cursor: pointer;
`;


const ReviewLikeText = styled.p`
  font-size: 1.5rem;
`

const ReviewText = styled.div`
  font-size: 1rem;
  color: #0f0c0c;
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
}) => {
  const location = useLocation();

  const fromReviewFeed = location.state?.fromReviewFeed || false;
  const fromLikedReviews = location.state?.fromLikedReviews || false;
  const fromMyPage = location.state?.fromMyPage || false;
  const fromMyAllReviewList = location.state?.fromMyAllReviewList || false;

  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newMovieScore, setNewMovieScore] = useState(cookieScoreCount);

  const [liked, setLiked] = useState(likedByUser); 
  const [currentLikeCount, setCurrentLikeCount] = useState(reviewLikeCount);



  const handleLikeClick = async () => {
    const previousLiked = liked; // 버튼을 누르기 전 상태
    const previousLikeCount = currentLikeCount; // 버튼을 누르기 전 좋아요 수
    setLiked(!previousLiked);
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
    setLiked(previousLikeCount);
    setCurrentLikeCount(previousLikeCount);
    }
  };
  
  const handleEditClick = () => {
    setIsEditing(true);
    setNewContent("");
    setNewMovieScore(reviewScore);
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
      
      <MovieSection>
        <img className="poster" src={posterSrc} alt="Movie Poster" onClick={onPosterClick} /> 
        <ScoreSection>
          <ScoreIcon></ScoreIcon>
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
                  <Profile src={profileSrc} alt="Profile" />
                  
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
                {! fromReviewFeed && (
                  <div className="edit-or-delete" onClick={toggleMenu}>
                    <svg></svg>
                    {isMenuOpen && renderMenuOptions()}
                  </div>)
                }
                </Right>
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
        
      </ReviewSection>
      <ReviewText>
        <p>{reviewContent}</p>
      </ReviewText>
      
      <ReviewLikeSection>
        {/* <p>리뷰가 마음에 들어요</p> */}
        <ReviewLikeIcon $likedByUser={liked} onClick={handleLikeClick}></ReviewLikeIcon>
        <ReviewLikeText>{currentLikeCount}</ReviewLikeText>
      </ReviewLikeSection> 
      <Divider />
    
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
  reviewContent: PropTypes.string.isRequired,
  reviewScore: PropTypes.number.isRequired,
  openLoginModal: PropTypes.func.isRequired,
  $likedByUser: PropTypes.bool.isRequired,
  likedByUser: PropTypes.bool.isRequired,

};



export default ReviewContentSection;


