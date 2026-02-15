import React from 'react';
import { Trophy } from 'lucide-react';
import type { Difficulty } from '@/lib/sudoku';

type WinDialogProps = {
  show: boolean;
  timer: number;
  mistakes: number;
  difficulty: Difficulty;
  onNewGame: () => void;
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const difficultyLabels: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export default function WinDialog({ show, timer, mistakes, difficulty, onNewGame }: WinDialogProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm">
      <div className="bg-background border border-border rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4 animate-celebrate text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
            <Trophy className="text-accent" size={32} />
          </div>
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Puzzle Complete!
        </h2>
        <p className="font-body text-muted-foreground mb-6">
          You solved the {difficultyLabels[difficulty]} puzzle.
        </p>
        <div className="flex justify-center gap-6 mb-6">
          <div className="text-center">
            <div className="font-display text-xl font-bold text-foreground">{formatTime(timer)}</div>
            <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">Time</div>
          </div>
          <div className="text-center">
            <div className="font-display text-xl font-bold text-foreground">{mistakes}</div>
            <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">Mistakes</div>
          </div>
        </div>
        <button
          onClick={onNewGame}
          className="w-full py-3 rounded-lg font-body font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          New Game
        </button>
      </div>
    </div>
  );
}
