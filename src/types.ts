export type DifficultyLevel = 'facil' | 'intermedio' | 'dificil';

export interface Category {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  badgeBg: string;
  borderAccent: string;
}

export interface Question {
  id: string;
  categoryId: string;
  level: DifficultyLevel;
  question: string;
  options: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, 3
  explanation: string;
}

export type GameView = 'home' | 'categories' | 'instructions' | 'records' | 'playing' | 'summary';

export interface GameRecord {
  id: string;
  date: string;
  score: number;
  correctCount: number;
  incorrectCount: number;
  accuracy: number;
  maxStreak: number;
  avgTimeSeconds: number;
  categoryName: string;
  level: DifficultyLevel;
  badgeTitle: string;
}

export interface CurrentGameStats {
  score: number;
  questionIndex: number;
  currentStreak: number;
  maxStreak: number;
  correctCount: number;
  incorrectCount: number;
  totalTimeSpent: number; // in seconds
  selectedCategory: string; // 'all' or category id
  level: DifficultyLevel;
}
