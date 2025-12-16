import { useState } from "react";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage/GamePage";
import ResultPage from "./pages/ResulstPage/ResultPage";

function App() {
  const [currentPage, setCurrentPage] = useState("start");
  const [gameResults, setGameResults] = useState({
    found: 0,
    total: 0
  });

  const handleGoToStart = () => {
    setCurrentPage("start");
  };

  const handleStartGame = () => {
    setGameResults({ found: 0, total: 0 });
    setCurrentPage("game");
  };

  const handleFinishGame = (results) => {
    setGameResults(results);
    setCurrentPage("result");
  };

  const handleRestartGame = () => {
    setGameResults({ found: 0, total: 0 });
    setCurrentPage("game");
  };

  let currentComponent;
  
  switch (currentPage) {
    case "start":
      currentComponent = <StartPage onStart={handleStartGame} />;
      break;
    case "game":
      currentComponent = <GamePage onFinish={handleFinishGame} />;
      break;
    case "result":
      currentComponent = (
        <ResultPage 
          foundWords={gameResults.found} 
          totalWords={gameResults.total} 
          onRestart={handleRestartGame}
          onGoToStart={handleGoToStart}
        />
      );
      break;
    default:
      currentComponent = <StartPage onStart={handleStartGame} />;
  }

  return (
    <div className="App">
      {currentComponent}
    </div>
  );
}

export default App;