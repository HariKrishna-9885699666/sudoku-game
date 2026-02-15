import { Board, CellValue } from './types';

const GRID_SIZE = 9;
const BOX_SIZE = 3;

/**
 * Check if placing `num` at (row, col) is valid.
 */
export function isValidPlacement(board: Board, row: number, col: number, num: number): boolean {
  // Check row
  for (let c = 0; c < GRID_SIZE; c++) {
    if (board[row][c] === num) return false;
  }
  // Check column
  for (let r = 0; r < GRID_SIZE; r++) {
    if (board[r][col] === num) return false;
  }
  // Check 3x3 box
  const boxRow = Math.floor(row / BOX_SIZE) * BOX_SIZE;
  const boxCol = Math.floor(col / BOX_SIZE) * BOX_SIZE;
  for (let r = boxRow; r < boxRow + BOX_SIZE; r++) {
    for (let c = boxCol; c < boxCol + BOX_SIZE; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
}

/**
 * Check if a completed board is valid.
 */
export function isBoardValid(board: Board): boolean {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const val = board[r][c];
      if (val === null) return false;
      board[r][c] = null;
      const valid = isValidPlacement(board, r, c, val);
      board[r][c] = val;
      if (!valid) return false;
    }
  }
  return true;
}

/**
 * Check if the board is completely filled.
 */
export function isBoardComplete(board: Board): boolean {
  return board.every(row => row.every(cell => cell !== null));
}

/**
 * Find cells that conflict with Sudoku rules.
 */
export function findErrors(board: Board): boolean[][] {
  const errors: boolean[][] = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(false)
  );

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const val = board[r][c];
      if (val === null) continue;
      
      // Check duplicates in row
      for (let c2 = 0; c2 < GRID_SIZE; c2++) {
        if (c2 !== c && board[r][c2] === val) {
          errors[r][c] = true;
          errors[r][c2] = true;
        }
      }
      // Check duplicates in col
      for (let r2 = 0; r2 < GRID_SIZE; r2++) {
        if (r2 !== r && board[r2][c] === val) {
          errors[r][c] = true;
          errors[r2][c] = true;
        }
      }
      // Check duplicates in box
      const boxRow = Math.floor(r / BOX_SIZE) * BOX_SIZE;
      const boxCol = Math.floor(c / BOX_SIZE) * BOX_SIZE;
      for (let br = boxRow; br < boxRow + BOX_SIZE; br++) {
        for (let bc = boxCol; bc < boxCol + BOX_SIZE; bc++) {
          if (br !== r || bc !== c) {
            if (board[br][bc] === val) {
              errors[r][c] = true;
              errors[br][bc] = true;
            }
          }
        }
      }
    }
  }

  return errors;
}


