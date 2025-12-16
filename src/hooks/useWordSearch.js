import { useState, useEffect, useRef, useCallback } from "react";

const DIRECTIONS = [
  [0, 1],   
  [1, 0],   
  [1, 1],   
  [1, -1],  
  [0, -1],  
  [-1, 0],  
  [-1, 1],  
  [-1, -1], 
];

const WORD_POOL = [
  "CAT", "DOG", "SUN", "MOON", "STAR", "FISH", "BIRD", "TREE", "BOOK", "BALL",
  "HOUSE", "WATER", "APPLE", "HAPPY", "GREEN", "BLUE", "RED", "FUN", "GAME", "WEB",
  "CODE", "JAVA", "LOVE", "TIME", "FIRE", "SNOW", "RAIN", "WIND", "CLOUD", "BEACH"
];

function generateGrid(gridSize, wordCount) {
  console.log(`Generating ${gridSize}x${gridSize} grid with ${wordCount} words`);
  
  const grid = Array(gridSize).fill(null).map(() => 
    Array(gridSize).fill("")
  );
  
  const placedWords = [];
  const usedCells = new Set();

  const canPlaceWord = (word, startRow, startCol, direction) => {
    const positions = [];
    const wordLength = word.length;
    
    const endRow = startRow + direction[0] * (wordLength - 1);
    const endCol = startCol + direction[1] * (wordLength - 1);
    
    if (endRow < 0 || endRow >= gridSize || endCol < 0 || endCol >= gridSize) {
      return null;
    }
    
    for (let i = 0; i < wordLength; i++) {
      const row = startRow + direction[0] * i;
      const col = startCol + direction[1] * i;

      const cellKey = `${row},${col}`;
      
      if (usedCells.has(cellKey)) {
        return null;
      }

      positions.push([row, col]);
    }
    
    return positions;
  };

  const findPossiblePositions = (word) => {
    const positions = [];
    const wordLength = word.length;
    
    for (let startRow = 0; startRow < gridSize; startRow++) {
      for (let startCol = 0; startCol < gridSize; startCol++) {
        for (const direction of DIRECTIONS) {
          const placedPositions = canPlaceWord(word, startRow, startCol, direction);
          if (placedPositions) {
            positions.push({
              startRow,
              startCol,
              direction,
              positions: placedPositions
            });
          }
        }
      }
    }
    
    return positions;
  };

  const getRandomWords = () => {
    const maxWordLength = Math.min(gridSize, 8);
    const suitableWords = WORD_POOL.filter(word => word.length <= maxWordLength);
    
    const shuffled = [...suitableWords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, wordCount).map(word => word.toUpperCase());
  };

  const wordsToPlace = getRandomWords();
  
  const sortedWords = [...wordsToPlace].sort((a, b) => b.length - a.length);

  sortedWords.forEach(word => {
    const possiblePositions = findPossiblePositions(word);
    
    if (possiblePositions.length > 0) {
      const randomIndex = Math.floor(Math.random() * possiblePositions.length);
      const { startRow, startCol, direction, positions } = possiblePositions[randomIndex];
      
      positions.forEach(([row, col], index) => {
        grid[row][col] = word[index];
        usedCells.add(`${row},${col}`);
      });

      placedWords.push({
        word: word,
        positions: positions,
        direction: direction
      });
    }
  });

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col] === "") {
        const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        grid[row][col] = randomLetter;
      }
    }
  }

  return { grid, placedWords };
}

const areCellsConsecutiveInLine = (sequence) => {
  if (sequence.length < 2) return true;
  
  const [firstRow, firstCol] = sequence[0];
  const [secondRow, secondCol] = sequence[1];
  
  const rowDir = secondRow - firstRow;
  const colDir = secondCol - firstCol;
  
  const normalizedRowDir = rowDir === 0 ? 0 : rowDir / Math.abs(rowDir);
  const normalizedColDir = colDir === 0 ? 0 : colDir / Math.abs(colDir);
  
  let isForwardConsecutive = true;
  for (let i = 1; i < sequence.length; i++) {
    const [prevRow, prevCol] = sequence[i - 1];
    const [currRow, currCol] = sequence[i];
    
    const expectedRow = prevRow + normalizedRowDir;
    const expectedCol = prevCol + normalizedColDir;
    
    if (currRow !== expectedRow || currCol !== expectedCol) {
      isForwardConsecutive = false;
      break;
    }
  }
  
  let isReverseConsecutive = true;
  const reverseRowDir = -normalizedRowDir;
  const reverseColDir = -normalizedColDir;
  
  for (let i = 1; i < sequence.length; i++) {
    const [prevRow, prevCol] = sequence[i - 1];
    const [currRow, currCol] = sequence[i];
    
    const expectedRow = prevRow + reverseRowDir;
    const expectedCol = prevCol + reverseColDir;
    
    if (currRow !== expectedRow || currCol !== expectedCol) {
      isReverseConsecutive = false;
      break;
    }
  }
  
  return isForwardConsecutive || isReverseConsecutive;
};

