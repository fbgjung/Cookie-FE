import styled from "styled-components";
import AppPages from "./AppPages";
import { BrowserRouter } from "react-router-dom";

const ViewArea = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  height: 100vh;
  position: relative;
  background-color: #f9f9f9;
`;

const AppScreen = () => {
  return (
    <ViewArea>
      <div className="flex flex-col h-screen border-x border-divider text-text">
        <BrowserRouter>
          <AppPages />
        </BrowserRouter>
      </div>
    </ViewArea>
  );
};

export default AppScreen;
