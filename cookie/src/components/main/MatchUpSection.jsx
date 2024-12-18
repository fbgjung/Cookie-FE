import { useState, useEffect } from "react";
import styled from "styled-components";
import serverBaseUrl from "../../config/apiConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";

const MatchUpSection = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useUserStore();

  const [matchUps, setMatchUps] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLoading = matchUps.length === 0;

  useEffect(() => {
    const fetchMainPageMovies = async () => {
      try {
        const response = await axios.get(
          `${serverBaseUrl}/api/movies/mainMatchUps`
        );
        const matchUpData = response.data.response.matchUps;

        if (matchUpData && matchUpData.length > 0) {
          setMatchUps(matchUpData);
          setUserInfo({ matchUpId: matchUpData[0].matchUpId });
        }
      } catch (error) {
        console.error("Error fetching matchUp data", error);
      }
    };

    fetchMainPageMovies();
  }, [setUserInfo]);

  const handleMatchUpVotePage = (matchUpId) => {
    setUserInfo({ matchUpId });
    navigate(`/matchup/${matchUpId}`);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <SkeletonOverlay />
      ) : (
        <>
          <Title>이번주 쿠키의 매치업</Title>
          <MatchUpContainer>
            <Overlay>
              <MatchUpInfo>
                <VsImage />
                <VoteButton
                  onClick={() =>
                    handleMatchUpVotePage(matchUps[currentIndex].matchUpId)
                  }
                >
                  {matchUps[currentIndex].matchUpTitle}
                </VoteButton>
                <MatchUpDescription>
                  쿠키에서 여운을 더 즐겨보세요!
                </MatchUpDescription>
                <MatchUpDescription>
                  좋아하는 영화에 투표하고 이야기 나누는 중
                </MatchUpDescription>
              </MatchUpInfo>
            </Overlay>
            <Movie>
              <Image
                src={matchUps[currentIndex].movie1.moviePoster}
                alt={matchUps[currentIndex].movie1.movieTitle}
              />
            </Movie>
            <Movie>
              <Image
                src={matchUps[currentIndex].movie2.moviePoster}
                alt={matchUps[currentIndex].movie2.movieTitle}
              />
            </Movie>
          </MatchUpContainer>
        </>
      )}
    </Wrapper>
  );
};

export default MatchUpSection;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  color: #f84b99;
  padding: 2rem 0 0.4rem 0.375rem;
  display: flex;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const MatchUpContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Movie = styled.div`
  flex: 1;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 480px) {
    height: 300px;
  }
  @media (max-width: 393px) {
    height: 280px;
  }
`;

const VoteButton = styled.button`
  width: 300px;
  height: 42px;
  border-radius: 0.32rem;
  border: none;
  background-color: #f84b99;
  cursor: pointer;
  margin-bottom: 8px;
  transition: transform 0.2s ease-in-out;
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 480px) {
    color: #000000;
    font-weight: 550;
    width: 250px;
    height: 36px;
    font-size: 16px;
  }
  @media (max-width: 393px) {
    color: #000000;
    font-weight: 510;
    width: 230px;
    height: 32px;
    font-size: 15px;
  }

  &:hover {
    transform: scale(1.05);
    background-color: #ff0777;
  }
`;

const MatchUpInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MatchUpDescription = styled.p`
  margin: 0;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.5rem;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }

  @media (max-width: 393px) {
    font-size: 1.1rem;
  }
`;

const VsImage = styled.div`
  background: no-repeat center/cover url("/assets/images/main/christmas-vs.png");
  width: 100px;
  height: 100px;
`;

const SkeletonOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 560px;
  height: 404px;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.07) 25%,
    rgba(255, 255, 255, 0.159) 50%,
    rgba(255, 255, 255, 0.07) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  @media (max-width: 430px) {
    width: 400px;
    height: 404px;
  }
  @media (max-width: 393px) {
    width: 360px;
    height: 404px;
  }
`;
