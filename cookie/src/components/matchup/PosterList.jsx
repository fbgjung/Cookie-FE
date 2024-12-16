import { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Poster from "./Poster";
import FightIcon from "/assets/images/matchup/versus.png";

const PosterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  background-color: black;
  margin-bottom: -30px;
  padding: 30px;
  gap: 20px;
  justify-content: space-around;

  border-radius: 10px;
  width: 100%;
  max-width: none;
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 15px;
  }

  @media (max-width: 480px) {
    padding: 15px;
    gap: 10px;
  }
`;

const FightImageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const FightImage = styled.img`
  width: 150px;
  height: 150px;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

const PosterList = ({ posters, matchUpId, isVoteEnded, userVote }) => {
  const location = useLocation();
  const isHistoryPage = location.pathname.includes("/history");

  useEffect(() => {
    console.log("포스터 데이터:", posters);
    console.log("첫 번째 영화 데이터:", posters[0]);
    console.log("두 번째 영화 데이터:", posters[1]);
  }, [posters]);

  return (
    <PosterContainer>
      <Poster
        key={posters[0].movieId}
        src={posters[0].src}
        movieTitle={posters[0].title}
        matchUpId={matchUpId}
        isVoteEnded={isVoteEnded}
        userVote={userVote}
        movieId={posters[0].movieId}
        isGray={isHistoryPage && !posters[0].win}
      />
      <FightImageWrapper>
        <FightImage src={FightIcon} alt="빅매치 아이콘" />
      </FightImageWrapper>
      <Poster
        key={posters[1].movieId}
        src={posters[1].src}
        movieTitle={posters[1].title}
        matchUpId={matchUpId}
        movieId={posters[1].movieId}
        isVoteEnded={isVoteEnded}
        userVote={userVote}
        isGray={isHistoryPage && !posters[1].win}
      />
    </PosterContainer>
  );
};

PosterList.propTypes = {
  posters: PropTypes.arrayOf(
    PropTypes.shape({
      movieId: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      win: PropTypes.bool.isRequired,
    })
  ).isRequired,
  matchUpId: PropTypes.number.isRequired,
  isVoteEnded: PropTypes.bool.isRequired,
  userVote: PropTypes.bool.isRequired,
};

export default PosterList;
