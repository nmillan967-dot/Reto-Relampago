import React, { useEffect, useState } from 'react';
import {
  RotateCcw,
  Layers,
  Home,
  Download,
  Flame,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  Zap,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Sparkles,
} from 'lucide-react';
import { DifficultyLevel } from '../types';
import { soundFx } from '../utils/audio';
import { speechEngine } from '../utils/speech';
import { triggerConfetti } from '../utils/confetti';
import { downloadStandaloneHtml } from '../utils/exportHtml';

interface FinalScreenProps {
  score: number;
  correctCount: number;
  incorrectCount: number;
  maxStreak: number;
  avgTimeSeconds: number;
  categoryName: string;
  level: DifficultyLevel;
  onPlayAgain: () => void;
  onChangeCategory: () => void;
  onGoHome: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({
  score,
  correctCount,
  incorrectCount,
  maxStreak,
  avgTimeSeconds,
  categoryName,
  level,
  onPlayAgain,
  onChangeCategory,
  onGoHome,
}) => {
  const [soundOn, setSoundOn] = useState(soundFx.isEnabled());
  const [voiceOn, setVoiceOn] = useState(speechEngine.isEnabled());
  const [isSpeaking, setIsSpeaking] = useState(speechEngine.isSpeaking());

  useEffect(() => {
    const unsubS = soundFx.subscribe((en) => setSoundOn(en));
    const unsubV = speechEngine.subscribe((en) => setVoiceOn(en));
    const unsubSpk = speechEngine.subscribeSpeaking((sp) => setIsSpeaking(sp));
    return () => {
      unsubS();
      unsubV();
      unsubSpk();
    };
  }, []);

  const accuracy = Math.round((correctCount / (correctCount + incorrectCount || 1)) * 100);

  // Motivational Classification
  let badgeTitle = '';
  let badgeSubtitle = '';
  let badgeEmoji = '';

  if (accuracy >= 90) {
    badgeTitle = '¡MENTE BRILLANTE!';
    badgeSubtitle = 'Velocidad y precisión descomunal. ¡Un auténtico prodigio mental!';
    badgeEmoji = '⚡🧠';
  } else if (accuracy >= 70) {
    badgeTitle = '¡GRAN RETADOR!';
    badgeSubtitle = 'Excelentes reflejos y gran conocimiento. ¡Estás a nada de la cima!';
    badgeEmoji = '🚀';
  } else if (accuracy >= 50) {
    badgeTitle = '¡VAS POR BUEN CAMINO!';
    badgeSubtitle = 'Buena puntería y concentración. Con un poco más de práctica serás imparable.';
    badgeEmoji = '⭐';
  } else {
    badgeTitle = '¡SIGUE ENTRENANDO TU MENTE!';
    badgeSubtitle = 'El entrenamiento constante crea genios. ¡Vuelve a intentarlo ahora mismo!';
    badgeEmoji = '💪';
  }

  // Trigger audio & voice celebration on load
  useEffect(() => {
    if (accuracy >= 70) {
      soundFx.playVictory();
    } else {
      soundFx.playGameOver();
    }

    if (accuracy >= 50) {
      triggerConfetti();
    }

    // Read final result aloud
    if (speechEngine.isEnabled()) {
      speechEngine.speakFinalSummary({
        badgeTitle,
        score,
        accuracy,
        correctCount,
        maxStreak,
      });
    }

    return () => {
      speechEngine.stop();
    };
  }, [accuracy, badgeTitle, score, correctCount, maxStreak]);

  const handleSpeakSummary = () => {
    soundFx.playClick();
    speechEngine.speakFinalSummary({
      badgeTitle,
      score,
      accuracy,
      correctCount,
      maxStreak,
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4 py-2">
      {/* Victory / Result Card */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-700/80 p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Motivational Classification Banner */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r shadow-lg font-black text-base sm:text-lg mb-3 tracking-wide transform hover:scale-105 transition-transform"
          style={{
            background:
              accuracy >= 90
                ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                : accuracy >= 70
                ? 'linear-gradient(135deg, #38bdf8, #0284c7)'
                : accuracy >= 50
                ? 'linear-gradient(135deg, #34d399, #059669)'
                : 'linear-gradient(135deg, #a78bfa, #7c3aed)',
            color: accuracy < 50 ? '#ffffff' : '#0f172a',
          }}
        >
          <span>{badgeEmoji}</span>
          <span>{badgeTitle}</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-4">
          {badgeSubtitle}
        </p>

        {/* Listen Result Button & Quick Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          <button
            id="btn-listen-final-summary"
            type="button"
            onClick={handleSpeakSummary}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/60 text-cyan-200 font-bold text-xs hover:bg-cyan-900/80 transition-all shadow-md active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span>🔊 Escuchar resultado en voz alta</span>
          </button>

          <button
            id="final-voice-toggle-btn"
            type="button"
            onClick={() => speechEngine.toggleVoice()}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              voiceOn
                ? 'bg-cyan-950/50 border-cyan-600/50 text-cyan-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {voiceOn ? <Mic className="w-3.5 h-3.5 text-cyan-400" /> : <MicOff className="w-3.5 h-3.5 text-slate-500" />}
            <span>Voz: {voiceOn ? 'ACTIVADA' : 'DESACTIVADA'}</span>
          </button>
        </div>

        {/* Total Score Spotlight */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 mb-5 shadow-inner">
          <span className="text-xs uppercase font-bold tracking-widest text-slate-400 block mb-1">
            PUNTAJE FINAL OBTENIDO
          </span>
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-8 h-8 text-amber-400 fill-amber-400" />
            <span className="text-4xl sm:text-6xl font-black text-amber-400 tracking-tight">
              {score}
            </span>
            <span className="text-sm font-bold text-amber-300 self-end mb-2">PTS</span>
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            {categoryName} • Nivel {level.toUpperCase()}
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 text-left">
          {/* Porcentaje de Aciertos */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-xl">
            <span className="text-[10px] sm:text-xs font-bold uppercase text-slate-400 block">
              % Aciertos
            </span>
            <div className="flex items-center gap-1.5 mt-1 font-black text-lg sm:text-xl text-cyan-400">
              <Award className="w-4 h-4" />
              <span>{accuracy}%</span>
            </div>
          </div>

          {/* Respuestas Correctas */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-xl">
            <span className="text-[10px] sm:text-xs font-bold uppercase text-slate-400 block">
              Correctas
            </span>
            <div className="flex items-center gap-1.5 mt-1 font-black text-lg sm:text-xl text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>{correctCount} / 10</span>
            </div>
          </div>

          {/* Respuestas Incorrectas */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-xl">
            <span className="text-[10px] sm:text-xs font-bold uppercase text-slate-400 block">
              Incorrectas
            </span>
            <div className="flex items-center gap-1.5 mt-1 font-black text-lg sm:text-xl text-rose-400">
              <XCircle className="w-4 h-4" />
              <span>{incorrectCount}</span>
            </div>
          </div>

          {/* Racha Máxima */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-xl">
            <span className="text-[10px] sm:text-xs font-bold uppercase text-slate-400 block">
              Racha Máxima
            </span>
            <div className="flex items-center gap-1.5 mt-1 font-black text-lg sm:text-xl text-orange-400">
              <Flame className="w-4 h-4 fill-orange-400" />
              <span>{maxStreak} seguidas</span>
            </div>
          </div>

          {/* Tiempo Promedio */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-xl sm:col-span-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase text-slate-400 block">
              Tiempo Promedio por Pregunta
            </span>
            <div className="flex items-center gap-1.5 mt-1 font-black text-lg sm:text-xl text-indigo-300">
              <Clock className="w-4 h-4" />
              <span>{avgTimeSeconds}s por respuesta</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5">
        {/* Play Again */}
        <button
          id="btn-play-again"
          type="button"
          onClick={() => {
            soundFx.playClick();
            speechEngine.stop();
            onPlayAgain();
          }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-lg tracking-wide shadow-xl shadow-amber-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5 stroke-[2.5]" />
          JUGAR OTRA VEZ
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Change Category */}
          <button
            id="btn-change-cat-final"
            type="button"
            onClick={() => {
              soundFx.playClick();
              speechEngine.stop();
              onChangeCategory();
            }}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            CAMBIAR CATEGORÍA
          </button>

          {/* Return Home */}
          <button
            id="btn-return-home"
            type="button"
            onClick={() => {
              soundFx.playClick();
              speechEngine.stop();
              onGoHome();
            }}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-cyan-400" />
            VOLVER AL INICIO
          </button>
        </div>

        {/* Download Standalone File */}
        <button
          id="btn-export-final"
          type="button"
          onClick={() => {
            soundFx.playClick();
            downloadStandaloneHtml();
          }}
          className="w-full py-3 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2 text-center mt-1"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          DESCARGAR / EXPORTAR JUEGO (Archivo HTML autónomo sin internet)
        </button>
      </div>
    </div>
  );
};
