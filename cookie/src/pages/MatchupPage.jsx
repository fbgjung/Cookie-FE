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
import axios from "axios";
import axiosInstance from "../api/auth/axiosInstance";

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

const sampleData = {
  matchUpTitle: "크리스마스 빅매치",
  startAt: "2024-11-21T17:21:03",
  entAt: "2024-12-11T02:48:05",
  movie1: {
    movieTitle: "나 홀로 집에",
    moviePoster: null,
    movieLike: 12,
    charmPoint: {
      ost: 20,
      direction: 18,
      story: 15,
      dialogue: 25,
      visual: 30,
      acting: 35,
      specialEffect: 15,
    },
    emotionPoint: {
      touching: 25,
      angry: 5,
      joy: 35,
      immersion: 30,
      excited: 20,
      empathy: 15,
      tension: 10,
    },
  },
  movie2: {
    movieTitle: "뭐 있더라",
    moviePoster: null,
    movieLike: 22,
    charmPoint: {
      ost: 15,
      direction: 25,
      story: 20,
      dialogue: 18,
      visual: 28,
      acting: 20,
      specialEffect: 25,
    },
    emotionPoint: {
      touching: 20,
      angry: 10,
      joy: 30,
      immersion: 25,
      excited: 15,
      empathy: 10,
      tension: 15,
    },
  },
};

const MatchupPage = () => {
  const { matchUpId } = useParams();
  const location = useLocation();
  const [matchUpData, setMatchUpData] = useState(null);
  const [isVoteEnded, setIsVoteEnded] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  const fetchMatchUpData = async () => {
    try {
      const endpoint = `/api/matchups/${matchUpId || 1}`;
      const response = await axiosInstance.get(endpoint);
      setMatchUpData(response.data.response || sampleData);
      console.log(response.data.response);
    } catch (error) {
      console.error("API 요청 실패:", error);
      setMatchUpData(sampleData);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (!token) {
      console.error("인증 토큰이 없습니다.");
      return;
    }

    const socket = new SockJS("https://cookiekie.com/ws");
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

  if (!matchUpData) {
    return <Container>로딩 중...</Container>;
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
              "/src/assets/images/matchup/testposter.png",
            title: matchUpData.movie1.movieTitle,
          },
          {
            movieId: matchUpData.movie2.movieId,
            src:
              matchUpData.movie2.moviePoster ||
              "/src/assets/images/matchup/testposter1.png",
            title: matchUpData.movie2.movieTitle,
          },
        ]}
        matchUpId={matchUpData.matchUpId}
        isVoteEnded={isVoteEnded}
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
