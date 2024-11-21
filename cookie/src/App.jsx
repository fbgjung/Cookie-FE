import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppScreen from "./routes/AppScreen";

function App() {
  return (
    <BrowserRouter>
      <AppScreen />
    </BrowserRouter>
  );
}

export default App;
