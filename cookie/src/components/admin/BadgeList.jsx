import React, { useEffect, useState } from "react";
import { DefalutContainer } from "./Likes";
import axiosInstance from "../../api/auth/axiosInstance";
import deleteBtn from "../../assets/images/admin/delete_btn.svg";
import Edit from "../../assets/images/admin/Edit.svg";
import styled from "styled-components";
import EditBadgeModal from "./EditBadgeModal";
import Addcookie from "../../assets/images/admin/empty_cookie.svg";

const TitleContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 20px;
`;

export const TableTitle = styled.div`
  width: 1130px;
  height: 32px;
  border: none;
  background-color: var(--sub);
  color: var(--text);
  border-radius: 12px;
  margin: 20px 16px 16px 16px;
  padding: 0 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr 1.8fr 1fr 0.7fr;
  gap: 14px;
  justify-items: center;

  p {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    display: flex;
    align-items: center;
  }
`;
const MatchUpListContainer = styled.div`
  width: 1130px;
  margin: 0.5rem 1rem 0 1rem;
  padding: 0 0.4rem;
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 14px;
`;

const BadgeContainer = styled.div`
  padding: 20px;
`;

const BadgeItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr 1.8fr 1fr 0.7fr;
  align-items: center;
  justify-items: center;
  gap: 14px;
  padding: 10px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;
const BadgeName = styled.div`
  margin-right: 20px;
  font-weight: bold;
`;

const Genre = styled.div`
  margin-right: 20px;
`;

const BadgeImage = styled.img`
  margin-right: 20px;
  width: 50px;
  height: 50px;
`;

const NeedPoint = styled.div`
  margin-right: 20px;
`;

const DeleteIcon = styled.img`
  transition: transform 0.3s ease;
  width: 20px;
  height: 20px;
  &:hover {
    transform: scale(1.1);
  }
`;

const DeleteBtnIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
const EditIcon = styled.img`
  width: 21px;
  height: 21px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const EditBtnIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
function BadgeList() {
  const [badgeList, setBadgeList] = useState([]);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchBadgeList = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/reward");
      console.log("Badge Info:", response.data.response);
      setBadgeList(response.data.response);
    } catch (error) {
      console.error("Error fetching badge info:", error);
    }
  };

  const handleDeleteBadge = async (badgeId) => {
    try {
      await axiosInstance.delete(`/api/admin/reward/${badgeId}`);
      console.log("배지 삭제 성공");

      setBadgeList((prevList) =>
        prevList.filter((badge) => badge.badgeId !== badgeId)
      );
    } catch (error) {
      console.error("배지 삭제 실패:", error);
    }
  };

  const handleEditBadge = (badge) => {
    setSelectedBadge(badge);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedBadge(null);
  };

  useEffect(() => {
    fetchBadgeList();
  }, []);
  return (
    <>
      <DefalutContainer>
        <TitleContainer>
          <img src={Addcookie} />
          <h2>배지관리</h2>
        </TitleContainer>
        <BadgeContainer>
          <TableTitle>
            <p>배지이름</p>
            <p>등급</p>
            <p>배지 이미지</p>
            <p>필요포인트</p>
            <p>관리</p>
          </TableTitle>
          <MatchUpListContainer>
            {badgeList.length > 0 ? (
              badgeList.map((badge) => (
                <BadgeItem key={badge.badgeId}>
                  <BadgeName>{badge.badgeName}</BadgeName>
                  <Genre>{badge.genre}</Genre>
                  <BadgeImage src={badge.badgeImage} alt={badge.badgeName} />
                  <NeedPoint>{badge.needPoint} 포인트</NeedPoint>

                  <ButtonGroup>
                    <EditBtnIcon onClick={() => handleEditBadge(badge)}>
                      <EditIcon src={Edit} alt="Edit" />
                    </EditBtnIcon>
                    <DeleteBtnIcon
                      onClick={() => handleDeleteBadge(badge.badgeId)}
                    >
                      <DeleteIcon src={deleteBtn} alt="Delete" />
                    </DeleteBtnIcon>
                  </ButtonGroup>
                </BadgeItem>
              ))
            ) : (
              <div>배지 정보가 없습니다.</div>
            )}
          </MatchUpListContainer>
        </BadgeContainer>
      </DefalutContainer>
      {isEditModalOpen && (
        <EditBadgeModal
          badge={selectedBadge}
          onClose={closeEditModal}
          fetchBadgeList={fetchBadgeList}
        />
      )}
    </>
  );
}

export default BadgeList;
