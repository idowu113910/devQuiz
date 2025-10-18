import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import StartMenu from "./pages/StartMenu";
import Question from "./pages/Question";
import Score from "./pages/Score";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartMenu />} />
          <Route path="/question" element={<Question />} />
          <Route path="/score" element={<Score />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
