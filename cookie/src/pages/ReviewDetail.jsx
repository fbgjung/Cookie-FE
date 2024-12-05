import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../api/auth/axiosInstance";
import DetailHeader from "../components/mypage/DetailHeader";
import ReviewContentSection from "../components/mypage/ReviewContentSection";
import ReviewTextSection from "../components/mypage/ReviewTextSection";
import FooterSection from "../components/mypage/FooterSection";

const Container = styled.div`
  padding: 20px;
  width: 95%;
  margin: 0 auto;
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const CommentsSectionContainer = styled.div`
  margin-top: 20px;

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .comment-input {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 20px;
      font-size: 1rem;
      outline: none;
      margin-right: 10px;
      height: 40px;
    }

    button {
      background-color: #c99d66;
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }

  .comment {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;

    .comment-left {
      display: flex;
      align-items: center;

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
  }
`;

const ReviewDetail = () => {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await axiosInstance.get(`/api/reviews/${reviewId}`);
        setReviewData(response.data.response);
      } catch (error) {
        console.error("Failed to fetch review data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewData();
  }, [reviewId]);

  const handleAddComment = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1])); // JWT payload 추출
    const userId = payload.userId;

    if (!newComment.trim()) return;

    try {
      const response = await axiosInstance.post(
        `/api/reviews/${reviewId}/comments/${userId}`,
        { comment: newComment }
      );

      const updatedComment = response.data.response;

      setReviewData((prevData) => ({
        ...prevData,
        comments: [...prevData.comments, updatedComment],
      }));

      toast.success("댓글이 작성되었습니다!");
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("댓글 작성에 실패했습니다.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  if (!reviewData) {
    return <Container>No review found.</Container>;
  }

  return (
    <Container>
      {/* Header */}
      <DetailHeader onBack={() => navigate(-1)} />

      {/* Review Content Section */}
      <ReviewContentSection
        posterSrc={reviewData.movie.poster}
        profileSrc={reviewData.user.profileImage}
        name={reviewData.user.nickname}
        date={new Date(reviewData.createdAt).toLocaleDateString()}
        movieTitle={reviewData.movie.title}
        cookieScoreCount={reviewData.movieScore}
      />

      {/* Review Text Section */}
      <ReviewTextSection reviewText={reviewData.content} />

      {/* Footer Section */}
      <FooterSection
        likes={reviewData.reviewLike}
        comments={reviewData.comments.length}
      />

      {/* Comments Section */}
      <CommentsSectionContainer>
        <h3>Comment</h3>
        <div className="comment-input">
          <input
            type="text"
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAddComment}>↑</button>
        </div>

        {reviewData.comments.map((comment, index) => (
          <div className="comment" key={index}>
            <div className="comment-left">
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
          </div>
        ))}
      </CommentsSectionContainer>
    </Container>
  );
};

export default ReviewDetail;