import styled from "styled-components";
import PropTypes from "prop-types";

const ReviewFeedWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;

    .cookie-icon {
      font-size: 24px;
    }

    .subtitle {
      font-size: 16px;
      color: #999;
    }
  }

  .review-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .review-item {
    background-image: url("/assets/images/mypage/reviewticket.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px;
    border-radius: 8px;
    position: relative;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }

    .left-section {
      flex: 0 0 100px;
      img {
        width: 100%;
        height: auto;
        border-radius: 8px;
      }

      .movie-title {
        font-size: 14px;
        font-weight: bold;
        margin-top: 5px;
      }

      .director {
        font-size: 12px;
        color: #666;
      }
    }

    .center-section {
      flex: 1;
      margin-left: 20px;

      @media (max-width: 768px) {
        margin-left: 0;
        margin-top: 15px;
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 10px;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .name-and-time {
          .user-name {
            font-size: 14px;
            font-weight: bold;
          }

          .time {
            font-size: 12px;
            color: #666;
          }
        }
      }

      .comment {
        font-size: 14px;
        margin-top: 10px;
        line-height: 1.5;
      }

      .spoiler {
        color: #cc5283;
        font-size: 12px;
        font-weight: bold;
        margin-top: 5px;
      }
    }

    .right-section {
      position: absolute;
      top: 15px;
      right: 15px;
      display: flex;
      gap: 15px;

      .icon {
        cursor: pointer;
        font-size: 18px;
        color: #666;

        &:hover {
          color: #cc5283;
        }
      }
    }
  }
`;

const ReviewFeed = ({ reviews }) => {
  return (
    <ReviewFeedWrapper>
      <div className="title">
        Cookie Review 🍪 <span className="subtitle">쿠키의 전체리뷰</span>
      </div>
      <div className="review-list">
        {reviews.map((review, index) => (
          <div className="review-item" key={index}>
            <div className="left-section">
              <img src={review.moviePoster} alt={review.movieTitle} />
              <div className="movie-title">{review.movieTitle}</div>
              <div className="director">{review.director}</div>
            </div>
            <div className="center-section">
              <div className="user-info">
                <img src={review.userImage} alt={review.userName} />
                <div className="name-and-time">
                  <div className="user-name">{review.userName}</div>
                  <div className="time">{review.time}</div>
                </div>
              </div>
              <div className="comment">{review.comment}</div>
              {review.containsSpoiler && (
                <div className="spoiler">⚠️ 스포일러가 포함된 리뷰보기</div>
              )}
            </div>
            <div className="right-section">
              <div className="icon">❤️</div>
              <div className="icon">⋮</div>
            </div>
          </div>
        ))}
      </div>
    </ReviewFeedWrapper>
  );
};

ReviewFeed.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      moviePoster: PropTypes.string.isRequired,
      movieTitle: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      userImage: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      containsSpoiler: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default ReviewFeed;