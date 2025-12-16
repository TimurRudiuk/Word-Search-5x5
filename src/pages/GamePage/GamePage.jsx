import Grid from "../../components/Grid/Grid";
import Button from "../../components/Button/Button";

function GamePage({ onFinish }) {
  const handleGameComplete = (results) => {
    onFinish(results);
  };

  const handleManualFinish = () => {
    onFinish({ found: 0, total: 0 });
  };

  return (
    <div className="page">
      
      <div className="game-container">
        <Grid onComplete={handleGameComplete} />
      </div>

    </div>
  );
}

export default GamePage;