import React, { useState, useEffect } from 'react';
import { Play, BookOpen, Layers, Trophy, Sparkles, Download, Zap, Volume2, VolumeX, Mic, MicOff, Music, Sliders } from 'lucide-react';
import { DifficultyLevel, Category } from '../types';
import { soundFx, ambientMusic } from '../utils/audio';
import { speechEngine } from '../utils/speech';
import { VoiceSettingsModal } from './VoiceSettingsModal';

interface HomeScreenProps {
  onStartGame: () => void;
  onOpenInstructions: () => void;
  onOpenCategories: () => void;
  onOpenRecords: () => void;
  onExportGame: () => void;
  currentLevel: DifficultyLevel;
  onSelectLevel: (level: DifficultyLevel) => void;
  selectedCategory: string;
  categories: Category[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartGame,
  onOpenInstructions,
  onOpenCategories,
  onOpenRecords,
  onExportGame,
  currentLevel,
  onSelectLevel,
  selectedCategory,
  categories,
}) => {
  const currentCategoryObj = categories.find((c) => c.id === selectedCategory);
  const [soundEnabled, setSoundEnabled] = useState(soundFx.isEnabled());
  const [musicEnabled, setMusicEnabled] = useState(ambientMusic.isEnabled());
  const [voiceEnabled, setVoiceEnabled] = useState(speechEngine.isEnabled());
  const [voiceVolume, setVoiceVolume] = useState(speechEngine.getVolume());
  const [voiceName, setVoiceName] = useState(speechEngine.getSelectedVoiceName());
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  useEffect(() => {
    const unsubS = soundFx.subscribe((en) => setSoundEnabled(en));
    const unsubM = ambientMusic.subscribe((en) => setMusicEnabled(en));
    const unsubV = speechEngine.subscribe((en) => setVoiceEnabled(en));
    const unsubVol = speechEngine.subscribeVolume((vol) => setVoiceVolume(vol));
    const unsubVoiceChange = speechEngine.subscribeVoiceChange(() => {
      setVoiceName(speechEngine.getSelectedVoiceName());
    });
    return () => {
      unsubS();
      unsubM();
      unsubV();
      unsubVol();
      unsubVoiceChange();
    };
  }, []);

  const levelInfo = {
    facil: {
      name: 'Fácil',
      badge: 'Nivel 1',
      desc: 'Preguntas directas y tiempo cómodo para entrar en calor',
      color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300',
      activeColor: 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-300 shadow-lg shadow-emerald-500/30',
    },
    intermedio: {
      name: 'Intermedio',
      badge: 'Nivel 2',
      desc: 'El balance ideal para desafiar tus conocimientos generales',
      color: 'border-amber-500/50 bg-amber-500/10 text-amber-300',
      activeColor: 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 shadow-lg shadow-amber-500/30',
    },
    dificil: {
      name: 'Difícil',
      badge: 'Nivel 3',
      desc: 'Para auténticas mentes brillantes: acertijos y datos profundos',
      color: 'border-rose-500/50 bg-rose-500/10 text-rose-300',
      activeColor: 'bg-rose-500 text-slate-950 ring-2 ring-rose-300 shadow-lg shadow-rose-500/30',
    },
  };

  const handleStart = () => {
    soundFx.playGameStart();
    if (speechEngine.isEnabled()) {
      speechEngine.speakGameStart();
    }
    if (ambientMusic.isEnabled()) {
      ambientMusic.start();
    }
    onStartGame();
  };

  const handleButtonClick = (action: () => void) => {
    soundFx.playClick();
    action();
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4 sm:gap-5 py-2">
      {/* Hero Badge & Main Title */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-bold tracking-wide mb-3">
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          JUEGO EDUCATIVO Y CONTRARRELOJ
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
          RETO <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">RELÁMPAGO</span>
        </h1>

        <p className="text-base sm:text-xl font-semibold text-cyan-300 italic mb-5">
          “¿Qué tan rápido puedes pensar?”
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-300">
          <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
            ⏱️ 15s por pregunta
          </span>
          <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
            🔥 Bonos de racha
          </span>
          <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
            🎙️ Presentador Juvenil
          </span>
          <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
            🎵 Música Concurso
          </span>
        </div>
      </div>

      {/* AUDIO, VOICE & MUSIC CONTROLS PANEL */}
      <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-300 uppercase flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-cyan-400" />
            CONTROLES INDEPENDIENTES DE AUDIO:
          </span>
          <button
            id="open-voice-settings-home-btn"
            type="button"
            onClick={() => setIsVoiceModalOpen(true)}
            className="text-xs text-cyan-300 hover:text-cyan-200 font-bold flex items-center gap-1 bg-cyan-500/15 border border-cyan-400/30 px-2.5 py-1 rounded-full hover:bg-cyan-500/25 transition-all"
            title="Abrir ajustes de voz, música y efectos"
          >
            <Sliders className="w-3.5 h-3.5" />
            Ajustes
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* 1. Sound Effects toggle */}
          <button
            id="home-sound-toggle-btn"
            type="button"
            onClick={() => soundFx.toggleSound()}
            className={`flex flex-col justify-between p-3 rounded-xl border transition-all text-left ${
              soundEnabled
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                : 'bg-slate-900/60 border-slate-700 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-amber-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
              <span
                className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                  soundEnabled ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {soundEnabled ? 'ON' : 'OFF'}
              </span>
            </div>
            <span className="text-xs font-bold block">Efectos (SFX)</span>
            <span className="text-[10px] text-slate-400">Aciertos y tiempo</span>
          </button>

          {/* 2. Ambient Music toggle */}
          <button
            id="home-music-toggle-btn"
            type="button"
            onClick={() => ambientMusic.toggleMusic()}
            className={`flex flex-col justify-between p-3 rounded-xl border transition-all text-left ${
              musicEnabled
                ? 'bg-purple-500/15 border-purple-500/40 text-purple-200'
                : 'bg-slate-900/60 border-slate-700 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <Music className={`w-4 h-4 ${musicEnabled ? 'text-purple-400' : 'text-slate-500'}`} />
              <span
                className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                  musicEnabled ? 'bg-purple-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {musicEnabled ? 'ON' : 'OFF'}
              </span>
            </div>
            <span className="text-xs font-bold block">Música Concurso</span>
            <span className="text-[10px] text-slate-400">Pad y pulso a 106 BPM</span>
          </button>

          {/* 3. Voice SpeechSynthesis toggle */}
          <button
            id="home-voice-toggle-btn"
            type="button"
            onClick={() => speechEngine.toggleVoice()}
            className={`flex flex-col justify-between p-3 rounded-xl border transition-all text-left ${
              voiceEnabled
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200'
                : 'bg-slate-900/60 border-slate-700 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              {voiceEnabled ? (
                <Mic className="w-4 h-4 text-cyan-400" />
              ) : (
                <MicOff className="w-4 h-4 text-slate-500" />
              )}
              <span
                className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                  voiceEnabled ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {voiceEnabled ? 'ON' : 'OFF'}
              </span>
            </div>
            <span className="text-xs font-bold block">Voz Presentador</span>
            <span className="text-[10px] text-slate-400">
              {voiceEnabled ? 'Momentos clave' : 'Silenciada'}
            </span>
          </button>
        </div>

        <p className="text-[11px] text-slate-400 text-center">
          La voz solo interviene en momentos clave (inicio, aciertos, fallos, 5s finales, subida de nivel y final).
        </p>
      </div>

      {/* Difficulty Level Selection */}
      <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-300 uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            1. SELECCIONA TU NIVEL:
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-700 text-slate-300">
            {levelInfo[currentLevel].badge}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {(['facil', 'intermedio', 'dificil'] as DifficultyLevel[]).map((lvl) => {
            const isSelected = currentLevel === lvl;
            const item = levelInfo[lvl];
            return (
              <button
                key={lvl}
                id={`level-btn-${lvl}`}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onSelectLevel(lvl);
                }}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl font-bold transition-all text-center border ${
                  isSelected
                    ? item.activeColor
                    : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <span className="text-sm sm:text-base">{item.name}</span>
                <span className={`text-[10px] sm:text-xs font-medium mt-0.5 ${isSelected ? 'text-slate-900/90 font-semibold' : 'text-slate-400'}`}>
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center italic">
          {levelInfo[currentLevel].desc}
        </p>
      </div>

      {/* Category Selection Summary Box */}
      <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl shrink-0">
            {currentCategoryObj ? currentCategoryObj.emoji : '🌐'}
          </div>
          <div>
            <span className="text-xs uppercase font-bold text-slate-400 block">CATEGORÍA:</span>
            <span className="font-bold text-base text-white">
              {currentCategoryObj ? currentCategoryObj.name : 'Todas las categorías (Mixtas)'}
            </span>
          </div>
        </div>

        <button
          id="btn-categories-select"
          type="button"
          onClick={() => handleButtonClick(onOpenCategories)}
          className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-bold bg-slate-700 hover:bg-slate-600 text-cyan-300 rounded-xl border border-slate-600 transition-colors shrink-0"
        >
          Elegir otra
        </button>
      </div>

      {/* Main Action Buttons */}
      <div className="flex flex-col gap-3">
        {/* Play Button */}
        <button
          id="btn-play-game"
          type="button"
          onClick={handleStart}
          className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xl sm:text-2xl tracking-wide shadow-xl shadow-amber-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
        >
          <Play className="w-6 h-6 fill-slate-950 group-hover:scale-110 transition-transform" />
          ¡JUGAR AHORA!
        </button>

        {/* Secondary Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            id="btn-instructions"
            type="button"
            onClick={() => handleButtonClick(onOpenInstructions)}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2 hover:border-slate-600"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            INSTRUCCIONES
          </button>

          <button
            id="btn-categories"
            type="button"
            onClick={() => handleButtonClick(onOpenCategories)}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2 hover:border-slate-600"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            CATEGORÍAS
          </button>

          <button
            id="btn-records"
            type="button"
            onClick={() => handleButtonClick(onOpenRecords)}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2 hover:border-slate-600"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            MEJORES RESULTADOS
          </button>
        </div>

        {/* Standalone Export Button */}
        <button
          id="btn-export-bottom"
          type="button"
          onClick={() => handleButtonClick(onExportGame)}
          className="w-full py-3 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2 text-center mt-1"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          DESCARGAR / EXPORTAR JUEGO (100% autónomo para jugar sin conexión)
        </button>
      </div>

      <div className="text-center text-[11px] text-slate-500 pb-2">
        🔒 Sin registro de usuarios • Sin datos personales • Sin costos • 100% Seguro y educativo
      </div>

      {/* Voice Settings Modal */}
      <VoiceSettingsModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
    </div>
  );
};
