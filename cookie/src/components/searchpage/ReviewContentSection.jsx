import styled from "styled-components";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

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
      display: flex;
      flex-direction: column;
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

      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
  }

  .options {
    position: relative;
    right: 10px;
    width: 24px;
    height: 24px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  white-space: nowrap;

  div {
    padding: 12px 20px;
    font-size: 0.9rem;
    color: #333;
    cursor: pointer;
    text-align: left;
    line-height: 1.5;
    display: block;

    &:hover {
      background: #f9f9f9;
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
  handleEdit,
  handleDelete,
}) => {
  const location = useLocation();

  const isFromReviewList = location.state?.from === "reviewList";

  const handleMyPageRedirect = () => {
    console.log("내 리뷰 관리하기 클릭됨");
  };

  return (
    <ReviewContentContainer>
      <img className="poster" src={posterSrc} alt="Movie Poster" />

      <div className="details">
        <div className="profile">
          <img src={profileSrc} alt="Profile Picture" />
          <div className="user-info">
            <span className="name">{name}</span>
            <span className="date">{date}</span>
          </div>
        </div>

        <div className="movie-info">
          <span className="movie-title">{movieTitle}</span>
        </div>

        <div className="cookie-score">
          {Array.from({ length: cookieScoreCount }).map((_, i) => (
            <img
              key={i}
              src="/images/cookiescore.svg"
              alt="Cookie Score"
            />
          ))}
        </div>
      </div>

      <div className="options" onClick={toggleMenu}>
        <img src="/images/more.svg" alt="More Options" />
        {isMenuOpen && (
          <DropdownMenu className="dropdown-menu">
            {isFromReviewList ? (
              <>
                <div onClick={handleEdit}>수정하기</div>
                <div onClick={handleDelete}>삭제하기</div>
              </>
            ) : (
              <div onClick={handleMyPageRedirect}>내 리뷰 관리하기</div>
            )}
          </DropdownMenu>
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
  cookieScoreCount: PropTypes.number.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default ReviewContentSection;
