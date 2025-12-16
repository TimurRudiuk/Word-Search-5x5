import { useWordSearch } from "../../hooks/useWordSearch";
import Cell from "../Cell/Cell";
import Button from "../Button/Button";
import "./Grid.css";

function Grid({ onComplete, gameSettings, onMainMenu }) {
  console.log("Grid - gameSettings:", gameSettings);
  
  const {
    initialGrid,
    placedWords,
    selectedCells, 
    foundCells,    
    isCellLastSelected,
    getCellOrder,
    foundWords,
    foundWordsCount,
    totalWords,
    handleClick,
    handleReset,
    handleClear,
    selectedSequence,
    gridSize
  } = useWordSearch(onComplete, gameSettings);

  console.log("Grid - initialGrid:", initialGrid);
  console.log("Grid - initialGrid length:", initialGrid?.length);
  console.log("Grid - gridSize:", gridSize);
  console.log("selectedCells is function?", typeof selectedCells === 'function');

  if (!initialGrid || initialGrid.length === 0) {
    return (
      <div className="grid-container">
        <h2>Loading grid...</h2>
        <p>Grid size: {gridSize}</p>
      </div>
    );
  }

  return (
    <div className="grid-container">
      <h2>Word Search Game</h2>
      <div className="game-grid" style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '8px',
        margin: '30px auto',
        maxWidth: `${gridSize * 63}px`
      }}>
        {initialGrid.map((row, rowIndex) =>
          row.map((letter, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              letter={letter}
              selected={selectedCells(rowIndex, colIndex)} 
              lastSelected={isCellLastSelected(rowIndex, colIndex)}
              found={foundCells[rowIndex][colIndex]}
              order={getCellOrder(rowIndex, colIndex)}
              onClick={() => handleClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>

      <div className="game-controls">
        <div className="selected-sequence">
          <strong>Selected letters: </strong>
          {selectedSequence.length > 0 ? (
            selectedSequence.map(([row, col], index) => (
              <span key={index} className="sequence-letter">
                {initialGrid[row][col]}
                {index < selectedSequence.length - 1 && " → "}
              </span>
            ))
          ) : (
            <span className="empty-sequence"></span>
          )}
        </div>
        
        <div className="control-buttons">
          <Button 
            text="Clear Selection" 
            onClick={handleClear} 
            warning
          />
          <Button 
            text="New Game" 
            onClick={handleReset} 
            primary
          />
          <Button 
            text="Main Menu" 
            onClick={onMainMenu} 
            secondary
          />
        </div>
      </div>

      <div className="words-section">
        <div className="words-to-find">
          <h3>Words to find ({totalWords}):</h3>
          <ul>
            {placedWords.map((wordObj, index) => (
              <li 
                key={index}
                className={foundWords.includes(wordObj.word) ? "found" : ""}
              >
                {wordObj.word}
                {foundWords.includes(wordObj.word) && " ✓"}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="found-words">
          <h3>Found: {foundWordsCount}/{totalWords}</h3>
          {foundWordsCount > 0 ? (
            <div className="found-list">
              {foundWords.map((word, index) => (
                <span key={index} className="found-badge">
                  {word}
                </span>
              ))}
            </div>
          ) : (
            <p className="no-found">No words found yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Grid;