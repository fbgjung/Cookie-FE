import PropTypes from "prop-types";
import styled from "styled-components";
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

const PosterList = ({ posters, matchUpId, isVoteEnded }) => (
  <PosterContainer>
    <Poster
      key={posters[0].movieId}
      src={posters[0].src}
      movieTitle={posters[0].title}
      movieId={posters[0].movieId}
      matchUpId={matchUpId}
      isVoteEnded={isVoteEnded}
    />
    <FightImageWrapper>
      <FightImage src={FightIcon} alt="빅매치 아이콘" />
    </FightImageWrapper>
    <Poster
      key={posters[1].movieId}
      src={posters[1].src}
      movieTitle={posters[1].title}
      movieId={posters[1].movieId}
      matchUpId={matchUpId}
      isVoteEnded={isVoteEnded}
    />
  </PosterContainer>
);

PosterList.propTypes = {
  posters: PropTypes.arrayOf(
    PropTypes.shape({
      movieId: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  matchUpId: PropTypes.number.isRequired,
  isVoteEnded: PropTypes.bool.isRequired,
};

export default PosterList;
