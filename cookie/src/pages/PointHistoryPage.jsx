import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/auth/axiosInstance";
import useAuthStore from "../stores/useAuthStore";
import LoginModal from "../components/common/LoginModal";

const Container = styled.div`
  padding: 2rem;
  background-color: #ffffff;
  min-height: 100vh;
  color: #333;
  position: relative;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const BackButton = styled.div`
  width: 32px;
  height: 32px;
  background: no-repeat center/cover url("/assets/images/prev-button.svg");
  cursor: pointer;
  position: absolute;
  top: 20px;
  left: 4%;
  transition:
    transform 0.3s ease,
    opacity 0.2s ease;

  &:hover {
    transform: scale(1.2);
    opacity: 0.8;
  }
`;

const HistoryTable = styled.table`
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
  border-collapse: collapse;
  background-color: #fdf8fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const TableHeader = styled.thead`
  background-color: #f84b99;
  color: white;

  th {
    padding: 1rem;
    text-align: left;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    th {
      font-size: 0.9rem;
    }
  }
`;

const TableRow = styled.tr`
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableData = styled.td`
  padding: 1.2rem;
  font-size: 1rem;
  color: #555;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    padding: 0.8rem;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #999;
  margin-top: 2rem;
`;

const BadgeHistory = () => {
  const [badgeHistory, setBadgeHistory] = useState([]);
  const navigate = useNavigate();
  const openLoginModal = useAuthStore((state) => state.openLoginModal);
  const isLogined = useAuthStore((state) => state.isLogined);

  const handleBackClick = () => {
    navigate(-1);
  };

  const fetchBadgeHistory = async () => {
    try {
      const response = await axiosInstance.get("/api/users/badgeHistory");
      const historyData = response.data.response || [];

      const sortedHistory = historyData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setBadgeHistory(sortedHistory);
    } catch (error) {
      console.error("뱃지 내역 로딩 실패:", error);
      setBadgeHistory([]);
    }
  };

  useEffect(() => {
    if (isLogined()) {
      fetchBadgeHistory();
    }
  }, [isLogined]);

  const formatActionName = (actionName) => {
    switch (actionName) {
      case "review":
        return "리뷰";
      case "matchup":
        return "매치업";
      default:
        return actionName;
    }
  };

  const handleHistoryItemClick = () => {
    if (!isLogined()) {
      openLoginModal();
    }
  };

  return (
    <Container>
      <BackButton onClick={handleBackClick} />
      <Title>뱃지 포인트 내역</Title>
      {badgeHistory.length > 0 ? (
        <HistoryTable>
          <TableHeader>
            <tr>
              <th>영화 제목</th>
              <th>획득 출처</th>
              <th>포인트</th>
              <th>날짜</th>
            </tr>
          </TableHeader>
          <tbody>
            {badgeHistory.map((item, index) => (
              <TableRow key={index} onClick={handleHistoryItemClick}>
                <TableData>{item.movieName}</TableData>
                <TableData>{formatActionName(item.actionName)}</TableData>
                <TableData>+{item.point}P</TableData>
                <TableData>
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </HistoryTable>
      ) : (
        <EmptyMessage>뱃지 포인트를 획득한 내역이 없습니다.</EmptyMessage>
      )}
      <LoginModal />
    </Container>
  );
};

export default BadgeHistory;
