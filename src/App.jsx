import { useState } from "react";
import StartPage from "./pages/StartPage/StartPage";
import GamePage from "./pages/GamePage/GamePage";
import GameCompleteModal from "./components/GameCompleteModal/GameCompleteModal";

function App() {
  const [currentPage, setCurrentPage] = useState("start");
  const [gameResults, setGameResults] = useState({
    found: 0,
    total: 0
  });
  const [gameSettings, setGameSettings] = useState(null);
  const [showGameComplete, setShowGameComplete] = useState(false);

  const handleGoToStart = () => {
    setCurrentPage("start");
    setGameSettings(null);
    setShowGameComplete(false);
  };

  const handleStartGame = (settings) => {
    console.log("Starting game with settings:", settings); 
    setGameSettings(settings);
    setGameResults({ found: 0, total: 0 });
    setCurrentPage("game");
    setShowGameComplete(false);
  };

  const handleFinishGame = (results) => {
    console.log("Game finished with results:", results); 
    setGameResults(results);
    setShowGameComplete(true);
  };

  const handleRestartGame = () => {
    console.log("Restarting game with same settings"); 
    setShowGameComplete(false);
    setCurrentPage("game");
  };

  let currentComponent;
  
  switch (currentPage) {
    case "start":
      currentComponent = <StartPage onStart={handleStartGame} />;
      break;
    case "game":
      currentComponent = <GamePage 
      onFinish={handleFinishGame} 
      gameSettings={gameSettings}
      onMainMenu={handleGoToStart}  
      />;
      break;
    default:
      currentComponent = <StartPage onStart={handleStartGame} />;
  }

  return (
    <div className="App">
      {currentComponent}
      
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