import React, { useEffect, useState } from "react";
import styled from "styled-components";
import matchUp from "../../assets/images/main/matchup_icon.svg";
import fight from "../../assets/images/main/fight_icon.svg";
import { useNavigate } from "react-router-dom";
import serverBaseUrl from "../../config/apiConfig";
import axiosInstance from "../../api/auth/axiosInstance";

const MatchUpContainer = styled.div`
  position: relative;

  .matchUp__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .matchUp__movie {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--ticket-bg);
    transition: background-color 0.3s ease;
    border: none;
    border-radius: 0.75rem;
    padding: 1rem;
    position: relative;
  }

  .matchUp__overlay {
    position: absolute;
    transition: background-color 0.3s ease;
    width: 100%;
    height: 100%;
    border-radius: 0.75rem;
    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  .matchUp__overlay button {
    width: 14rem;
    background-color: var(--sub);
    color: var(--text);
    border: none;
    font-size: 1.125rem;
    font-weight: 700;
    border-radius: 0.75rem;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    visibility: visible;
    transition: opacity 0.3s ease;
    padding: 1rem;
  }

  .matchUp__overlay:hover button {
    opacity: 1;
    visibility: visible;
  }

  .matchUp__movie--title {
    background-color: var(--sub);
    border-radius: 12px;
    padding: 5px 10px;
  }
  .matchUp__content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
  }

  .matchUp__movie--container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 3rem;
    margin-top: 1rem;
  }

  .matchUp__movie--list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90px;
  }

  .matchUp__movie--list p {
    text-align: center;
  }

  .matchUp__movie--poster {
    border-radius: 0.625rem;
    margin: 0 0 0.625rem 0;
    width: 83px;
    height: 118px;
  }

  .matchUp__movie--icon {
    position: absolute;
    top: 5.2rem;
    left: 5.8rem;
  }
  @media (max-width: 768px) {
    .matchUp__title {
      font-size: 0.8rem;
    }
    .matchUp__movie {
      width: 15rem;
      height: 11.25rem;
      padding: 0.625rem;
    }
    .matchUp__overlay button {
      width: 6.25rem;
      height: 3.125rem;
    }
    .matchUp__movie--title {
      font-size: 0.8rem;
      border-radius: 0.75rem;
      padding: 0.19rem 0.5rem;
      margin-top: 0.3rem;
    }
    .matchUp__content {
      gap: 1rem;
    }
    .matchUp__movie--container {
      margin-top: 0.4rem;
    }
    .matchUp__movie--list {
      width: 3rem;
    }
    .matchUp__movie--list p {
      font-size: 0.8rem;
    }
    .matchUp__movie--poster {
      width: 4.3rem;
      height: 6rem;
    }
    .matchUp__movie--icon {
      position: absolute;
      top: 11vh;
      left: 16vw;
      width: 3rem;
      height: 3rem;
    }
  }
  @media (max-width: 390px) {
    .matchUp__movie--icon {
      top: 4.4rem;
      left: 3.6rem;
      width: 44px;
      height: 44px;
    }
  }
`;

function MatchUp({ matchDate }) {
  const today = new Date();
  matchDate = new Date(matchUp.startAt);
  const leftTime = matchDate - today;
  const leftDay = Math.ceil(leftTime / (1000 * 3600 * 24));
  const navigate = useNavigate();

  const [matchUps, setMatchUps] = useState([]);
  const [access, setAccess] = useState(true);
  useEffect(() => {
    const fetchMainPageMovies = async () => {
      try {
        const response = await axiosInstance.get(
          `${serverBaseUrl}/api/movies/mainMatchUps`
        );
        const matchUpData = response.data.response.matchUps;
        if (matchUpData) {
          setMatchUps(matchUpData);

          const today = new Date();
          const dayOfWeek = today.getDay();

          if (dayOfWeek === 0) {
            setAccess(false);
          } else {
            setAccess(response.data.response.access);
          }
        }
      } catch (error) {
        console.error("API 호출 오류 발생:", error);
      }
    };

    fetchMainPageMovies();
  }, []);

  return (
    <MatchUpContainer>
      <div className="matchUp__title">
        <img src={matchUp} alt="matchUp_icon" />
        <h2> 이번주 영화 매치업! D-{leftDay}</h2>
      </div>
      <div className="matchUp__content">
        {matchUps.map((matchUp) => (
          <div className="matchUp__movie" key={matchUp.matchUpId}>
            <img
              className="matchUp__movie--icon"
              src={fight}
              alt="fight_icon"
            />
            <div className="matchUp__overlay">
              <button
                onClick={() => navigate(`/matchup/${matchUp.matchUpId}`)}
                disabled={!access}
              >
                {access
                  ? "투표하러 가기👀 "
                  : "오늘은 투표일이 아니에요🥲 내일 만나요"}
              </button>
            </div>
            <p className="matchUp__movie--title">{matchUp.matchUpTitle}</p>
            <div className="matchUp__movie--container">
              <div className="matchUp__movie--list">
                <img
                  className="matchUp__movie--poster"
                  // src={matchUp.movie1.moviePoster}
                  src={
                    "https://image.tmdb.org/t/p/w500/4Zb4Z2HjX1t5zr1qYOTdVoisJKp.jpg"
                  }
                  alt={matchUp.movie1.movieTitle}
                />
                <p>{matchUp.movie1.movieTitle}</p>
              </div>
              <div className="matchUp__movie--list">
                <img
                  className="matchUp__movie--poster"
                  // src={matchUp.movie2.moviePoster}
                  src={
                    "https://image.tmdb.org/t/p/w500//1ZNOOMmILNUzVYbzG1j7GYb5bEV.jpg"
                  }
                  alt={matchUp.movie2.movieTitle}
                />
                <p>{matchUp.movie2.movieTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MatchUpContainer>
  );
}

export default MatchUp;
