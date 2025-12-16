import Grid from "../components/Grid/Grid";
import Button from "../components/Button/Button";

function GamePage({ onFinish }) {
  return (
    <div className="page">
      <h2>Find all words</h2>

      <div className="game-container">
        <Grid />
      </div>

      <Button text="Finish game" onClick={onFinish} />
    </div>
  );
}

export default GamePage;
