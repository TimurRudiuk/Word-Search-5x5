import Button from "../components/Button/Button";

function StartPage({ onStart }) {
  return (
    <div className="page">
      <h1>Word Search 5×5</h1>
      <Button text="Start game" onClick={onStart} />
    </div>
  );
}

export default StartPage;
