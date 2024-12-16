import { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../api/auth/axiosInstance";
import vote from "../../assets/images/admin/vote.svg";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 30px 20px;
  border-radius: 8px;
  height: 850px;
  width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 20px 40px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  align-items: center;
`;

const Label = styled.div`
  width: 100px;
  font-weight: bold;
  text-align: left;
`;

const Content = styled.div`
  flex-grow: 1;
  text-align: left;
`;

const MoviePosters = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-start;
`;

const MovieItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 160px;
  gap: 15px;

  p {
    text-align: center;
    min-height: 50px;
  }
`;

const MoviePoster = styled.img`
  width: 150px;
  height: auto;
  border-radius: 8px;
  border: none;
`;

const CloseButton = styled.button`
  background-color: var(--sub);
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  width: 58px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const MatchUpDetailModal = ({ matchId, closeModal }) => {
  const [matchUpDetail, setMatchUpDetail] = useState(null);
  if (!matchId) return null;

  useEffect(() => {
    const fetchMatchUpDetail = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/admin/match-up/detail/${matchId}`
        );
        console.log(response.data.response);
        setMatchUpDetail(response.data.response);
      } catch (err) {
        console.error("상세 정보를 가져오는 데 실패했습니다.", err);
      }
    };

    fetchMatchUpDetail();
  }, [matchId]);

  if (!matchUpDetail) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>매치업 상세정보</ModalHeader>
        <ModalBody>
          <InfoRow>
            <Label>타이틀:</Label>
            <Content>{matchUpDetail.matchUpTitle}</Content>
          </InfoRow>

          <InfoRow>
            <Label>매치영화:</Label>
            <MoviePosters>
              {matchUpDetail.movieMatchInfo &&
                matchUpDetail.movieMatchInfo.map((movie, index) => (
                  <MovieItem key={index}>
                    <MoviePoster src={movie.poster} alt={`movie-${index}`} />
                    <p>{movie.movieTitle}</p>
                    <img src={vote} />
                    <p>
                      <strong style={{ color: "var(--text)" }}>
                        {movie.voteCount}
                      </strong>
                      표
                    </p>
                  </MovieItem>
                ))}
            </MoviePosters>
          </InfoRow>

          <InfoRow>
            <Label>매치타입:</Label>
            <Content>{matchUpDetail.matchUpType}</Content>
          </InfoRow>

          <InfoRow>
            <Label>시작일:</Label>
            <Content>{matchUpDetail.startTime}</Content>
          </InfoRow>

          <InfoRow>
            <Label>종료일:</Label>
            <Content>{matchUpDetail.endTime}</Content>
          </InfoRow>

          <InfoRow>
            <Label>등록일:</Label>
            <Content>{matchUpDetail.createdAt}</Content>
          </InfoRow>

          <InfoRow>
            <Label>진행상태:</Label>
            <Content>{matchUpDetail.matchUpStatus}</Content>
          </InfoRow>
        </ModalBody>
        <CloseButton onClick={closeModal}>닫기</CloseButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MatchUpDetailModal;
