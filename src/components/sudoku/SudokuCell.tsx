import React from 'react';
import type { CellData, CellPosition } from '@/lib/sudoku';

type SudokuCellProps = {
  cell: CellData;
  row: number;
  col: number;
  isSelected: boolean;
  isRelated: boolean;
  isSameValue: boolean;
  onClick: () => void;
};

const SudokuCell = React.memo(function SudokuCell({
  cell,
  row,
  col,
  isSelected,
  isRelated,
  isSameValue,
  onClick,
}: SudokuCellProps) {
  const borderClasses = [
    col % 3 === 0 && col !== 0 ? 'border-l-2 border-l-grid-line' : 'border-l border-l-grid-line-light',
    row % 3 === 0 && row !== 0 ? 'border-t-2 border-t-grid-line' : 'border-t border-t-grid-line-light',
    col === 8 ? 'border-r-0' : '',
    row === 8 ? 'border-b-0' : '',
  ].join(' ');

  let bgClass = 'bg-background';
  if (isSelected) bgClass = 'bg-cell-selected';
  else if (cell.isError) bgClass = 'bg-cell-error';
  else if (isSameValue && cell.value) bgClass = 'bg-cell-selected/50';
  else if (isRelated) bgClass = 'bg-cell-related';
  else if (cell.isFixed) bgClass = 'bg-cell-fixed';

  return (
    <button
      className={`
        relative flex items-center justify-center
        aspect-square w-full
        text-lg sm:text-xl md:text-2xl
        transition-colors duration-100
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset
        ${borderClasses}
        ${bgClass}
        ${cell.isFixed ? 'font-display font-bold text-foreground' : 'font-body font-semibold'}
        ${cell.isError && !cell.isFixed ? 'text-destructive' : ''}
        ${!cell.isFixed && cell.value ? 'text-accent' : ''}
        ${cell.value ? 'animate-cell-pop' : ''}
      `}
      onClick={onClick}
      aria-label={`Row ${row + 1}, Column ${col + 1}${cell.value ? `, value ${cell.value}` : ', empty'}${cell.isFixed ? ', clue' : ''}`}
      aria-selected={isSelected}
      role="gridcell"
    >
      {cell.value || ''}
    </button>
  );
});

export default SudokuCell;
