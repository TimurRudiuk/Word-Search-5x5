import Button from "../components/Button/Button";
import "./StartPage.css";

function StartPage({ onStart }) {
  return (
    <div className="start-page">
      <div className="start-container">
        <h1> Word Search Game </h1>
        
        <div className="game-description">
          <h2>How to play?</h2>
          <ol className="instructions">
            <li>Find all the words hidden in the grid</li>
            <li>Words can be placed horizontally, vertically or diagonally</li>
            <li>Click on the letters in sequence to highlight the word</li>
            <li>Words can be found in both directions (forward and backward)</li>
            <li>When you find all the words - the game will end automatically</li>
          </ol>
        </div>
        <div className="start-button-container">
          <Button 
            text="Start Game" 
            onClick={onStart} 
            primary 
            size="large"
          />
        </div>
      </div>
    </div>
  );
}

export default StartPage;