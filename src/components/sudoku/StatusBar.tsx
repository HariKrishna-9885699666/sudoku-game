import React from 'react';
import type { Difficulty, GameState } from '@/lib/sudoku';
import { Clock, AlertTriangle } from 'lucide-react';

type StatusBarProps = {
  difficulty: Difficulty;
  timer: number;
  mistakes: number;
  gameState: GameState;
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

export default function StatusBar({ difficulty, timer, mistakes, gameState }: StatusBarProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-[min(90vw,480px)] px-1">
      <span className="font-body text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        {difficultyLabels[difficulty]}
      </span>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 font-body text-sm text-muted-foreground">
          <AlertTriangle size={14} />
          {mistakes} {mistakes === 1 ? 'mistake' : 'mistakes'}
        </span>
        <span className="flex items-center gap-1.5 font-body text-sm font-medium text-foreground tabular-nums">
          <Clock size={14} />
          {formatTime(timer)}
        </span>
      </div>
    </div>
  );
}
