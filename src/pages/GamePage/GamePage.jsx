import Grid from "../../components/Grid/Grid";
import { useParams } from "react-router-dom";

function GamePage({ onFinish, gameSettings, onMainMenu }) {
  const { userId } = useParams();

  const handleGameComplete = (results) => {
    onFinish(results);
  };

  const gridKey = gameSettings
    ? `${gameSettings.gridSize}-${gameSettings.wordCount}`
    : "default";

  return (
    <div className="page">
      <div className="game-container">

        <Grid
          key={gridKey}
          onComplete={handleGameComplete}
          gameSettings={gameSettings}
          onMainMenu={onMainMenu}
        />
      </div>
    </div>
  );
}

export default GamePage;
