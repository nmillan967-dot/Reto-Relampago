import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Flame,
  Zap,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Lightbulb,
  Sparkles,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Square,
  ListOrdered,
  Sliders,
} from 'lucide-react';
import { Question, Category, DifficultyLevel } from '../types';
import { soundFx } from '../utils/audio';
import { speechEngine } from '../utils/speech';
import { VoiceSettingsModal } from './VoiceSettingsModal';

interface GameScreenProps {
  questions: Question[];
  categories: Category[];
  level: DifficultyLevel;
  onFinishGame: (stats: {
    score: number;
    correctCount: number;
    incorrectCount: number;
    maxStreak: number;
    avgTimeSeconds: number;
    responseTimes: number[];
  }) => void;
  onQuitToHome: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  questions,
  categories,
  level,
  onFinishGame,
  onQuitToHome,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);

  // Sound & Voice state
  const [soundOn, setSoundOn] = useState(soundFx.isEnabled());
  const [voiceOn, setVoiceOn] = useState(speechEngine.isEnabled());
  const [voiceVolume, setVoiceVolume] = useState(speechEngine.getVolume());
  const [isSpeaking, setIsSpeaking] = useState(speechEngine.isSpeaking());
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Per-question state
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [motivationalMsg, setMotivationalMsg] = useState<{
    text: string;
    isPositive: boolean;
    pointsGained?: number;
  }>({
    text: '',
    isPositive: true,
  });

  const questionStartTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<number | null>(null);

  const currentQ = questions[currentIndex];
  const currentCategory = categories.find((c) => c.id === currentQ?.categoryId);

  // Sync Audio & Voice subscriptions
  useEffect(() => {
    const unsubSound = soundFx.subscribe((en) => setSoundOn(en));
    const unsubVoice = speechEngine.subscribe((en) => setVoiceOn(en));
    const unsubVol = speechEngine.subscribeVolume((vol) => setVoiceVolume(vol));
    const unsubSpeaking = speechEngine.subscribeSpeaking((sp) => setIsSpeaking(sp));
    return () => {
      unsubSound();
      unsubVoice();
      unsubVol();
      unsubSpeaking();
    };
  }, []);

  // Initialize or reset question timer & voice read
  useEffect(() => {
    speechEngine.stop();
    speechEngine.resetTimerAlert();
    setTimeLeft(15);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsTimeOut(false);
    questionStartTimeRef.current = Date.now();

    if (timerRef.current) clearInterval(timerRef.current);

    // Auto-read question if voice is enabled
    if (speechEngine.isEnabled() && currentQ) {
      speechEngine.speakQuestion(currentQ.question, currentIndex + 1);
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        if (prev <= 5) {
          soundFx.playTick();
          if (prev === 5 && speechEngine.isEnabled()) {
            speechEngine.speakTimerSuspense(currentIndex);
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      speechEngine.stop();
    };
  }, [currentIndex]);

  const handleTimeOut = () => {
    soundFx.playWrong();
    speechEngine.stop();

    setIsAnswered(true);
    setIsTimeOut(true);
    setIncorrectCount((prev) => prev + 1);
    setStreak(0);
    setResponseTimes((prev) => [...prev, 15]);

    const encourages = ['¡Casi lo logras!', '¡El tiempo voló, tú puedes!', '¡Concéntrate en la siguiente!'];
    const chosenEncourage = encourages[Math.floor(Math.random() * encourages.length)];

    setMotivationalMsg({
      text: chosenEncourage,
      isPositive: false,
    });

    const correctOptionText = currentQ ? currentQ.options[currentQ.correctIndex] : undefined;
    speechEngine.speakTimeOut(correctOptionText);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return;

    if (timerRef.current) clearInterval(timerRef.current);
    speechEngine.stop();

    // 1. Sonido al seleccionar una respuesta
    soundFx.playSelectOption();

    const elapsed = Math.max(1, Math.round((Date.now() - questionStartTimeRef.current) / 1000));
    setResponseTimes((prev) => [...prev, elapsed]);
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    const isCorrect = optionIndex === currentQ.correctIndex;

    if (isCorrect) {
      // 2. Sonido de respuesta correcta
      soundFx.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) {
        setMaxStreak(newStreak);
      }
      setCorrectCount((prev) => prev + 1);

      // Level multiplier: Fácil x1, Intermedio x1.2, Difícil x1.5
      const levelMultiplier = level === 'dificil' ? 1.5 : level === 'intermedio' ? 1.2 : 1.0;

      // Base 100 + 10 per remaining second
      const speedBonus = timeLeft * 10;
      let streakBonus = 0;
      let bonusLabel = '';

      if (newStreak === 3) {
        streakBonus = 50;
        bonusLabel = ' ¡Racha de 3 (+50)! 🔥';
        soundFx.playStreakBonus();
      } else if (newStreak === 5) {
        streakBonus = 100;
        bonusLabel = ' ¡Super Racha de 5 (+100)! ⚡';
        soundFx.playStreakBonus();
      } else if (newStreak > 5) {
        streakBonus = 30;
      }

      const totalEarned = Math.round((100 + speedBonus) * levelMultiplier) + streakBonus;
      setScore((prev) => prev + totalEarned);

      const motivators = [
        '¡Excelente trabajo!',
        '¡Vas muy bien!',
        '¡Racha activa y rápida!',
        '¡Respuesta brillante!',
        '¡Precisión total!',
      ];
      const chosenMotivator = motivators[Math.floor(Math.random() * motivators.length)];

      setMotivationalMsg({
        text: `${chosenMotivator}${bonusLabel}`,
        isPositive: true,
        pointsGained: totalEarned,
      });

      // Decir respuesta correcta con entonación de presentador y datos de racha
      speechEngine.speakCorrect(newStreak, totalEarned);
    } else {
      // 3. Sonido de respuesta incorrecta
      soundFx.playWrong();
      setStreak(0);
      setIncorrectCount((prev) => prev + 1);

      const encourages = ['¡Buen intento!', '¡Casi lo logras!', '¡Aprende y sigue adelante!', '¡No te rindas!'];
      const chosenEncourage = encourages[Math.floor(Math.random() * encourages.length)];

      setMotivationalMsg({
        text: chosenEncourage,
        isPositive: false,
      });

      // Decir respuesta incorrecta de forma motivadora y cercana
      const correctOptionText = currentQ ? currentQ.options[currentQ.correctIndex] : undefined;
      speechEngine.speakIncorrect(correctOptionText);
    }
  };

  const handleNextQuestion = () => {
    soundFx.playClick();
    speechEngine.stop();

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finish game
      const totalTime = responseTimes.reduce((a, b) => a + b, 0);
      const avgTime = responseTimes.length ? Number((totalTime / responseTimes.length).toFixed(1)) : 0;

      onFinishGame({
        score,
        correctCount,
        incorrectCount,
        maxStreak,
        avgTimeSeconds: avgTime,
        responseTimes,
      });
    }
  };

  // Letters for options A, B, C, D
  const optionLetters = ['A', 'B', 'C', 'D'];

  // Timer color indicator
  const getTimerStyles = () => {
    if (timeLeft > 8) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    if (timeLeft > 4) return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    return 'bg-rose-500/20 text-rose-300 border-rose-500/60 animate-pulse';
  };

  const progressPercent = ((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-3 sm:gap-4 py-1 sm:py-2">
      {/* Top Status & Metrics Bar */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3 sm:p-4 backdrop-blur-md shadow-lg flex items-center justify-between gap-2">
        {/* Question Counter */}
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
            Pregunta
          </span>
          <span className="text-sm sm:text-base font-black text-white">
            {currentIndex + 1} <span className="text-slate-500 font-normal">/ {questions.length}</span>
          </span>
        </div>

        {/* 15s Timer Display */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border font-black text-xs sm:text-sm transition-colors ${getTimerStyles()}`}>
          <Clock className="w-3.5 h-3.5" />
          <span>{timeLeft}s</span>
        </div>

        {/* Current Streak */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 font-black text-xs sm:text-sm">
          <Flame className={`w-3.5 h-3.5 fill-orange-400 ${streak >= 3 ? 'animate-bounce' : ''}`} />
          <span>{streak}</span>
        </div>

        {/* Points Display */}
        <div className="flex flex-col items-end">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
            Puntos
          </span>
          <span className="text-sm sm:text-base font-black text-amber-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-amber-400" />
            {score}
          </span>
        </div>
      </div>

      {/* Quick Audio & Voice Controls in Game */}
      <div className="flex items-center justify-between px-1 text-xs">
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            id="ingame-sound-toggle-btn"
            type="button"
            onClick={() => soundFx.toggleSound()}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
              soundOn
                ? 'bg-slate-800 text-slate-300 border-slate-700'
                : 'bg-rose-950/40 text-rose-300 border-rose-800/50'
            }`}
            title="Efectos de sonido"
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5 text-rose-400" />}
            <span>Sonido {soundOn ? 'ON' : 'OFF'}</span>
          </button>

          {/* Voice Toggle */}
          <button
            id="ingame-voice-toggle-btn"
            type="button"
            onClick={() => speechEngine.toggleVoice()}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
              voiceOn
                ? 'bg-cyan-950/60 text-cyan-200 border-cyan-700/60'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Lectura por voz (SpeechSynthesis)"
          >
            {voiceOn ? <Mic className="w-3.5 h-3.5 text-cyan-400" /> : <MicOff className="w-3.5 h-3.5 text-slate-500" />}
            <span>Voz: {voiceOn ? 'ACTIVADA' : 'DESACTIVADA'}</span>
          </button>
        </div>

        {/* Cancel speech button if currently speaking */}
        {isSpeaking && (
          <button
            id="btn-stop-speech"
            type="button"
            onClick={() => speechEngine.stop()}
            className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-rose-950/70 border border-rose-700 text-rose-300 text-[11px] font-bold animate-pulse"
            title="Detener voz"
          >
            <Square className="w-3 h-3 fill-rose-400" />
            <span>Detener voz</span>
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700/60">
        <div
          className="bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 h-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Question Card */}
      <div className="relative overflow-hidden bg-slate-900/90 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
        {/* Category & Level Badges */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 border border-slate-700 text-slate-200">
            <span>{currentCategory?.emoji || '⚡'}</span>
            <span>{currentCategory?.name || 'Cultura General'}</span>
          </span>

          <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700">
            Nivel: {level}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-lg sm:text-2xl font-black text-white leading-snug tracking-tight mb-4">
          {currentQ.question}
        </h2>

        {/* VOICE BUTTONS: "🔊 Escuchar pregunta" and "📋 Escuchar opciones" */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <button
            id="btn-listen-question"
            type="button"
            onClick={() => {
              soundFx.playClick();
              speechEngine.speakQuestion(currentQ.question, currentIndex + 1);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/70 border border-cyan-600/60 text-cyan-200 font-bold text-xs transition-all active:scale-95 shadow-sm shadow-cyan-950"
            title="Escuchar la pregunta en voz alta"
          >
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span>🔊 Escuchar pregunta</span>
          </button>

          <button
            id="btn-listen-options"
            type="button"
            onClick={() => {
              soundFx.playClick();
              speechEngine.speakOptions(currentQ.options);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-bold text-xs transition-all active:scale-95"
            title="Escuchar las opciones A, B, C, D"
          >
            <ListOrdered className="w-4 h-4 text-amber-400" />
            <span>📋 Escuchar opciones</span>
          </button>

          <button
            id="btn-voice-settings-game"
            type="button"
            onClick={() => setIsVoiceModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-all"
            title="Ajustar volumen y configuración de voz"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Voz ({Math.round(voiceVolume * 100)}%)</span>
          </button>

          {isSpeaking && (
            <span className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Narrando...
            </span>
          )}
        </div>

        {/* 4 Multiple Choice Options */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          {currentQ.options.map((optionText, optIndex) => {
            const isThisSelected = selectedOption === optIndex;
            const isThisCorrect = optIndex === currentQ.correctIndex;

            let buttonStyles =
              'bg-slate-800/70 border-slate-700/80 text-slate-100 hover:bg-slate-750 hover:border-slate-600';
            let badgeStyles = 'bg-slate-700 text-slate-300';

            if (isAnswered) {
              if (isThisCorrect) {
                buttonStyles =
                  'bg-emerald-950/70 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/50';
                badgeStyles = 'bg-emerald-500 text-slate-950 font-black';
              } else if (isThisSelected && !isThisCorrect) {
                buttonStyles =
                  'bg-rose-950/70 border-rose-500 text-rose-100 ring-2 ring-rose-500/50';
                badgeStyles = 'bg-rose-500 text-white font-black';
              } else {
                buttonStyles = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={optIndex}
                id={`option-btn-${optIndex}`}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(optIndex)}
                className={`w-full text-left p-4 rounded-2xl border font-bold text-sm sm:text-base transition-all flex items-center justify-between gap-3 shadow-md active:scale-[0.99] ${buttonStyles}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs sm:text-sm shrink-0 transition-colors ${badgeStyles}`}
                  >
                    {optionLetters[optIndex]}
                  </span>
                  <span className="leading-snug">{optionText}</span>
                </div>

                {isAnswered && (
                  <div className="shrink-0">
                    {isThisCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    {isThisSelected && !isThisCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Post-Answer Feedback & Educational Explanation */}
        {isAnswered && (
          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-4 animate-fade-in">
            {/* Feedback message */}
            <div
              className={`flex items-center justify-between p-3.5 rounded-2xl border font-bold text-sm sm:text-base ${
                isTimeOut
                  ? 'bg-rose-950/40 border-rose-800/50 text-rose-300'
                  : motivationalMsg.isPositive
                  ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-800/50 text-rose-300'
              }`}
            >
              <div className="flex items-center gap-2">
                {isTimeOut ? (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                ) : motivationalMsg.isPositive ? (
                  <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <span>
                  {isTimeOut ? '⏰ ¡Tiempo agotado!' : motivationalMsg.text}
                </span>
              </div>

              {motivationalMsg.pointsGained && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  +{motivationalMsg.pointsGained} pts
                </span>
              )}
            </div>

            {/* Educational Explanation Box */}
            <div className="bg-slate-950/70 border-l-4 border-cyan-400 rounded-r-2xl p-4 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-inner">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 font-black text-cyan-300">
                  <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>¿SABÍAS QUE...?</span>
                </div>
                <button
                  id="btn-listen-explanation"
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    speechEngine.speakExplanation(currentQ.explanation);
                  }}
                  className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition-colors"
                  title="Escuchar dato curioso"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Escuchar dato</span>
                </button>
              </div>
              <p>{currentQ.explanation}</p>
            </div>

            {/* Next Question Button */}
            <button
              id="btn-next-question"
              type="button"
              onClick={handleNextQuestion}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg tracking-wide shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>{currentIndex === questions.length - 1 ? 'VER RESULTADOS DE LA PARTIDA' : 'SIGUIENTE PREGUNTA'}</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}
      </div>

      {/* Quit match option */}
      <div className="text-center pt-1">
        <button
          id="btn-quit-match"
          type="button"
          onClick={() => {
            if (window.confirm('¿Seguro que quieres salir de esta partida? Tu progreso actual se perderá.')) {
              soundFx.playClick();
              speechEngine.stop();
              onQuitToHome();
            }
          }}
          className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          Cancelar partida y volver al inicio
        </button>
      </div>

      {/* Voice Settings Modal */}
      <VoiceSettingsModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
    </div>
  );
};
