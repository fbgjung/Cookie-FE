import PropTypes from "prop-types";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const SearchBarContainer = styled.div`
  position: relative;
  margin: 10px 0px 30px 0px;
  height: 40px;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    margin: 15px 0px 40px 0px;
    height: 42px;
  }

  @media (max-width: 480px) {
    margin: 10px 0px 30px 0px;
    height: 38px;
  }
`;

const SearchInput = styled.input`
  width: 87%;
  height: 100%;
  padding: 10px 50px 10px 20px; // 오른쪽 패딩을 늘려서 아이콘 공간 확보
  font-size: 18px;
  border: 1px solid #ddd;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #666;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 8px 45px 8px 16px;
    border-radius: 21px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 40px 8px 14px;
    border-radius: 19px;
  }
`;

const SearchIconButton = styled.button`
  position: absolute;
  top: 75%;
  right: 3%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  svg {
    color: #555;
    width: 24px;
    height: 24px;
    transition: all 0.2s ease-in-out;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    right: 8px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    right: 6px;

    svg {
      width: 18px;
      height: 18px;
    }
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
      <SearchIconButton onClick={onSearch} type="button" aria-label="검색">
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
