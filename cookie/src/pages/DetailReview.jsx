import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import DetailHeader from "../components/mypage/DetailHeader";
import ReviewContentSection from "../components/mypage/ReviewContentSection";
import ReviewTextSection from "../components/mypage/ReviewTextSection";
import FooterSection from "../components/mypage/FooterSection";
import { toast } from "react-hot-toast";

// JWT 디코딩 함수
const decodeJWT = (token) => {
  if (!token) return null;

  const base64Url = token.split(".")[1]; // JWT의 payload 부분
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  try {
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

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
      height: 20px;
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

    .comment-right {
      position: relative;

      button {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        gap: 2px; /* 점 세 개 간격 */
      }

      .menu {
        position: absolute;
        top: 100%; /* 아래로 펼치기 */
        left: 0; /* 왼쪽 정렬 */
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        padding: 5px 10px; /* 메뉴 패딩 조정 */
        display: none;
        flex-direction: row; /* 가로로 펼치기 */
        align-items: center;

        &.active {
          display: flex; /* flex로 가로 표시 */
        }

        button {
          all: unset;
          color: #333;
          font-size: 0.9rem;
          cursor: pointer;
          margin-right: 10px; /* 메뉴 항목 간 간격 */
          &:hover {
            color: #c99d66;
          }
        }
      }
    }
  }
`;

const ReviewDetail = () => {
  const { reviewId } = useParams(); // URL에서 reviewId 가져오기
  const [reviewData, setReviewData] = useState(null); // 리뷰 데이터 상태
  const [newComment, setNewComment] = useState(""); // 댓글 입력 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const token = localStorage.getItem("token"); // localStorage에서 토큰 가져오기
  const decodedToken = decodeJWT(token); // JWT 디코딩
  const userId = decodedToken?.userId; // 토큰에서 userId 추출

  // 리뷰 데이터 가져오기
  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/reviews/${reviewId}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : null,
            },
          }
        );
        const review = response.data.response; // API 응답 데이터
        setReviewData(review);
      } catch (error) {
        console.error("Failed to fetch review data:", error);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    fetchReviewData();
  }, [reviewId, token]);

  const handleAddComment = async () => {
    if (!token) {
      toast.error("로그인이 필요합니다. 로그인 후 댓글을 작성해주세요.");
      return;
    }

    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:8080/api/reviews/${reviewId}/comments/${userId}`,
        { comment: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  if (!reviewData) {
    return <Container>No review found.</Container>;
  }

  return (
    <Container>
      {/* Header */}
      <DetailHeader onBack={() => alert("뒤로가기")} />

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
            onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
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