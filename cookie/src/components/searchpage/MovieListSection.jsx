import PropTypes from "prop-types";
import styled from "styled-components";

const SectionTitle = styled.h3`
  margin: 20px 0 10px 0;
  font-size: 18px;
  color: #333;
  font-weight: bold;
`;

const MovieList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MovieItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  cursor: pointer;
  img {
    width: 80px;
    height: 120px;
    margin-right: 15px;
    object-fit: cover;
    border-radius: 5px;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 16px;
    color: #333;
    line-height: 1.6;
    h4 {
      font-size: 20px;
      font-weight: bold;
      margin: 0 0 5px 0;
      color: #04012d;
    }
    p {
      margin: 0;
      font-size: 14px;
      color: #555;
    }
  }
`;

const MovieListSection = ({
  title,
  items,
  onMovieClick,
  isDirector,
  isActor,
}) => (
  <>
    <SectionTitle>{title}</SectionTitle>
    <MovieList>
      {items.map((item) => (
        <MovieItem key={item.id} onClick={() => onMovieClick(item.id)}>
          <img src={item.imageUrl} alt={item.title} />
          <div>
            <h4>{item.title}</h4>
            {isDirector && <p>{`감독: ${item.director}`}</p>}
            {isActor && <p>{`배우: ${item.actors.join(", ")}`}</p>}
            {!isDirector && !isActor && <p>{`${item.year} · ${item.genre}`}</p>}
            <p>{item.duration}</p>
          </div>
        </MovieItem>
      ))}
    </MovieList>
  </>
);

MovieListSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onMovieClick: PropTypes.func.isRequired,
  isDirector: PropTypes.bool,
  isActor: PropTypes.bool,
};

MovieListSection.defaultProps = {
  isDirector: false,
  isActor: false,
};

export default MovieListSection;
