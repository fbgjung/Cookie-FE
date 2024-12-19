import React, { useEffect, useState } from "react";
import { DefalutContainer } from "./Likes";
import axiosInstance from "../../api/auth/axiosInstance";
import styled from "styled-components";
import Edit from "../../assets/images/admin/Edit.svg";
import More from "../../assets/images/admin/more2.svg";
import deleteBtn from "../../assets/images/admin/delete_btn.svg";
import { IconContainer } from "./CookieMovieList";
import matchupList from "../../assets/images/admin/award2.svg";
import MatchUpDetailModal from "./MatchUpDetailModal";
import EditMatchUp from "./EditMatchUp";

const MatchUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const MatchUpType = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 0 20px;
  margin-bottom: 10px;

  img {
    width: 30px;
    height: 30px;
  }
`;
export const TableTitle = styled.div`
  width: 1175px;
  height: 32px;
  border: none;
  background-color: #000000;
  color: #ffffff;
  border-radius: 12px;
  margin: 0 1rem;
  padding: 0 1.4rem;
  display: grid;
  grid-template-columns: 0.3fr 3fr 1.8fr 1.8fr 1.6fr 0.7fr;
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
  width: 1175px;
  margin: 0.5rem 1rem 0 1rem;
  padding: 0 1.4rem;
  display: grid;
  grid-template-columns: 0.3fr 3fr 1.8fr 1.8fr 1.6fr 0.7fr;
  grid-template-rows: repeat(10, 1fr);
  gap: 14px;
  grid-row-gap: 20px;
  height: 150px;
  align-items: center;
  justify-items: center;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  .grid-item {
    display: flex;
    align-items: start;
    justify-content: center;
  }
  p {
    color: #333;
    text-align: center;
  }
  div input[type="checkbox"] {
    width: 20px;
    height: 20px;
    -webkit-appearance: none;
    appearance: none;
    border-radius: 4px;
    background-color: #ffff;
    border: 2px solid #333;
    cursor: pointer;
  }

  div input[type="checkbox"]:checked {
    background-color: #333;
  }
`;
const DeleteBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  img {
    transition: transform 0.2s ease;
  }
  &:hover {
    transform: scale(1.1);
  }
`;
const CheckDeleteBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: auto;
  padding: 0 30px;

  &:hover {
    color: var(--sub-text);
  }
`;

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  img {
    transition: transform 0.2s ease;
  }
  &:hover {
    transform: scale(1.1);
  }
`;
const MatchUpTitle = styled.p`
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
`;
const MoviesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 100px;
`;

const MoviePoster = styled.img`
  width: 70px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;

const MovieTitle = styled.p`
  font-size: 12px;
  text-overflow: ellipsis;
  text-align: center;
`;

const MatchUpTime = styled.div`
  text-align: center;
  font-size: 14px;
  color: #333;
`;

const Winner = styled.p`
  text-align: center;
  font-weight: bold;
  color: #333;
`;

