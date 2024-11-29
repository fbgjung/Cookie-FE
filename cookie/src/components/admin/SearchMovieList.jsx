import styled from "styled-components";

const SearchedMovie = styled.div`
  margin-top: 16px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  margin: 0 90px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 700px;

  .movie__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 170px;
    min-height: 230px;
    margin-bottom: 16px;
  }

  .movie__info {
    cursor: pointer;
  }

  h3 {
    margin: 10px 0 0 0;
  }
  img {
    border-radius: 10px;
  }
`;

function SearchMovieList({ movies, onMovieClick }) {
  return (
    <SearchedMovie>
      {movies && movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.movieId} className="movie__container">
            <div
              className="movie__info"
              onClick={() => onMovieClick(movie.movieId)}
            >
              <img src={movie.posterPath} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>
                {movie.releaseDate} | {movie.country}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>영화가 없습니다.</p>
      )}
    </SearchedMovie>
  );
}

export default SearchMovieList;
