import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import axiosInstance from "../../api/auth/axiosInstance";
import { UserProfile } from "./LikeList";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 700px;

  display: flex;
  flex-direction: column;
  justify-content: start;

  h3 {
    text-align: center;
  }
`;

const CloseButton = styled.button`
  background: #aad6e7;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  align-items: center;
  width: 58px;
  font-weight: bold;
`;

const CommentsList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
  margin: 10px 0;
  gap: 5px;
  div {
    font-size: 20px;
    display: flex;
    flex-direction: column;
  }
  button {
    margin-left: 200px;
  }
`;
const CommentActions = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;

  button {
    background: none;
    color: var(--text);
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      color: var(--sub-text);
    }
  }
`;
const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;
const ContentWrapper = styled.div`
  font-size: 16px;
  color: #333;
  margin-top: 8px;
`;
function CommentsModal({ comments, closeModal, reviewId }) {
  const [updatedComments, setUpdatedComments] = useState(comments);

  const fetchComments = async (reviewId) => {
    try {
      const response = await axiosInstance.get(
        `/api/admin/reviews/detail/${reviewId}/comments`
      );
      console.log("댓글목록", response.data.response);
      setUpdatedComments(response.data.response);
    } catch (err) {
      console.error("댓글을 가져오는 데 실패했습니다.", err);
    }
  };

  useEffect(() => {
    if (reviewId) {
      fetchComments(reviewId);
    }
  }, [reviewId]);

  const deleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(
        `/api/admin/reviews/detail/${reviewId}/comments/${commentId}`
      );
      console.log("댓글 삭제 성공");
      fetchComments(reviewId);
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h3>댓글 리스트</h3>

        <CommentsList>
          {updatedComments.length === 0 ? (
            <p>No comments available.</p>
          ) : (
            updatedComments.map((comment, index) => (
              <CommentItem key={index}>
                <UserProfile src={comment.userProfile} alt="User Profile" />
                <div>
                  <div>
                    <strong>{comment.username}</strong>
                    <span>{comment.createdAt}</span>
                  </div>
                  <ContentWrapper>{comment.content}</ContentWrapper>
                </div>
                <CommentActions>
                  <button onClick={() => deleteComment(comment.commentId)}>
                    삭제하기
                  </button>
                </CommentActions>
              </CommentItem>
            ))
          )}
        </CommentsList>
        <CloseButtonWrapper>
          <CloseButton onClick={closeModal}>닫기</CloseButton>
        </CloseButtonWrapper>
      </ModalContent>
    </ModalContainer>
  );
}

export default CommentsModal;
