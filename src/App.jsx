import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import StartPage from "./pages/StartPage/StartPage";
import GamePage from "./pages/GamePage/GamePage";
import GameCompleteModal from "./components/GameCompleteModal/GameCompleteModal";

function App() {
  const navigate = useNavigate();

  const [gameResults, setGameResults] = useState({
    found: 0,
    total: 0
  });
  const [gameSettings, setGameSettings] = useState(null);
  const [showGameComplete, setShowGameComplete] = useState(false);

  const handleGoToStart = () => {
    setGameSettings(null);
    setShowGameComplete(false);
    navigate("/");
  };

  const handleStartGame = (settings) => {
    setGameSettings(settings);
    setGameResults({ found: 0, total: 0 });
    setShowGameComplete(false);

    const userId = Date.now();
    navigate(`/game/${userId}`);
  };

  const handleFinishGame = (results) => {
    setGameResults(results);
    setShowGameComplete(true);
  };

  const handleRestartGame = () => {
    setShowGameComplete(false);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<StartPage onStart={handleStartGame} />}
        />

        <Route
          path="/game/:userId"
          element={
            <GamePage
              onFinish={handleFinishGame}
              gameSettings={gameSettings}
              onMainMenu={handleGoToStart}
            />
          }
        />
      </Routes>

      <GameCompleteModal
        isOpen={showGameComplete}
        onRestart={handleRestartGame}
        onMainMenu={handleGoToStart}
        results={gameResults}
      />
    </div>
  );
}

export default App;
