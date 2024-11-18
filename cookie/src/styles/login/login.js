import styled from "styled-components";

export const LoginContainer = styled.div`
  background-color: var(--main);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: white;
    line-height: 3px;
  }

  .login__img {
    margin: 1rem 0;
  }
`;

export const LoginBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;

  img {
    margin: 0.5rem 0;
    cursor: pointer;
  }
`;
