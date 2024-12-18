import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 100vw;
  flex: 1;
  background-color: #222222;
  border-radius: 16px 16px 0 0;
  overflow-y: auto;
  overflow-x: hidden;
  touch-action: pan-y;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f4f4f4;
  }
`;

export default ChatContainer;
