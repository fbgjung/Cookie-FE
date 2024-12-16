import React, { useEffect, useState } from "react";
import { DefalutContainer } from "./Likes";
import axiosInstance from "../../api/auth/axiosInstance";
import addMatchup from "../../assets/images/admin/award.svg";
import styled from "styled-components";
import SearchModal from "./SearchModal";

const MatchUpType = styled.div`
  margin-bottom: 20px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
export const AddContainer = styled.div`
  margin: 20px auto;
  background-color: #f9f9f9;
  width: 1150px;
  height: 750px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 30px;
  display: flex;
  flex-direction: column;
`;
const MatchUpForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
`;

const Label = styled.label`
  font-weight: bold;
  flex-basis: 15%;
  text-align: left;
  font-size: 24px;
`;
const Input = styled.input`
  flex-grow: 0.5;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 20px;
  width: 20px;
`;
const Select = styled.select`
  flex-grow: 0.5;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 20px;
  width: 20px;
`;
const MoviePosters = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
  width: 43.6%;

  div {
    width: 160px;
    height: 230px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const CloseButton = styled.button`
  background-color: var(--sub);
  color: #ffff;
  border: 1px solid var(--sub);
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 60px;
  font-size: 20px;
  font-weight: bold;
  margin-left: auto;
`;
const PosterUpload = styled.div`
  border: 1px solid var(--sub-text);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  position: relative;

  .upload__poster {
    object-fit: cover;
    width: 160px;
    height: 230px;
    border-radius: 12px;
  }

  .upload_btn1 {
    border: 1px solid var(--sub-text);
    padding: 5px 20px;
    cursor: pointer;
    background-color: white;
    color: var(--text);
    border-radius: 12px;
    position: absolute;
    right: 12px;

    transform: translateX(-50%);
    z-index: 10;
    &:hover {
      background-color: var(--sub);
      color: var(--text);
    }
  }
  .upload_btn2 {
    border: 1px solid var(--sub-text);
    padding: 5px 20px;
    cursor: pointer;
    background-color: white;
    color: var(--text);
    border-radius: 12px;
    position: absolute;
    right: 12px;
    transform: translateX(-50%);
    z-index: 10;
    &:hover {
      background-color: var(--sub);
      color: var(--text);
    }
  }
`;

const MovieIonfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;
function AddMatchUp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoster1, setSelectedPoster1] = useState(null);
  const [selectedPoster2, setSelectedPoster2] = useState(null);
  const [selectedPosterNumber, setSelectedPosterNumber] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [matchTitle, setMatchTitle] = useState("");
  const [matchType, setMatchType] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  // const [registrationDate, setRegistrationDate] = useState("");
  // const [status, setStatus] = useState("");

  const formatDate = (date) => {
    return date ? date.replace("T", "-") + ":00" : "";
  };

  const createMatchUp = async () => {
    if (!selectedPoster1 || !selectedPoster2) {
      console.error("두 개의 포스터를 모두 선택해야 합니다.");
      return;
    }

    const requestBody = {
      matchTitle,
      matchUpMovies: [
        {
          poster: selectedPoster1.posterPath,
          movieTitle: selectedPoster1.title,
        },
        {
          poster: selectedPoster2.posterPath,
          movieTitle: selectedPoster2.title,
        },
      ],
      matchUpType: matchType,
      startTime: formatDate(startTime),
      endTime: formatDate(endTime),
      // registrationDate: formatDate(registrationDate),
      // status,
    };

    try {
      const response = await axiosInstance.post(
        "/api/admin/match-up",
        requestBody
      );
      console.log("Match-up created successfully:", response.data);
      alert("매치업이 등록되었어요!");

      setMatchTitle("");
      setMatchType("");
      setStartTime("");
      setEndTime("");
      setRegistrationDate("");
      setStatus("");
      setSelectedPoster1(null);
      setSelectedPoster2(null);
      setSearchTerm("");
    } catch (error) {
      console.error("Error creating match-up:", error);
      if (
        error.response &&
        error.response.data === "매치 업 등록은 1개씩만 할 수 있습니다."
      ) {
        alert(error.response.data);
      }
    }
  };

  const handleOpenModal = (posterNumber) => {
    setIsModalOpen(true);
    setSelectedPosterNumber(posterNumber);
  };

  const handleCloseModal = () => {
    setSearchTerm("");
    setIsModalOpen(false);
  };

  const handleSelectMovie = (movie) => {
    if (selectedPosterNumber === 1) {
      setSelectedPoster1(movie);
    } else if (selectedPosterNumber === 2) {
      setSelectedPoster2(movie);
    }
    setIsModalOpen(false);
  };
  return (
    <>
      <DefalutContainer>
        <MatchUpType>
          <img src={addMatchup} />
          <h2>매치업 등록</h2>
        </MatchUpType>
        <AddContainer>
          <MatchUpForm>
            <InfoRow>
              <Label>타이틀:</Label>
              <Input
                type="text"
                placeholder="타이틀을 입력하세요"
                value={matchTitle}
                onChange={(e) => setMatchTitle(e.target.value)}
                required
              />
            </InfoRow>

            <InfoRow>
              <Label>매치영화:</Label>
              <MoviePosters>
                <MovieIonfo>
                  <PosterUpload>
                    <button
                      className="upload_btn1"
                      onClick={() => handleOpenModal(1)}
                    >
                      선택
                    </button>
                    {selectedPoster1 && (
                      <img
                        className="upload__poster"
                        src={selectedPoster1.posterPath}
                        alt={selectedPoster1.title}
                      />
                    )}
                  </PosterUpload>
                  <p>{selectedPoster1 ? selectedPoster1.title : ""}</p>
                </MovieIonfo>
                <MovieIonfo>
                  <PosterUpload>
                    <button
                      className="upload_btn2"
                      onClick={() => handleOpenModal(2)}
                    >
                      선택
                    </button>
                    {selectedPoster2 && (
                      <img
                        className="upload__poster"
                        src={selectedPoster2.posterPath}
                        alt={selectedPoster2.title}
                      />
                    )}
                  </PosterUpload>
                  <p>{selectedPoster2 ? selectedPoster2.title : ""}</p>
                </MovieIonfo>
              </MoviePosters>
            </InfoRow>

            <InfoRow>
              <Label>매치타입:</Label>
              <Select
                value={matchType}
                onChange={(e) => setMatchType(e.target.value)}
                required
              >
                <option value="">선택</option>
                <option value="SHOW">SHOW</option>
                <option value="GENRE">GENRE</option>
              </Select>
            </InfoRow>

            <InfoRow>
              <Label>시작일:</Label>
              <Input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </InfoRow>

            <InfoRow>
              <Label>종료일:</Label>
              <Input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </InfoRow>

            {/* <InfoRow>
              <Label>등록일:</Label>
              <Input
                type="datetime-local"
                value={registrationDate}
                onChange={(e) => setRegistrationDate(e.target.value)}
                required
              />
            </InfoRow>

            <InfoRow>
              <Label>진행상태:</Label>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">선택</option>
                <option value="NOW">NOW</option>
                <option value="PENDING">PENDING</option>
                <option value="EXPIRATION">EXPIRATION</option>
              </Select>
            </InfoRow> */}
          </MatchUpForm>
          <CloseButton onClick={createMatchUp}>등록하기</CloseButton>
        </AddContainer>
      </DefalutContainer>
      <SearchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectMovie={handleSelectMovie}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </>
  );
}

export default AddMatchUp;
