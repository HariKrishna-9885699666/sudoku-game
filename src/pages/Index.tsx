import React, { useCallback, useEffect } from 'react';
import { useSudokuGame } from '@/hooks/useSudokuGame';
import SudokuBoard from '@/components/sudoku/SudokuBoard';
import GameControls from '@/components/sudoku/GameControls';
import StatusBar from '@/components/sudoku/StatusBar';
import WinDialog from '@/components/sudoku/WinDialog';
import ProfileCard from '@/components/ProfileCard';

const Index = () => {
  const {
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
    canUndo,
    canRedo,
  } = useSudokuGame();

  const handleCellClick = useCallback((row: number, col: number) => {
    setSelectedCell({ row, col });
  }, [setSelectedCell]);

  const handleNumberInput = useCallback((num: number | null) => {
    if (!selectedCell) return;
    setCellValue(selectedCell.row, selectedCell.col, num);
  }, [selectedCell, setCellValue]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      if (selectedCell) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 9) {
          setCellValue(selectedCell.row, selectedCell.col, num);
          return;
        }
        if (e.key === 'Backspace' || e.key === 'Delete') {
          setCellValue(selectedCell.row, selectedCell.col, null);
          return;
        }
      }

      // Arrow key navigation
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const row = selectedCell?.row ?? 4;
        const col = selectedCell?.col ?? 4;
        let newRow = row, newCol = col;
        if (e.key === 'ArrowUp') newRow = Math.max(0, row - 1);
        if (e.key === 'ArrowDown') newRow = Math.min(8, row + 1);
        if (e.key === 'ArrowLeft') newCol = Math.max(0, col - 1);
        if (e.key === 'ArrowRight') newCol = Math.min(8, col + 1);
        setSelectedCell({ row: newRow, col: newCol });
      }

      // Undo/Redo
      if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, gameState, setCellValue, setSelectedCell, undo, redo]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-8 gap-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-foreground">
          Sudoku
        </h1>
        <p className="font-body text-sm text-muted-foreground mt-1">
          A classic number puzzle
        </p>
      </div>

      {gameState === 'idle' ? (
        /* Start screen */
        <div className="flex flex-col items-center gap-6 mt-4">
          <p className="font-body text-muted-foreground text-center max-w-xs">
            Select a difficulty to begin
          </p>
          <div className="flex gap-3">
            {(['easy', 'medium', 'hard'] as const).map(d => (
              <button
                key={d}
                onClick={() => newGame(d)}
                className="px-6 py-3 rounded-lg font-body font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-md capitalize"
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <StatusBar
            difficulty={difficulty}
            timer={timer}
            mistakes={mistakes}
            gameState={gameState}
          />
          <SudokuBoard
            board={board}
            selectedCell={selectedCell}
            onCellClick={handleCellClick}
          />
          <GameControls
            difficulty={difficulty}
            onNewGame={newGame}
            onReset={resetGame}
            onUndo={undo}
            onRedo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
            onNumberInput={handleNumberInput}
            gameActive={gameState === 'playing'}
          />
        </>
      )}

      <WinDialog
        show={gameState === 'completed'}
        timer={timer}
        mistakes={mistakes}
        difficulty={difficulty}
        onNewGame={() => newGame(difficulty)}
      />

      <ProfileCard />
    </div>
  );
};

export default Index;
