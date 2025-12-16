import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import "./GameSettings.css";

const MAX_WORDS_BY_GRID_SIZE = {
  4: 5,  
  5: 7,   
  6: 9, 
  7: 12,
  8: 15 
};

function GameSettings({ isOpen, onClose, onSave, initialSettings }) {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: initialSettings
  });

  const gridSize = watch("gridSize");
  const wordCount = watch("wordCount");

  useEffect(() => {
    if (isOpen) {
      reset(initialSettings);
    }
  }, [isOpen, initialSettings, reset]);

  const onSubmit = (data) => {
    const settings = {
      gridSize: Number(data.gridSize),
      wordCount: Number(data.wordCount)
    };
    onSave(settings);
    onClose();
  };

  const handleResetToDefault = () => {
    const defaultSettings = {
      gridSize: 5,
      wordCount: 6
    };
    reset(defaultSettings);
  };

  const getMaxWords = () => {
    return MAX_WORDS_BY_GRID_SIZE[gridSize] || 15;
  };

  const getMinWords = () => {
    return 3;
  };

  const getWordCountOptions = () => {
    const maxWords = getMaxWords();
    const minWords = getMinWords();
    const options = [];
    
    for (let i = minWords; i <= maxWords; i++) {
      options.push(
        <option key={i} value={i}>
          {i} {i === 1 ? 'word' : 'words'}
        </option>
      );
    }
    
    return options;
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="settings-modal-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Game Settings</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form className="settings-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="gridSize">Grid Size</label>
            <select 
              id="gridSize"
              {...register("gridSize", { 
                required: "Grid size is required",
                valueAsNumber: true
              })}
            >
              <option value="4">4×4 (Small)</option>
              <option value="5">5×5 (Medium)</option>
              <option value="6">6×6 (Large)</option>
              <option value="7">7×7 (Extra Large)</option>
              <option value="8">8×8 (Challenge)</option>
            </select>
            {errors.gridSize && <span className="error">{errors.gridSize.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="wordCount">
              Number of Words (max {getMaxWords()})
            </label>
            <select 
              id="wordCount"
              {...register("wordCount", { 
                required: "Number of words is required",
                valueAsNumber: true,
                min: {
                  value: getMinWords(),
                  message: `Minimum ${getMinWords()} words`
                },
                max: {
                  value: getMaxWords(),
                  message: `Maximum ${getMaxWords()} words for ${gridSize}×${gridSize} grid`
                }
              })}
            >
              {getWordCountOptions()}
            </select>
            {errors.wordCount && <span className="error">{errors.wordCount.message}</span>}
            <div className="form-hint">
              <p>!!The word count is not always as specified in the settings!!</p>
            </div>
          </div>

          <div className="form-actions">
            <div className="form-actions-left">
              <Button 
                text="Reset to Default" 
                onClick={handleResetToDefault} 
                warning
                type="button"
              />
            </div>
            <div className="form-actions-right">
              <Button 
                text="Cancel" 
                onClick={onClose} 
                secondary
                type="button"
              />
              <Button 
                text="Save Settings" 
                type="submit"
                primary
              />
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default GameSettings;