export function useWordSearch(onComplete, gameSettings) {
  console.log("useWordSearch called with:", gameSettings);
  
  const settings = gameSettings || {
    gridSize: 5,
    wordCount: 6
  };

  const gridDataRef = useRef(null);
  
  if (!gridDataRef.current || 
      gridDataRef.current.gridSize !== settings.gridSize || 
      gridDataRef.current.wordCount !== settings.wordCount) {
    console.log("Creating new grid data");
    gridDataRef.current = {
      ...generateGrid(settings.gridSize, settings.wordCount),
      gridSize: settings.gridSize,
      wordCount: settings.wordCount
    };
  }

  const { grid: initialGrid, placedWords } = gridDataRef.current;

  const [selectedSequence, setSelectedSequence] = useState([]);
  const [selectedCells, setSelectedCells] = useState(() => 
    Array(settings.gridSize).fill(null).map(() => Array(settings.gridSize).fill(false))
  );
  const [foundCells, setFoundCells] = useState(() => 
    Array(settings.gridSize).fill(null).map(() => Array(settings.gridSize).fill(false))
  );
  const [foundWords, setFoundWords] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState(null);

  const checkWords = useCallback((sequence) => {
    if (sequence.length < 2) return;

    placedWords.forEach(wordObj => {
      if (foundWords.includes(wordObj.word)) return;

      const wordPositions = wordObj.positions;
      
      if (sequence.length !== wordPositions.length) return;

      const isForwardMatch = sequence.every(([r, c], index) => {
        const [wr, wc] = wordPositions[index];
        return r === wr && c === wc;
      });

      const isReverseMatch = sequence.every(([r, c], index) => {
        const reverseIndex = wordPositions.length - 1 - index;
        const [wr, wc] = wordPositions[reverseIndex];
        return r === wr && c === wc;
      });

      const isConsecutiveLine = areCellsConsecutiveInLine(sequence);
      
      if ((isForwardMatch || isReverseMatch) && isConsecutiveLine) {
        const newFoundWords = [...foundWords, wordObj.word];
        setFoundWords(newFoundWords);
        
        setFoundCells(prev => {
          const newFound = [...prev.map(row => [...row])];
          wordPositions.forEach(([r, c]) => {
            newFound[r][c] = true;
          });
          return newFound;
        });

        if (newFoundWords.length === placedWords.length && onComplete) {
          onComplete({
            found: newFoundWords.length,
            total: placedWords.length
          });
        }

        setSelectedSequence([]);
        setSelectedDirection(null);
        setSelectedCells(Array(settings.gridSize).fill(null).map(() => Array(settings.gridSize).fill(false)));
      }
    });
  }, [foundWords, placedWords, onComplete, settings.gridSize]);

  const handleClick = useCallback((row, col) => {
    if (foundCells[row][col]) return;

    if (selectedSequence.length === 0) {
      setSelectedSequence([[row, col]]);
      setSelectedCells(prev => {
        const newSelected = [...prev.map(r => [...r])];
        newSelected[row][col] = true;
        return newSelected;
      });
      return;
    }

    const existingIndex = selectedSequence.findIndex(
      ([r, c]) => r === row && c === col
    );

    if (existingIndex !== -1) {
      if (existingIndex === selectedSequence.length - 1) {
        setSelectedSequence(prev => prev.slice(0, -1));
        setSelectedCells(prev => {
          const newSelected = [...prev.map(r => [...r])];
          newSelected[row][col] = false;
          return newSelected;
        });
        if (selectedSequence.length === 1) {
          setSelectedDirection(null);
        }
      }
      return;
    }

    const [lastRow, lastCol] = selectedSequence[selectedSequence.length - 1];
    const rowDiff = row - lastRow;
    const colDiff = col - lastCol;
    
    if (Math.abs(rowDiff) > 1 || Math.abs(colDiff) > 1) {
      setSelectedSequence([[row, col]]);
      setSelectedDirection(null);
      setSelectedCells(Array(settings.gridSize).fill(null).map(() => Array(settings.gridSize).fill(false)));
      setSelectedCells(prev => {
        const newSelected = [...prev.map(r => [...r])];
        newSelected[row][col] = true;
        return newSelected;
      });
      return;
    }

    const direction = [
      rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff),
      colDiff === 0 ? 0 : colDiff / Math.abs(colDiff)
    ];

    if (selectedSequence.length === 1) {
      setSelectedDirection(direction);
    } else {
      if (selectedDirection && 
          (direction[0] !== selectedDirection[0] || 
           direction[1] !== selectedDirection[1])) {
        setSelectedSequence([[row, col]]);
        setSelectedDirection(null);
        setSelectedCells(Array(settings.gridSize).fill(null).map(() => Array(settings.gridSize).fill(false)));
        setSelectedCells(prev => {
          const newSelected = [...prev.map(r => [...r])];
          newSelected[row][col] = true;
          return newSelected;
        });
        return;
      }
    }

    const expectedRow = lastRow + (selectedDirection ? selectedDirection[0] : direction[0]);
    const expectedCol = lastCol + (selectedDirection ? selectedDirection[1] : direction[1]);
    
    if (row !== expectedRow || col !== expectedCol) {
      setSelectedSequence([[row, col]]);
      setSelectedDirection(null);
      setSelectedCells(Array(settings.gridSize).fill(null).map(() => Array(settings.gridSize).fill(false)));
      setSelectedCells(prev => {
        const newSelected = [...prev.map(r => [...r])];
        newSelected[row][col] = true;
        return newSelected;
      });
      return;
    }

    setSelectedSequence(prev => [...prev, [row, col]]);
    setSelectedCells(prev => {
      const newSelected = [...prev.map(r => [...r])];
      newSelected[row][col] = true;
      return newSelected;
    });
  }, [foundCells, selectedSequence, selectedDirection, settings.gridSize]);

  useEffect(() => {
    checkWords(selectedSequence);
  }, [selectedSequence, checkWords]);

  const isCellSelected = useCallback((row, col) => {
    return selectedCells[row][col];
  }, [selectedCells]);

  const isCellLastSelected = useCallback((row, col) => {
    if (selectedSequence.length === 0) return false;
    const [lastRow, lastCol] = selectedSequence[selectedSequence.length - 1];
    return row === lastRow && col === lastCol;
  }, [selectedSequence]);

  const getCellOrder = useCallback((row, col) => {
    const index = selectedSequence.findIndex(([r, c]) => r === row && c === col);
    return index !== -1 ? index + 1 : null;
  }, [selectedSequence]);

  const handleReset = useCallback(() => {
    gridDataRef.current = {
      ...generateGrid(settings.gridSize, settings.wordCount),
      gridSize: settings.gridSize,
      wordCount: settings.wordCount
    };
    setSelectedSequence([]);
    setSelectedDirection(null);
    setSelectedCells(Array(settings.gridSize).fill(null).map(() => Array(settings.gridSize).fill(false)));
    setFoundCells(Array(settings.gridSize).fill(null).map(() => Array(settings.gridSize).fill(false)));
    setFoundWords([]);
  }, [settings.gridSize, settings.wordCount]);

  const handleClear = useCallback(() => {
    setSelectedSequence([]);
    setSelectedDirection(null);
    setSelectedCells(Array(settings.gridSize).fill(null).map(() => Array(settings.gridSize).fill(false)));
  }, [settings.gridSize]);

  return {
    initialGrid,
    placedWords,
    selectedCells: isCellSelected, 
    foundCells,
    isCellLastSelected,
    getCellOrder,
    foundWords,
    foundWordsCount: foundWords.length,
    totalWords: placedWords.length,
    handleClick,
    handleReset,
    handleClear,
    selectedSequence,
    gridSize: settings.gridSize
  };
}