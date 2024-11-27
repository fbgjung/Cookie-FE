import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  background-color: #ffffff;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  overflow-y: auto;

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
