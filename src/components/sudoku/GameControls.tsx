import React from 'react';
import type { Difficulty } from '@/lib/sudoku';
import { RotateCcw, Undo2, Redo2, Eraser } from 'lucide-react';

type GameControlsProps = {
  difficulty: Difficulty;
  onNewGame: (diff: Difficulty) => void;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onNumberInput: (num: number | null) => void;
  gameActive: boolean;
};

const difficulties: { value: Difficulty; label: string }[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export default function GameControls({
  difficulty,
  onNewGame,
  onReset,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onNumberInput,
  gameActive,
}: GameControlsProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[min(90vw,480px)]">
      {/* Difficulty selector */}
      <div className="flex gap-2 justify-center">
        {difficulties.map(d => (
          <button
            key={d.value}
            onClick={() => onNewGame(d.value)}
            className={`
              px-4 py-2 rounded-md font-body text-sm font-semibold transition-all
              ${difficulty === d.value && gameActive
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }
            `}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Number pad */}
      <div className="grid grid-cols-9 gap-1.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            onClick={() => onNumberInput(num)}
            disabled={!gameActive}
            className="
              aspect-square rounded-md font-display text-lg font-bold
              bg-secondary text-secondary-foreground
              hover:bg-accent hover:text-accent-foreground
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all active:scale-95
              shadow-sm
            "
          >
            {num}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={onUndo}
          disabled={!canUndo || !gameActive}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-body font-medium bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          title="Undo"
        >
          <Undo2 size={16} /> Undo
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo || !gameActive}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-body font-medium bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          title="Redo"
        >
          <Redo2 size={16} /> Redo
        </button>
        <button
          onClick={() => onNumberInput(null)}
          disabled={!gameActive}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-body font-medium bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          title="Erase"
        >
          <Eraser size={16} /> Erase
        </button>
        <button
          onClick={onReset}
          disabled={!gameActive}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-body font-medium bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          title="Reset"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
}
