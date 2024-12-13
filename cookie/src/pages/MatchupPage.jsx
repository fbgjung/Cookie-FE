import { useState, useEffect } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import TitleSection from "../components/matchup/TitleSection";
import Timer from "../components/matchup/Timer";
import PosterList from "../components/matchup/PosterList";
import ProgressBar from "../components/matchup/ProgressBar";
import ChartSection from "../components/matchup/ChartSection";
import ChatUI from "../components/matchup/ChatUI";
import { useParams, useLocation } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";
import SnowEffect from "../components/common/SnowEffect";
import Spinner from "../components/common/Spinner";
import axiosInstance from "../api/auth/axiosInstance";
import serverBaseUrl from "../config/apiConfig";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    #000000,
    #0a0a0a,
    #141414,
    #1f1f1f,
    #292929
  );
  color: #ffffff;
  padding-top: 10px;
  font-family: "Arial", sans-serif;

  overflow-y: auto;
  overflow-x: hidden;
`;

const MatchupPage = () => {
  const { matchUpId } = useParams();
  const location = useLocation();
  const [matchUpData, setMatchUpData] = useState(null);
  const [isVoteEnded, setIsVoteEnded] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMatchUpData = async () => {
    setIsLoading(true);
    try {
      const endpoint = `/api/matchups/${matchUpId || 1}`;
      const response = await axiosInstance.get(endpoint);
      setMatchUpData(response.data.response || {});
      console.log(response.data.response);
    } catch (error) {
      console.error("API 요청 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (!token) {
      console.error("인증 토큰이 없습니다.");
      return;
    }
    
    const socket = new SockJS(`${serverBaseUrl}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("WebSocket 연결 성공");
        setIsConnected(true);
      },
      onDisconnect: () => {
        console.log("WebSocket 연결 종료");
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error("STOMP 오류:", frame.headers["message"], frame.body);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  useEffect(() => {
    fetchMatchUpData();
  }, [matchUpId, location.pathname]);

  const handleVoteEnd = () => {
    setIsVoteEnded(true);
  };

  if (isLoading || !matchUpData) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      <SnowEffect />
      <ScrollToTop />
      <TitleSection
        matchUpTitle={matchUpData.matchUpTitle}
        endAt={matchUpData.entAt}
      />
      <Timer endAt={matchUpData.entAt} onVoteEnd={handleVoteEnd} />
      <PosterList
        posters={[
          {
            movieId: matchUpData.movie1.movieId,
            src:
              matchUpData.movie1.moviePoster ||
              "/assets/images/main/cookie_icon.svg",
            title: matchUpData.movie1.movieTitle,
          },
          {
            movieId: matchUpData.movie2.movieId,
            src:
              matchUpData.movie2.moviePoster ||
              "/assets/images/main/cookie_icon.svg",
            title: matchUpData.movie2.movieTitle,
          },
        ]}
        matchUpId={matchUpData.matchUpId}
        isVoteEnded={isVoteEnded}
        userVote={matchUpData.userVote}
      />
      <ProgressBar
        movie1Likes={matchUpData.movie1.movieLike}
        movie2Likes={matchUpData.movie2.movieLike}
      />
      <ChartSection movie1={matchUpData.movie1} movie2={matchUpData.movie2} />
      {isConnected && (
        <ChatUI matchUpId={matchUpId} stompClient={stompClient} />
      )}
    </Container>
  );
};

export default MatchupPage;
