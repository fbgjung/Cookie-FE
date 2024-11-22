import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DetailHeader from "../components/mypage/DetailHeader";
import ReviewContentSection from "../components/mypage/ReviewContentSection";
import ReviewTextSection from "../components/mypage/ReviewTextSection";
import FooterSection from "../components/mypage/FooterSection";

const Container = styled.div`
  padding: 20px;
  max-width: 768px;
  margin: 0 auto;
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const CommentsSection = styled.div`
  margin-top: 20px;

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .comment {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .comment-content {
      background-color: #f8f8f8;
      border-radius: 8px;
      padding: 10px;
      font-size: 0.9rem;

      .nickname {
        font-weight: bold;
        margin-bottom: 5px;
      }

      .text {
        color: #333;
      }

      .date {
        font-size: 0.8rem;
        color: #666;
        margin-top: 5px;
      }
    }
  }
`;

const DetailReview = () => {
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const [reviewData, setReviewData] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/reviews/${reviewId}`
        );
        setReviewData(response.data.response[0]);
      } catch (error) {
        console.error("Failed to fetch review data:", error);
      }
    };

    fetchReviewData();
  }, [reviewId]);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    alert("수정하기를 선택했습니다.");
    setMenuOpen(false);
  };

  const handleDelete = () => {
    alert("삭제하기를 선택했습니다.");
    setMenuOpen(false);
  };

  if (!reviewData) {
    return <Container>로딩 중...</Container>;
  }

  return (
    <Container>
      {/* Header */}
      <DetailHeader onBack={handleBack} />

      {/* Review Content Section */}
      <ReviewContentSection
        posterSrc={reviewData.movie.poster}
        profileSrc={reviewData.user.profileImage}
        name={reviewData.user.nickname}
        date={new Date(reviewData.createdAt).toLocaleDateString()}
        movieTitle={reviewData.movie.title}
        movieYearCountry="미국"
        cookieScoreCount={reviewData.movieScore}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* Review Text Section */}
      <ReviewTextSection reviewText={reviewData.content} />

      {/* Comments Section */}
      <CommentsSection>
        <h3>댓글</h3>
        {reviewData.comments.map((comment, index) => (
          <div className="comment" key={index}>
            <img
              src={comment.user.profileImage}
              alt={`${comment.user.nickname} 프로필`}
            />
            <div className="comment-content">
              <div className="nickname">{comment.user.nickname}</div>
              <div className="text">{comment.comment}</div>
              <div className="date">
                {new Date(comment.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </CommentsSection>

      {/* Footer Section */}
      <FooterSection
        likes={reviewData.reviewLike}
        comments={reviewData.comments.length}
      />
    </Container>
  );
};

export default DetailReview;
