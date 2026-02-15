import { Board, CellValue, Difficulty } from './types';
import { isValidPlacement } from './validation';

const GRID_SIZE = 9;

/**
 * Create an empty 9x9 board.
 */
function createEmptyBoard(): Board {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
}

/**
 * Shuffle an array in place (Fisher-Yates).
 */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Fill the board with a valid complete solution using backtracking.
 */
function fillBoard(board: Board): boolean {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (board[r][c] === null) {
        const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of nums) {
          if (isValidPlacement(board, r, c, num)) {
            board[r][c] = num;
            if (fillBoard(board)) return true;
            board[r][c] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
}

/**
 * Count the number of solutions (up to limit) for a board.
 */
function countSolutions(board: Board, limit: number = 2): number {
  let count = 0;

  function solve(): boolean {
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (board[r][c] === null) {
          for (let num = 1; num <= 9; num++) {
            if (isValidPlacement(board, r, c, num)) {
              board[r][c] = num;
              if (solve()) return true;
              board[r][c] = null;
            }
          }
          return false;
        }
      }
    }
    count++;
    return count >= limit;
  }

  solve();
  return count;
}

const CLUES_BY_DIFFICULTY: Record<Difficulty, number> = {
  easy: 42,
  medium: 32,
  hard: 25,
};

/**
 * Generate a puzzle with the given difficulty.
 * Returns [puzzle, solution].
 */
export function generatePuzzle(difficulty: Difficulty): [Board, Board] {
  const solution = createEmptyBoard();
  fillBoard(solution);

  // Deep copy for puzzle
  const puzzle: Board = solution.map(row => [...row]);
  const targetClues = CLUES_BY_DIFFICULTY[difficulty];
  const cellsToRemove = 81 - targetClues;

  // Create shuffled list of all positions
  const positions: [number, number][] = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      positions.push([r, c]);
    }
  }
  const shuffledPositions = shuffle(positions);

  let removed = 0;
  for (const [r, c] of shuffledPositions) {
    if (removed >= cellsToRemove) break;

    const backup = puzzle[r][c];
    puzzle[r][c] = null;

    // Check unique solution
    const boardCopy: Board = puzzle.map(row => [...row]);
    if (countSolutions(boardCopy, 2) === 1) {
      removed++;
    } else {
      puzzle[r][c] = backup; // restore
    }
  }

  return [puzzle, solution];
}
