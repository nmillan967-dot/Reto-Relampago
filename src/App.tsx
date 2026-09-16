import React, { useState, useEffect } from 'react';
import { DifficultyLevel, GameRecord, Question } from './types';
import { CATEGORIES } from './data/categories';
import { QUESTIONS } from './data/questions';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { CategoriesModal } from './components/CategoriesModal';
import { InstructionsModal } from './components/InstructionsModal';
import { RecordsModal } from './components/RecordsModal';
import { GameScreen } from './components/GameScreen';
import { FinalScreen } from './components/FinalScreen';
import { downloadStandaloneHtml } from './utils/exportHtml';

export default function App() {
  const [view, setView] = useState<'home' | 'playing' | 'summary'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>('facil');

  // Modals
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);
  const [isRecordsOpen, setIsRecordsOpen] = useState<boolean>(false);

  // Active game questions
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);

  // Records / History in localStorage
  const [records, setRecords] = useState<GameRecord[]>(() => {
    try {
      const saved = localStorage.getItem('reto_records');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Last match stats
  const [lastStats, setLastStats] = useState<{
    score: number;
    correctCount: number;
    incorrectCount: number;
    maxStreak: number;
    avgTimeSeconds: number;
  } | null>(null);

  // Save records to localStorage
  const saveGameRecord = (newRecord: GameRecord) => {
    try {
      const updated = [newRecord, ...records].slice(0, 10);
      setRecords(updated);
      localStorage.setItem('reto_records', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleClearRecords = () => {
    setRecords([]);
    localStorage.removeItem('reto_records');
  };

  // Start new match
  const handleStartGame = (overrideCategory?: string) => {
    const catToUse = overrideCategory || selectedCategory;

    // Filter question pool
    let pool = QUESTIONS.filter((q) => {
      const matchesCat = catToUse === 'all' || q.categoryId === catToUse;
      const matchesLvl = q.level === currentLevel;
      return matchesCat && matchesLvl;
    });

    // If pool has fewer than 10 questions in exact level, widen to all levels within that category
    if (pool.length < 10) {
      pool = QUESTIONS.filter((q) => catToUse === 'all' || q.categoryId === catToUse);
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);

    // Pick exactly 10 questions without repetition
    const selected10 = shuffled.slice(0, 10);
    setActiveQuestions(selected10);
    setView('playing');
  };

  // Finish match handler
  const handleFinishGame = (stats: {
    score: number;
    correctCount: number;
    incorrectCount: number;
    maxStreak: number;
    avgTimeSeconds: number;
    responseTimes: number[];
  }) => {
    setLastStats({
      score: stats.score,
      correctCount: stats.correctCount,
      incorrectCount: stats.incorrectCount,
      maxStreak: stats.maxStreak,
      avgTimeSeconds: stats.avgTimeSeconds,
    });

    const accuracy = Math.round((stats.correctCount / 10) * 100);
    let badgeTitle = '¡SIGUE ENTRENANDO TU MENTE! 💪';
    if (accuracy >= 90) badgeTitle = '¡MENTE BRILLANTE! ⚡🧠';
    else if (accuracy >= 70) badgeTitle = '¡GRAN RETADOR! 🚀';
    else if (accuracy >= 50) badgeTitle = '¡VAS POR BUEN CAMINO! ⭐';

    const catObj = CATEGORIES.find((c) => c.id === selectedCategory);
    const catName = catObj ? catObj.name : 'Todas las categorías';

    const newRecord: GameRecord = {
      id: String(Date.now()),
      date: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
      score: stats.score,
      correctCount: stats.correctCount,
      incorrectCount: stats.incorrectCount,
      accuracy,
      maxStreak: stats.maxStreak,
      avgTimeSeconds: stats.avgTimeSeconds,
      categoryName: catName,
      level: currentLevel,
      badgeTitle,
    };

    saveGameRecord(newRecord);
    setView('summary');
  };

  const getCategoryDisplayName = () => {
    if (selectedCategory === 'all') return 'Todas las categorías';
    const c = CATEGORIES.find((cat) => cat.id === selectedCategory);
    return c ? `${c.emoji} ${c.name}` : 'Todas las categorías';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col px-4 sm:px-6">
        {/* Navigation Bar */}
        <Header
          onGoHome={() => setView('home')}
          showHomeBtn={view !== 'home'}
        />

        {/* Dynamic Screen Routing */}
        <main className="flex-1 flex flex-col items-center justify-center pb-8">
          {view === 'home' && (
            <HomeScreen
              onStartGame={() => handleStartGame()}
              onOpenInstructions={() => setIsInstructionsOpen(true)}
              onOpenCategories={() => setIsCategoriesOpen(true)}
              onOpenRecords={() => setIsRecordsOpen(true)}
              onExportGame={downloadStandaloneHtml}
              currentLevel={currentLevel}
              onSelectLevel={setCurrentLevel}
              selectedCategory={selectedCategory}
              categories={CATEGORIES}
            />
          )}

          {view === 'playing' && (
            <GameScreen
              questions={activeQuestions}
              categories={CATEGORIES}
              level={currentLevel}
              onFinishGame={handleFinishGame}
              onQuitToHome={() => setView('home')}
            />
          )}

          {view === 'summary' && lastStats && (
            <FinalScreen
              score={lastStats.score}
              correctCount={lastStats.correctCount}
              incorrectCount={lastStats.incorrectCount}
              maxStreak={lastStats.maxStreak}
              avgTimeSeconds={lastStats.avgTimeSeconds}
              categoryName={getCategoryDisplayName()}
              level={currentLevel}
              onPlayAgain={() => handleStartGame()}
              onChangeCategory={() => setIsCategoriesOpen(true)}
              onGoHome={() => setView('home')}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <CategoriesModal
        isOpen={isCategoriesOpen}
        onClose={() => setIsCategoriesOpen(false)}
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={(id) => {
          setSelectedCategory(id);
          if (view === 'summary') {
            setView('home');
          }
        }}
      />

      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
        onStartNow={() => {
          setIsInstructionsOpen(false);
          handleStartGame();
        }}
      />

      <RecordsModal
        isOpen={isRecordsOpen}
        onClose={() => setIsRecordsOpen(false)}
        records={records}
        onClearRecords={handleClearRecords}
      />
    </div>
  );
}
