import { useState, useCallback, useRef, useEffect } from 'react';
import { generatePuzzle, findErrors, isBoardComplete } from '@/lib/sudoku';
import type { CellData, CellPosition, Difficulty, GameState, Board } from '@/lib/sudoku';

function boardToCellData(puzzle: Board, solution: Board): CellData[][] {
  return puzzle.map((row, r) =>
    row.map((val, c) => ({
      value: val,
      isFixed: val !== null,
      isError: false,
    }))
  );
}

function cloneCellBoard(board: CellData[][]): CellData[][] {
  return board.map(row => row.map(cell => ({ ...cell })));
}

export function useSudokuGame() {
  const [board, setBoard] = useState<CellData[][]>([]);
  const [solution, setSolution] = useState<Board>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [mistakes, setMistakes] = useState(0);
  const [timer, setTimer] = useState(0);
  const [history, setHistory] = useState<CellData[][][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const newGame = useCallback((diff: Difficulty) => {
    stopTimer();
    setDifficulty(diff);
    const [puzzle, sol] = generatePuzzle(diff);
    const cellBoard = boardToCellData(puzzle, sol);
    setBoard(cellBoard);
    setSolution(sol);
    setSelectedCell(null);
    setGameState('playing');
    setMistakes(0);
    setTimer(0);
    setHistory([cloneCellBoard(cellBoard)]);
    setHistoryIndex(0);
    startTimer();
  }, [startTimer, stopTimer]);

  const resetGame = useCallback(() => {
    if (board.length === 0) return;
    const resetBoard = board.map(row =>
      row.map(cell => ({
        ...cell,
        value: cell.isFixed ? cell.value : null,
        isError: false,
      }))
    );
    setBoard(resetBoard);
    setGameState('playing');
    setMistakes(0);
    setTimer(0);
    setHistory([cloneCellBoard(resetBoard)]);
    setHistoryIndex(0);
    startTimer();
  }, [board, startTimer]);

  const setCellValue = useCallback((row: number, col: number, value: number | null) => {
    if (gameState !== 'playing') return;
    if (board[row][col].isFixed) return;

    const newBoard = cloneCellBoard(board);
    newBoard[row][col].value = value;

    // Check if wrong
    if (value !== null && value !== solution[row][col]) {
      setMistakes(m => m + 1);
    }

    // Update errors
    const rawBoard: Board = newBoard.map(r => r.map(c => c.value));
    const errors = findErrors(rawBoard);
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        newBoard[r][c].isError = errors[r][c];
      }
    }

    // Push to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(cloneCellBoard(newBoard));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    setBoard(newBoard);

    // Check completion
    if (isBoardComplete(rawBoard)) {
      const hasErrors = errors.some(row => row.some(e => e));
      if (!hasErrors) {
        setGameState('completed');
        stopTimer();
      }
    }
  }, [board, solution, gameState, history, historyIndex, stopTimer]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setBoard(cloneCellBoard(history[newIndex]));
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setBoard(cloneCellBoard(history[newIndex]));
    }
  }, [history, historyIndex]);

  // Cleanup timer
  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  return {
    board,
    difficulty,
    selectedCell,
    setSelectedCell,
    gameState,
    mistakes,
    timer,
    newGame,
    resetGame,
    setCellValue,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
  };
}
