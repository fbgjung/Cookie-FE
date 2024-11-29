import { useState } from "react";
import styled from "styled-components";

const SearchedMovie = styled.div`
  margin-top: 16px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  margin: 0 3rem;
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
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: var(--main);
    grid-column: 5 / 6;
    justify-self: end;
    padding: 0 1rem;
  }
  button:hover {
    text-decoration: underline;
  }
`;

function SearchMovieList({ movies, onMovieClick }) {
  const [visibleCount, setVisibleCount] = useState(10);

  const onShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const visibleMovies = movies.slice(0, visibleCount);

  return (
    <SearchedMovie>
      {visibleMovies.length > 0 ? (
        <>
          {visibleMovies.map((movie) => (
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
          ))}
        </>
      ) : (
        <p>영화가 없습니다.</p>
      )}
      {movies.length > visibleCount && (
        <button onClick={onShowMore} className="show-more-button">
          더 보기
        </button>
      )}
    </SearchedMovie>
  );
}

export default SearchMovieList;
