import React, { useCallback } from 'react';
import type { CellData, CellPosition } from '@/lib/sudoku';
import SudokuCell from './SudokuCell';

type SudokuBoardProps = {
  board: CellData[][];
  selectedCell: CellPosition | null;
  onCellClick: (row: number, col: number) => void;
};

const SudokuBoard = React.memo(function SudokuBoard({
  board,
  selectedCell,
  onCellClick,
}: SudokuBoardProps) {
  if (board.length === 0) return null;

  const selectedValue = selectedCell ? board[selectedCell.row][selectedCell.col].value : null;

  return (
    <div
      className="grid grid-cols-9 border-2 border-grid-line rounded-lg overflow-hidden shadow-lg w-full max-w-[min(90vw,480px)] aspect-square"
      role="grid"
      aria-label="Sudoku board"
    >
      {board.flatMap((row, r) =>
        row.map((cell, c) => {
          const isSelected = selectedCell?.row === r && selectedCell?.col === c;
          const isRelated = selectedCell
            ? selectedCell.row === r ||
              selectedCell.col === c ||
              (Math.floor(selectedCell.row / 3) === Math.floor(r / 3) &&
                Math.floor(selectedCell.col / 3) === Math.floor(c / 3))
            : false;
          const isSameValue = selectedValue !== null && cell.value === selectedValue;

          return (
            <SudokuCell
              key={`${r}-${c}`}
              cell={cell}
              row={r}
              col={c}
              isSelected={isSelected}
              isRelated={isRelated && !isSelected}
              isSameValue={isSameValue && !isSelected}
              onClick={() => onCellClick(r, c)}
            />
          );
        })
      )}
    </div>
  );
});

export default SudokuBoard;
