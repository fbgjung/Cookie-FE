import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  border: none;
  color: white;
  font-size: 18px;
  padding: 8px;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
  opacity: 0.6;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
    opacity: 1;
  }

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }
`;

const ArrowButton = ({ className, onClick, children }) => {
  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  );
};

// PropTypes를 사용하여 props 타입을 정의합니다.
ArrowButton.propTypes = {
  className: PropTypes.string.isRequired, // className은 string 타입이어야 합니다.
  onClick: PropTypes.func.isRequired, // onClick은 함수여야 합니다.
  children: PropTypes.node, // children은 optional이며, React 노드일 수 있습니다.
};

export default ArrowButton;