import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic, MicOff, Music, Zap, Download, Sliders } from 'lucide-react';
import { soundFx, ambientMusic } from '../utils/audio';
import { speechEngine } from '../utils/speech';
import { downloadStandaloneHtml } from '../utils/exportHtml';
import { VoiceSettingsModal } from './VoiceSettingsModal';

interface HeaderProps {
  onGoHome?: () => void;
  showHomeBtn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onGoHome, showHomeBtn }) => {
  const [soundOn, setSoundOn] = useState<boolean>(soundFx.isEnabled());
  const [musicOn, setMusicOn] = useState<boolean>(ambientMusic.isEnabled());
  const [voiceOn, setVoiceOn] = useState<boolean>(speechEngine.isEnabled());
  const [volume, setVolume] = useState<number>(speechEngine.getVolume());
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsubSound = soundFx.subscribe((enabled) => setSoundOn(enabled));
    const unsubMusic = ambientMusic.subscribe((enabled) => setMusicOn(enabled));
    const unsubVoice = speechEngine.subscribe((enabled) => setVoiceOn(enabled));
    const unsubVol = speechEngine.subscribeVolume((vol) => setVolume(vol));
    return () => {
      unsubSound();
      unsubMusic();
      unsubVoice();
      unsubVol();
    };
  }, []);

  const handleToggleSound = () => {
    soundFx.toggleSound();
  };

  const handleToggleMusic = () => {
    ambientMusic.toggleMusic();
  };

  const handleToggleVoice = () => {
    speechEngine.toggleVoice();
  };

  return (
    <>
      <header className="w-full max-w-2xl mx-auto flex items-center justify-between py-4 px-2 sm:px-0">
        <button
          id="header-brand-btn"
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
          title="Reto Relámpago - Inicio"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 fill-slate-950" />
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
              RETO RELÁMPAGO
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                PRO
              </span>
            </span>
            <p className="text-xs text-cyan-400 font-medium hidden sm:block">
              ¿Qué tan rápido puedes pensar?
            </p>
          </div>
        </button>

        {/* Audio & Voice Independent Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Toggle Sound */}
          <button
            id="sound-toggle-btn"
            type="button"
            onClick={handleToggleSound}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              soundOn
                ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-rose-950/40 border-rose-800/50 text-rose-300 hover:bg-rose-900/50'
            }`}
            title={soundOn ? 'Desactivar efectos de sonido' : 'Activar efectos de sonido'}
            aria-label={soundOn ? 'Silenciar sonidos' : 'Activar sonidos'}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" />}
            <span className="hidden xs:inline">{soundOn ? 'SFX ON' : 'SFX OFF'}</span>
          </button>

          {/* Toggle Ambient Music */}
          <button
            id="music-toggle-btn"
            type="button"
            onClick={handleToggleMusic}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              musicOn
                ? 'bg-purple-950/50 border-purple-700/60 text-purple-200 hover:bg-purple-900/60 shadow-sm'
                : 'bg-slate-900/70 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={musicOn ? 'Desactivar música ambiental de concurso' : 'Activar música ambiental de concurso'}
            aria-label={musicOn ? 'Desactivar música ambiental' : 'Activar música ambiental'}
          >
            <Music className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${musicOn ? 'text-purple-400 animate-pulse' : 'text-slate-500'}`} />
            <span className="hidden xs:inline">{musicOn ? 'Música ON' : 'Música OFF'}</span>
          </button>

          {/* Toggle Voice - Requirement: "Debe existir un control visible: 🔊 Voz: ACTIVADA / DESACTIVADA" */}
          <div className="inline-flex items-center rounded-full bg-slate-800/80 border border-slate-700 p-0.5 shadow-sm">
            <button
              id="voice-toggle-btn"
              type="button"
              onClick={handleToggleVoice}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                voiceOn
                  ? 'bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={voiceOn ? 'Desactivar lectura de voz' : 'Activar lectura de voz'}
              aria-label={voiceOn ? 'Desactivar voz' : 'Activar voz'}
            >
              {voiceOn ? <Mic className="w-3.5 h-3.5 text-cyan-400" /> : <MicOff className="w-3.5 h-3.5 text-slate-500" />}
              <span className="font-bold">
                Voz: {voiceOn ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Voice Settings & Volume button */}
            <button
              id="voice-settings-open-btn"
              type="button"
              onClick={() => setIsVoiceModalOpen(true)}
              className="px-2 py-1 text-slate-400 hover:text-cyan-300 hover:bg-slate-700/60 rounded-full transition-colors flex items-center gap-1 text-[11px]"
              title="Ajustar volumen y seleccionar voz en español"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-bold">{Math.round(volume * 100)}%</span>
            </button>
          </div>

          {/* Export HTML */}
          <button
            id="export-top-btn"
            type="button"
            onClick={downloadStandaloneHtml}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-colors"
            title="Descargar archivo HTML autónomo para jugar sin internet"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar</span>
          </button>

          {showHomeBtn && onGoHome && (
            <button
              id="home-return-btn"
              type="button"
              onClick={onGoHome}
              className="text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Menú
            </button>
          )}
        </div>
      </header>

      {/* Voice Settings Modal */}
      <VoiceSettingsModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
    </>
  );
};
