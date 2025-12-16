import Button from "../../components/Button/Button";

function ResultPage({ foundWords, totalWords, onRestart }) {
  const percentage = totalWords > 0 ? Math.round((foundWords / totalWords) * 100) : 0;
  
  let message = "";

  return (
    <div className="page">
      <h2>Game results</h2>
      
      <div className="result-card">
        <p>Level completed</p>
      </div>

      <div className="action-buttons">
        <Button 
          text="Play Again" 
          onClick={onRestart} 
          primary 
          size="large"
        />
        <Button 
          text="Main Menu" 
          onClick={() => window.location.reload()} 
          danger
          size="large"
        />
      </div>
    </div>
  );
}

export default ResultPage;