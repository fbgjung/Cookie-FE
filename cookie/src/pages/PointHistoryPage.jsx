import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 2rem;
  background-color: white;
  min-height: 100vh;
  color: black;
  position: relative;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 800px;
`;

const BackButton = styled.img`
  position: absolute;
  top: 20px;
  left: 4%;
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

const HistoryItem = styled.li`
  background: white;
  border-radius: 12px;
  padding: 1.5rem 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  border: 2px solid black;

  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
`;

const MovieName = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 0.5rem;
`;

const HistoryDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .action-name {
    font-size: 1rem;
    color: #00d6e8;
  }

  .points {
    font-size: 1rem;
    color: #00ff00;
  }

  .date {
    font-size: 0.9rem;
    color: #999;
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

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const dummyData = [
      {
        movieName: "인셉션",
        actionName: "리뷰 작성",
        point: 50,
        createdAt: "2024-12-10T15:30:00",
      },
      {
        movieName: "인터스텔라",
        actionName: "좋아요 클릭",
        point: 20,
        createdAt: "2024-12-09T12:45:00",
      },
      {
        movieName: "다크 나이트",
        actionName: "리뷰 추천",
        point: 100,
        createdAt: "2024-12-08T18:20:00",
      },
    ];

    const sortedHistory = dummyData.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setBadgeHistory(sortedHistory);
  }, []);

  return (
    <Container>
      <Title>뱃지 포인트 내역</Title>

      <BackButton
        src="/assets/images/mypage/ic_back.svg"
        alt="뒤로가기"
        onClick={handleBackClick}
      />

      {badgeHistory.length > 0 ? (
        <HistoryList>
          {badgeHistory.map((item, index) => (
            <HistoryItem key={index}>
              <MovieName>영화제목 : {item.movieName}</MovieName>
              <HistoryDetails>
                <p className="action-name">액션: {item.actionName}</p>
                <p className="points">포인트: +{item.point}P</p>
                <p className="date">
                  날짜: {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </HistoryDetails>
            </HistoryItem>
          ))}
        </HistoryList>
      ) : (
        <EmptyMessage>뱃지 포인트를 획득한 내역이 없습니다.</EmptyMessage>
      )}
    </Container>
  );
};

export default BadgeHistory;
