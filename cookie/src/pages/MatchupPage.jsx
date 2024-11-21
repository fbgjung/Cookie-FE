import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Arial", sans-serif;
`;

const Message = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
`;

const MatchupPage = () => {
  return (
    <Container>
      <Message>매치업입니다만...</Message>
    </Container>
  );
};

export default MatchupPage;