function MatchUpList() {
  const [NowMatchUp, setNowMatchUp] = useState({});
  const [PendigMatchUp, setPedingNowMatchUp] = useState({});
  const [EndMatchUp, setEndMatchUp] = useState({});
  // const [showEditModal, setShowEditModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [matchUpId, setMatchUpId] = useState(null);
  const [selectedMatchUps, setSelectedMatchUps] = useState([]); // (일괄삭제) 선택된 매치업 ID 저장
  const [selectedMatchUp, setSelectedMatchUp] = useState(null);

  const fetchMatchUpData = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/match-up");
      const { nowMatchUps, pendingMatchUps, expireMatchUps } =
        response.data.response;

      setNowMatchUp(nowMatchUps[0]);
      setPedingNowMatchUp(pendingMatchUps[0]);
      setEndMatchUp(expireMatchUps);
    } catch (error) {
      console.error("데이터를 가져오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchMatchUpData();
  }, []);

  const deleteMatchUp = async (matchId) => {
    const isConfirmed = window.confirm("선택한 매치업을 삭제할까요?");
    if (!isConfirmed) {
      return;
    }

    try {
      const response = await axiosInstance.delete(
        `/api/admin/match-up/${matchId}`
      );

      alert("해당 매치업이 삭제되었어요.");

      setNowMatchUp((prevState) => ({
        ...prevState,
        nowMatchUps: prevState?.nowMatchUps
          ? prevState.nowMatchUps.filter((item) => item.matchId !== matchId)
          : [],
      }));

      setPedingNowMatchUp((prevState) => ({
        ...prevState,
        pendingMatchUps: prevState?.pendingMatchUps
          ? prevState.pendingMatchUps.filter((item) => item.matchId !== matchId)
          : [],
      }));

      setEndMatchUp((prevState) => ({
        ...prevState,
        endMatchUps: prevState?.endMatchUps
          ? prevState.endMatchUps.filter((item) => item.matchId !== matchId)
          : [],
      }));

      await fetchMatchUpData();
    } catch (error) {
      console.error("Error deleting match-up:", error);
      alert("매치업 삭제에 실패했습니다.");
    }
  };

  const deleteSelectedMatchUps = async () => {
    if (selectedMatchUps.length === 0) {
      alert("삭제할 매치업을 선택해주세요.");
      return;
    }

    const isConfirmed = window.confirm(
      `선택한 ${selectedMatchUps.length}개의 매치업을 삭제할까요?`
    );
    if (!isConfirmed) {
      return;
    }

    try {
      await Promise.all(
        selectedMatchUps.map((matchId) =>
          axiosInstance.delete(`/api/admin/match-up/${matchId}`)
        )
      );
      alert("선택된 매치업이 모두 삭제되었어요.");

      setEndMatchUp((prevState) =>
        prevState.filter((item) => !selectedMatchUps.includes(item.matchId))
      );
      setSelectedMatchUps([]);
    } catch (error) {
      console.error("Error deleting selected match-ups:", error);
      alert("매치업 삭제에 실패했습니다.");
    }
  };

  const handleCheckboxChange = (matchId) => {
    setSelectedMatchUps((prevSelected) =>
      prevSelected.includes(matchId)
        ? prevSelected.filter((id) => id !== matchId)
        : [...prevSelected, matchId]
    );
  };

  const handleEditClick = (matchUpData) => {
    setSelectedMatchUp((prevState) =>
      prevState && prevState.matchId === matchUpData.matchId
        ? null
        : matchUpData
    );
  };

  const closeModal = () => {
    setShowMoreModal(false);
    setMatchUpId(null);
    setSelectedMatchUp(null);
  };

  const openMoreModal = (matchId) => {
    setMatchUpId(matchId);
    setShowMoreModal(true);
  };

  const Icon = [
    { src: Edit, type: "edit" },
    { src: More, type: "more" },
  ];
  const renderMovies = (movieMatchInfo) => {
    if (Array.isArray(movieMatchInfo)) {
      return movieMatchInfo.map((movie, index) => (
        <MovieInfo key={index}>
          <MoviePoster src={movie.poster} alt={movie.movieTitle} />
          <MovieTitle>{movie.movieTitle}</MovieTitle>
        </MovieInfo>
      ));
    } else {
      return <p>영화 정보가 없습니다.</p>;
    }
  };
  useEffect(() => {}, [selectedMatchUp]);

  const MatchUpSection = ({ matchUpData, title }) => (
    <>
      <MatchUpType>
        <img src={matchupList} />
        <h2>{title}</h2>
      </MatchUpType>
      <TableTitle>
        <p>삭제</p>
        <p>타이틀</p>
        <p>매치업영화</p>
        <p>진행기간</p>
        <p>결과</p>
        <p>관리</p>
      </TableTitle>
      <MatchUpListContainer>
        {matchUpData && (
          <DeleteBtn onClick={() => deleteMatchUp(matchUpData.matchId)}>
            <img src={deleteBtn} alt="delete" />
          </DeleteBtn>
        )}
        {matchUpData ? (
          <>
            <MatchUpTitle>{matchUpData.matchUpTitle}</MatchUpTitle>
            <MoviesContainer>
              {renderMovies(matchUpData.movieMatchInfo)}
            </MoviesContainer>
            <MatchUpTime>
              {matchUpData.startTime}
              <p>~</p> {matchUpData.endTime}
            </MatchUpTime>
            <Winner>{matchUpData.winner}</Winner>
            <IconContainer>
              {Icon.map((icon, index) => (
                <IconButton
                  key={index}
                  onClick={() =>
                    icon.type === "edit"
                      ? handleEditClick(matchUpData)
                      : openMoreModal(matchUpData.matchId)
                  }
                >
                  <img src={icon.src} alt={`icon-${index}`} />
                </IconButton>
              ))}
            </IconContainer>
          </>
        ) : (
          <p style={{ width: "200px" }}>{title}이 없습니다.</p>
        )}
      </MatchUpListContainer>
      {showMoreModal && (
        <MatchUpDetailModal matchId={matchUpId} closeModal={closeModal} />
      )}
    </>
  );

  return (
    <>
      <DefalutContainer>
        <MatchUpContainer>
          <MatchUpSection matchUpData={NowMatchUp} title="진행중 Match UP" />
          <MatchUpSection matchUpData={PendigMatchUp} title="대기중 Match UP" />
          <MatchUpType>
            <img src={matchupList} />
            <h2>종료된 MatchUp</h2>
          </MatchUpType>
          <CheckDeleteBtn onClick={deleteSelectedMatchUps}>
            선택삭제
          </CheckDeleteBtn>
          <TableTitle>
            <p>삭제</p>
            <p>타이틀</p>
            <p>매치업영화</p>
            <p>진행기간</p>
            <p>결과</p>
            <p>관리</p>
          </TableTitle>

          <MatchUpListContainer style={{ overflowY: "auto" }}>
            {EndMatchUp && EndMatchUp.length > 0 ? (
              EndMatchUp.map((matchUp, index) => (
                <React.Fragment key={matchUp.matchId || index}>
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedMatchUps.includes(matchUp.matchId)}
                      onChange={() => handleCheckboxChange(matchUp.matchId)}
                    />
                  </div>
                  <MatchUpTitle>{matchUp.matchUpTitle}</MatchUpTitle>
                  <MoviesContainer>
                    {renderMovies(matchUp.movieMatchInfo)}
                  </MoviesContainer>
                  <MatchUpTime>
                    {matchUp.startTime} <p>~</p> {matchUp.endTime}
                  </MatchUpTime>
                  <Winner>{matchUp.winner}</Winner>
                  <IconContainer>
                    <IconButton onClick={() => openMoreModal(matchUp.matchId)}>
                      <img src={More} />
                    </IconButton>
                  </IconContainer>
                </React.Fragment>
              ))
            ) : (
              <p style={{ width: "200px" }}>종료된 매치업이 없습니다.</p>
            )}
          </MatchUpListContainer>
        </MatchUpContainer>
        {showMoreModal && (
          <MatchUpDetailModal matchId={matchUpId} closeModal={closeModal} />
        )}
      </DefalutContainer>
      {selectedMatchUp && (
        <EditMatchUp
          matchUpData={selectedMatchUp}
          closeModal={closeModal}
          fetchMatchUpData={fetchMatchUpData}
        />
      )}
    </>
  );
}

export default MatchUpList;
