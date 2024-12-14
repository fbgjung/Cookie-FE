import { useEffect, useState } from "react";
import axiosInstance from "../../api/auth/axiosInstance";
import styled from "styled-components";
import likeIcon from "../../assets/images/admin/like_heart.svg";
import { UserProfile } from "./LikeList";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
`;

const List = styled.ul`
  margin: 20px 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
  margin: 20px 0 30px 0;
  gap: 5px;
  div {
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 8px;
  }
`;

const Message = styled.p`
  font-size: 16px;
  color: #999;
`;

const CloseButton = styled.button`
  background: #aad6e7;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;

const LikesModal = ({ reviewId, onClose }) => {
  const [likes, setLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/admin/reviews/detail/${reviewId}/likes`
        );
        if (response.status === 200) {
          setLikes(response.data.response);
          console.log("좋아요 목록 조회:", response.data.response);
        }
      } catch (error) {
        console.error("좋아요 목록 요청 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (reviewId) {
      fetchLikes();
    }
  }, [reviewId]);

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>좋아요 리스트</Title>
        {isLoading ? (
          <Message>로딩 중...</Message>
        ) : likes.length > 0 ? (
          <List>
            {likes.map((like) => (
              <ListItem key={like.likeId}>
                <UserProfile src={like.userProfile} alt="User Profile" />
                <div>
                  <div>{like.username}</div>
                  <div>{like.createdAt}</div>
                </div>
                <img
                  src={likeIcon}
                  style={{ height: "31px", width: "31px", margin: "0 20px" }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Message>좋아요를 누른 사용자가 없습니다.</Message>
        )}
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LikesModal;
