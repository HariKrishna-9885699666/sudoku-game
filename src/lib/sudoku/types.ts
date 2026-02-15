export type Difficulty = 'easy' | 'medium' | 'hard';

export type CellValue = number | null; // 1-9 or null

export type Board = CellValue[][];

export type CellPosition = {
  row: number;
  col: number;
};

export type GameState = 'idle' | 'playing' | 'completed';

export type CellData = {
  value: CellValue;
  isFixed: boolean;
  isError: boolean;
};

export type GameData = {
  board: CellData[][];
  solution: Board;
  difficulty: Difficulty;
  selectedCell: CellPosition | null;
  gameState: GameState;
  mistakes: number;
  history: CellData[][][];
  historyIndex: number;
};
