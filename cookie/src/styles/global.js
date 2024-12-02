import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('../assets/fonts/Pretendard-Regular.otf') format('truetype'); /* Regular */
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('./font/Pretendard-Bold.otf') format('truetype'); /* Bold */
    font-weight: 700;
    font-style: normal;
  }

 h1, h2, h3, h4, h5, p, button {
    font-family: 'Pretendard', sans-serif;
  }

  .bold {
    font-family: 'Pretendard', sans-serif; 
    font-weight: 700;
  }
  .regular {
    font-family: 'Pretendard'; 
    font-weight: 400;
  }

  :root {
    --main: #04012D;
    --sub: #1EE5B0;
    --ticket-bg: #F9F9F9;
    --sub-btn: rgba(132, 130, 164, 0.12);
    --match-up: #C4FFEF;
    --cookie: #CC9D52;
    --notice: #FF7383;
    /* color: var(--cookie) */
  }


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
   html, body {
  margin: 0;
  padding: 0;
}


  #root {
    display: flex;
    justify-content: center; 
    
  }
`;

export const Content = styled.div`
  min-height: 100vh;
  padding: 60px 20px 0 20px;
`;

export default GlobalStyle;
