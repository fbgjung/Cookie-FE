import styled, { keyframes } from "styled-components";

const fall = keyframes`
  0% {
    top: -10%;
    opacity: 0.2;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    top: 110%;
    opacity: 0;
  }
`;

const sway = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(20px); }
  100% { transform: translateX(-20px); }
`;

const SnowWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
`;

const SnowDiv = styled.div`
  position: absolute;
  top: -5%;
  font-size: ${(props) => props.size}rem;
  color: #ffffff;
  opacity: ${(props) => props.opacity};
  animation:
    ${fall} ${(props) => props.fallDuration}s cubic-bezier(0.4, 0, 0.2, 1)
      infinite,
    ${sway} ${(props) => props.swayDuration}s ease-in-out infinite;

  ${({ index }) => `
    left: ${Math.random() * 100}%;
    animation-delay: ${Math.random() * 10}s;
  `}
`;

const SnowEffect = () => {
  return (
    <SnowWrap>
      {Array.from({ length: 60 }).map((_, i) => (
        <SnowDiv
          key={i}
          index={i}
          size={(Math.random() * 0.7 + 0.5).toFixed(2)}
          opacity={(Math.random() * 0.5 + 0.3).toFixed(2)}
          fallDuration={(Math.random() * 10 + 12).toFixed(2)}
          swayDuration={(Math.random() * 8 + 6).toFixed(2)}
        >
          ❅
        </SnowDiv>
      ))}
    </SnowWrap>
  );
};

export default SnowEffect;
