import { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "../Button/Button";
import "./GameCompleteModal.css";

function GameCompleteModal({ isOpen, onRestart, onMainMenu, results }) {
  const { found, total } = results;
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onMainMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onMainMenu]);

  if (!isOpen) return null;

  return createPortal(
    <div className="game-complete-overlay">
      <div className="game-complete-modal">
        <div className="game-complete-header">
          <h2>Level Completed!</h2>
        </div>
        
        <div className="game-complete-content">
          <div className="success-icon">🎉</div>
          <p className="completion-message">
            Congratulations! You found all the words.
          </p>
        </div>

        <div className="game-complete-actions">
          <Button 
            text="Play Again" 
            onClick={onRestart} 
            primary 
            size="large"
            fullWidth
          />
          <Button 
            text="Main Menu" 
            onClick={onMainMenu} 
            secondary
            size="large"
            fullWidth
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

export default GameCompleteModal;