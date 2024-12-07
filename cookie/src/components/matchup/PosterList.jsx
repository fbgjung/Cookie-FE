import PropTypes from "prop-types";
import styled from "styled-components";
import Poster from "./Poster";
import FightIcon from "/src/assets/images/matchup/ic_bigfight.svg";

const PosterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 1000px;

  @media (max-width: 768px) {
    padding: 20px;
    width: 90%;
  }

  @media (max-width: 480px) {
    padding: 15px;
    width: 85%;
  }
`;

const FightImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
`;

const FightImage = styled.img`
  width: 100px;
  height: 100px;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

const PosterList = ({ posters, isVoteEnded }) => (
  <PosterContainer>
    <Poster
      key={posters[0].movieId}
      src={posters[0].src}
      movieTitle={posters[0].title}
      movieId={posters[0].movieId}
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
  isVoteEnded: PropTypes.bool.isRequired,
};

export default PosterList;
