import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const DetailWrapper = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
`;

const DetailHeader = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  img {
    width: 100px;
    border-radius: 8px;
  }
`;

const UserInfo = styled.div`
  .nickname {
    font-weight: bold;
    font-size: 1.2rem;
  }
  .createdAt {
    color: #666;
    font-size: 0.9rem;
  }
`;

const Content = styled.p`
  margin-top: 20px;
  font-size: 1rem;
`;

const CommentsSection = styled.div`
  margin-top: 40px;
`;

const Comment = styled.div`
  margin-bottom: 20px;

  .commentUser {
    font-weight: bold;
  }
  .commentText {
    margin-top: 5px;
  }
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

  textarea {
    width: 100%;
    height: 80px;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    resize: none;
  }

  button {
    align-self: flex-end;
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #04012d;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #333;
    }
  }
`;

const ReviewDetail = () => {
  const { reviewId } = useParams();
  const [review, setReview] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`/api/reviews/${reviewId}`);
        setReview(response.data.response);
      } catch (error) {
        console.error("Failed to fetch review:", error);
      }
    };

    fetchReview();
  }, [reviewId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // 빈 입력 방지

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `/api/reviews/${reviewId}/comments/1`, // userId는 로그인된 사용자 ID로 대체 필요
        { comment: newComment }
      );

      if (response.data.response === "SUCCESS") {
        setReview((prevReview) => ({
          ...prevReview,
          comments: [
            ...prevReview.comments,
            {
              user: { nickname: "현재 사용자", profileImage: "" }, // 임시 데이터
              comment: newComment,
              createdAt: new Date().toISOString(),
            },
          ],
        }));
        setNewComment(""); // 입력 필드 초기화
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!review) return <p>Loading...</p>;

  return (
    <DetailWrapper>
      <DetailHeader>
        <img src={review.movie.poster} alt={review.movie.title} />
        <div>
          <UserInfo>
            <div className="nickname">{review.user.nickname}</div>
            <div className="createdAt">
              {new Date(review.createdAt).toLocaleString()}
            </div>
          </UserInfo>
        </div>
      </DetailHeader>
      <Content>{review.content}</Content>
      <CommentsSection>
        <h3>댓글</h3>
        {review.comments.map((comment, index) => (
          <Comment key={index}>
            <div className="commentUser">{comment.user.nickname}</div>
            <div className="commentText">{comment.comment}</div>
          </Comment>
        ))}
        <CommentForm onSubmit={handleCommentSubmit}>
          <textarea
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "등록 중..." : "댓글 등록"}
          </button>
        </CommentForm>
      </CommentsSection>
    </DetailWrapper>
  );
};

export default ReviewDetail;