import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  position: fixed;
  bottom: 90px;
  right: calc(50% - 270px);
  display: ${({ visible }) => (visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background: #04012d;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 1000;
  &::after {
    content: "↑";
    font-size: 18px;
    color: #ffffff;
    font-weight: bold;
  }
  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    background-color: #333;
  }
`;

const TopButton = ({ visible, onClick }) => {
  return <StyledButton visible={visible} onClick={onClick} />;
};

TopButton.propTypes = {
  visible: PropTypes.bool.isRequired, // visible을 boolean으로 정의
  onClick: PropTypes.func.isRequired, // 클릭 이벤트 핸들러 정의
};

export default TopButton;
