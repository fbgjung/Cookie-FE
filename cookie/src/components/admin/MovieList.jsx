import styled from "styled-components";

const AddMovieContainer = styled.div`
  width: 1239px;
  height: 935px;
  border: none;
  padding: 2rem;
  border-radius: 12px;
  background-color: white;
  box-shadow:
    -1px 6px 10px rgba(0, 0, 0, 0.1),
    1px -6px 10px rgba(0, 0, 0, 0.1),
    -3px 4px 8px rgba(0, 0, 0, 0.06),
    3px -4px 8px rgba(0, 0, 0, 0.06);
`;

const MovieList = () => {
  return (
    <AddMovieContainer>
      <h2>Tab 2</h2>
    </AddMovieContainer>
  );
};

export default MovieList;
