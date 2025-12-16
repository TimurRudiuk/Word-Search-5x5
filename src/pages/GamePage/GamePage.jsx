import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Grid from "../../components/Grid/Grid";
import { addResult } from "../../store/resultsSlice";

function GamePage({ onMainMenu }) {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const gameSettings = useSelector((state) => state.settings);

  const handleGameComplete = (results) => {
    dispatch(
      addResult({
        ...results,
        userId: Number(userId),
        gridSize: gameSettings.gridSize,
        wordCount: gameSettings.wordCount,
        createdAt: new Date().toISOString()
      })
    );
  };

  const gridKey = `${gameSettings.gridSize}-${gameSettings.wordCount}`;

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
