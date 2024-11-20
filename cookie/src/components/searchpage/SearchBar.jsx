import PropTypes from "prop-types";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const SearchBarContainer = styled.div`
  position: relative;
  margin: 20px 0px 50px 0px;
  height: 40px;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 91%;
  height: 100%;
  padding: 10px 20px 10px 30px;
  font-size: 20px;
  border: 1px solid #ddd;
  border-radius: 30px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const SearchIconButton = styled.button`
  position: absolute;
  top: 75%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: #333;
    font-size: 24px;
  }
  &:hover svg {
    color: #555;
  }
`;

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <SearchBarContainer>
      <SearchInput
        placeholder="영화 제목 또는 배우/감독명을 입력하세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SearchIconButton onClick={onSearch}>
        <SearchIcon />
      </SearchIconButton>
    </SearchBarContainer>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
