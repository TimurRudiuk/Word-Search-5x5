import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../Button/Button";
import { closeModal } from "../../store/resultsSlice";

import "./GameCompleteModal.css";

function GameCompleteModal() {
  const dispatch = useDispatch();
  const navigateMain = useSelector(() => null); 

  const { isGameComplete, currentResult } = useSelector((state) => state.results);

  const onMainMenu = () => {
    dispatch(closeModal());
    window.location.href = "/"; 
  };

  const onRestart = () => {
    dispatch(closeModal());
    window.location.href = "/";
  };

  useEffect(() => {
    if (isGameComplete) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isGameComplete]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isGameComplete) onMainMenu();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isGameComplete]);

  if (!isGameComplete || !currentResult) return null;

  const { found, total } = currentResult;

  return createPortal(
    <div className="game-complete-overlay">
      <div className="game-complete-modal">
        <div className="game-complete-header">
          <h2>Level Completed!</h2>
        </div>

        <div className="game-complete-content">
          <div className="success-icon">🎉</div>
          <p className="completion-message">
            Result: {found}/{total}
          </p>
        </div>

        <div className="game-complete-actions">
          <Button text="Play Again" onClick={onRestart} primary size="large" fullWidth />
          <Button text="Main Menu" onClick={onMainMenu} secondary size="large" fullWidth />
        </div>
      </div>
    </div>,
    document.body
  );
}

export default GameCompleteModal;
