import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import StartMenu from "./pages/StartMenu";
import Question from "./pages/Question";
import Score from "./pages/Score";
import { ThemeProvider } from "./theme/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartMenu />} />
            <Route path="/question" element={<Question />} />
            <Route path="/score" element={<Score />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
