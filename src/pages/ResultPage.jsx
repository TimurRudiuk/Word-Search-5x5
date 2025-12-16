import Button from "../components/Button/Button";

function ResultPage({ onRestart }) {
  return (
    <div className="page">
      <h2>Results</h2>
      <Button text="Play again" onClick={onRestart} />
    </div>
  );
}

export default ResultPage;
