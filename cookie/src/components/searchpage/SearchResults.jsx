import PropTypes from "prop-types";
import MovieListSection from "./MovieListSection";

const SearchResults = ({
  filteredMovies,
  filteredDirectors,
  filteredActors,
  onMovieClick,
}) => (
  <>
    {filteredMovies.length > 0 && (
      <MovieListSection
        title="영화 제목"
        items={filteredMovies}
        onMovieClick={onMovieClick}
      />
    )}
    {filteredDirectors.length > 0 && (
      <MovieListSection
        title="감독"
        items={filteredDirectors}
        onMovieClick={onMovieClick}
        isDirector
      />
    )}
    {filteredActors.length > 0 && (
      <MovieListSection
        title="배우"
        items={filteredActors}
        onMovieClick={onMovieClick}
        isActor
      />
    )}
  </>
);

SearchResults.propTypes = {
  filteredMovies: PropTypes.array.isRequired,
  filteredDirectors: PropTypes.array.isRequired,
  filteredActors: PropTypes.array.isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default SearchResults;
