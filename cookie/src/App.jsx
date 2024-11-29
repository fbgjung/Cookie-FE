import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppScreen from "./routes/AppScreen";
import AdminLogin from "./pages/AdminLogin";
import GlobalStyle from "./styles/global";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/" element={<AppScreen />} />
          <Route path="*" element={<AppScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
