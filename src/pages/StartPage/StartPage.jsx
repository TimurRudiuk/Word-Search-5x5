import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import GameSettings from "../../components/GameSettings/GameSettings";
import "./StartPage.css";

function StartPage({ onStart }) {
  const [showSettings, setShowSettings] = useState(false);
  const [gameSettings, setGameSettings] = useState({
    gridSize: 5,
    wordCount: 6
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("wordSearchSettings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setGameSettings(parsedSettings);
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }
  }, []);

  const handleStartGame = () => {
    localStorage.setItem("wordSearchSettings", JSON.stringify(gameSettings));
    onStart(gameSettings);
  };

  const handleSaveSettings = (newSettings) => {
    setGameSettings(newSettings);
    localStorage.setItem("wordSearchSettings", JSON.stringify(newSettings));
  };

  const handleResetToDefault = () => {
    const defaultSettings = {
      gridSize: 5,
      wordCount: 6
    };
    setGameSettings(defaultSettings);
    localStorage.removeItem("wordSearchSettings");
  };

  return (
    <div className="start-page">
      <div className="start-container">
        <h1>Word Search Game</h1>
        
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

        <div className="current-settings">
          <h3>Current Settings</h3>
          <div className="settings-summary">
            <div className="setting-item">
              <span className="setting-label">Grid Size:</span>
              <span className="setting-value">{gameSettings.gridSize}×{gameSettings.gridSize}</span>
            </div>
            <div className="setting-item">
              <span className="setting-label">Words to Find:</span>
              <span className="setting-value">{gameSettings.wordCount}</span>
            </div>
          </div>
        </div>

        <div className="start-button-container">
          <Button 
            text="Start Game" 
            onClick={handleStartGame} 
            primary 
            size="large"
          />
          <div className="settings-buttons">
            <Button 
              text="Change Settings" 
              onClick={() => setShowSettings(true)} 
              secondary
              size="medium"
            />
          </div>
        </div>
      </div>

      <GameSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveSettings}
        initialSettings={gameSettings}
      />
    </div>
  );
}

export default StartPage;