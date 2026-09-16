import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Music,
  X,
  Play,
  Square,
  Sparkles,
  Check,
  RefreshCw,
  Sliders,
} from 'lucide-react';
import { speechEngine, VoiceOptionInfo } from '../utils/speech';
import { soundFx, ambientMusic } from '../utils/audio';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'voice' | 'music' | 'sfx'>('voice');
  const [voiceEnabled, setVoiceEnabled] = useState(speechEngine.isEnabled());
  const [volume, setVolume] = useState(speechEngine.getVolume());
  const [speechRate, setSpeechRate] = useState(speechEngine.getSpeechRate());
  const [availableVoices, setAvailableVoices] = useState<VoiceOptionInfo[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | null>(speechEngine.getSelectedVoiceURI());
  const [isSpeaking, setIsSpeaking] = useState(speechEngine.isSpeaking());

  const [soundEnabled, setSoundEnabled] = useState(soundFx.isEnabled());
  const [musicEnabled, setMusicEnabled] = useState(ambientMusic.isEnabled());
  const [musicVolume, setMusicVolume] = useState(ambientMusic.getVolume());

  useEffect(() => {
    const unsubVoice = speechEngine.subscribe((en) => setVoiceEnabled(en));
    const unsubVol = speechEngine.subscribeVolume((vol) => setVolume(vol));
    const unsubSpeaking = speechEngine.subscribeSpeaking((sp) => setIsSpeaking(sp));
    const unsubChange = speechEngine.subscribeVoiceChange(() => {
      setAvailableVoices(speechEngine.getAvailableVoices());
      setSelectedVoiceURI(speechEngine.getSelectedVoiceURI());
    });

    const unsubSound = soundFx.subscribe((en) => setSoundEnabled(en));
    const unsubMusic = ambientMusic.subscribe((en) => setMusicEnabled(en));
    const unsubMusicVol = ambientMusic.subscribeVolume((vol) => setMusicVolume(vol));

    setAvailableVoices(speechEngine.getAvailableVoices());
    setSelectedVoiceURI(speechEngine.getSelectedVoiceURI());

    return () => {
      unsubVoice();
      unsubVol();
      unsubSpeaking();
      unsubChange();
      unsubSound();
      unsubMusic();
      unsubMusicVol();
    };
  }, []);

  if (!isOpen) return null;

  const handleToggleVoice = () => {
    speechEngine.toggleVoice();
  };

  const handleVolumeChange = (newVol: number) => {
    speechEngine.setVolume(newVol);
  };

  const handleRateChange = (rate: number) => {
    setSpeechRate(rate);
    speechEngine.setSpeechRate(rate);
  };

  const handleSelectVoice = (uri: string) => {
    speechEngine.setSelectedVoice(uri);
    setSelectedVoiceURI(uri);
    speechEngine.testVoicePreview();
  };

  const handleResetBestVoice = () => {
    speechEngine.resetToBestVoice();
    setSelectedVoiceURI(speechEngine.getSelectedVoiceURI());
  };

  const handleTestVoice = () => {
    if (isSpeaking) {
      speechEngine.stop();
    } else {
      speechEngine.testVoicePreview();
    }
  };

  return (
    <div
      id="voice-settings-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="voice-settings-modal"
        className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-slate-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                Ajustes de Audio y Ambientación
              </h2>
              <p className="text-xs text-slate-400">
                Controla de forma independiente la voz, la música y los efectos sonoros
              </p>
            </div>
          </div>
          <button
            id="close-voice-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            title="Cerrar ajustes"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Settings Category Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950/70 border border-slate-800 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('voice')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'voice'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Voz ({voiceEnabled ? 'ON' : 'OFF'})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('music')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'music'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Música ({musicEnabled ? 'ON' : 'OFF'})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sfx')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'sfx'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Efectos ({soundEnabled ? 'ON' : 'OFF'})</span>
          </button>
        </div>

        {/* TAB 1: VOZ DEL PRESENTADOR */}
        {activeTab === 'voice' && (
          <div className="flex flex-col gap-3.5">
            {/* Toggle Activación Principal */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    voiceEnabled
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {voiceEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">Voz del Presentador</span>
                  <span className="text-xs text-slate-400 block">
                    {voiceEnabled
                      ? 'Intervenciones oportunas en momentos clave del concurso'
                      : 'Voz silenciada completamente'}
                  </span>
                </div>
              </div>

              <button
                id="modal-toggle-voice-btn"
                type="button"
                onClick={handleToggleVoice}
                className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${
                  voiceEnabled
                    ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {voiceEnabled ? 'ACTIVADA' : 'DESACTIVADA'}
              </button>
            </div>

            {/* Volumen de Voz */}
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  Volumen de la Voz
                </span>
                <span className="text-xs font-black text-cyan-300">
                  {Math.round(volume * 100)}%
                </span>
              </div>
              <input
                id="voice-volume-range"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                disabled={!voiceEnabled}
                className="w-full accent-cyan-400 cursor-pointer disabled:opacity-40"
              />
            </div>

            {/* Ritmo de la Narración */}
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Ritmo del Presentador
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { rate: 0.92, label: 'Tranquilo', sub: 'Pausado' },
                  { rate: 1.0, label: 'Natural', sub: 'Recomendado' },
                  { rate: 1.08, label: 'Dinámico', sub: 'Enérgico' },
                ].map((item) => (
                  <button
                    key={item.rate}
                    onClick={() => handleRateChange(item.rate)}
                    disabled={!voiceEnabled}
                    className={`py-2 px-2 rounded-xl border text-center transition-all ${
                      Math.abs(speechRate - item.rate) < 0.04
                        ? 'bg-amber-400/20 border-amber-400/60 text-amber-200'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                    } disabled:opacity-40`}
                  >
                    <span className="text-xs font-bold block">{item.label}</span>
                    <span className="text-[10px] text-slate-400 block">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Voces en Español */}
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Voz Seleccionada en Español:
                </span>
                <button
                  onClick={handleResetBestVoice}
                  className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  <RefreshCw className="w-3 h-3" />
                  Auto-seleccionar
                </button>
              </div>

              {availableVoices.length === 0 ? (
                <div className="p-2.5 bg-slate-900/60 rounded-xl text-center text-xs text-slate-400">
                  Cargando voces del sistema...
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {availableVoices.map((v, idx) => {
                    const isSelected = selectedVoiceURI === v.voiceURI;
                    return (
                      <button
                        key={v.voiceURI || idx}
                        type="button"
                        onClick={() => handleSelectVoice(v.voiceURI)}
                        disabled={!voiceEnabled}
                        className={`w-full flex items-center justify-between p-2 rounded-xl border text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400/60 text-white'
                            : 'bg-slate-900/60 border-slate-700/70 text-slate-300 hover:bg-slate-800/80'
                        } disabled:opacity-40`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold ${
                              isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {isSelected ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : idx + 1}
                          </div>
                          <span className="truncate font-semibold">{v.label}</span>
                        </div>
                        {idx === 0 && (
                          <span className="text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0">
                            ★ Recomendada
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Botón de Prueba */}
            <button
              id="test-voice-btn"
              type="button"
              onClick={handleTestVoice}
              disabled={!voiceEnabled}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                isSpeaking
                  ? 'bg-rose-600/30 border border-rose-500 text-rose-200'
                  : 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/30'
              } disabled:opacity-40`}
            >
              {isSpeaking ? (
                <>
                  <Square className="w-4 h-4 fill-rose-300" />
                  Detener Prueba de Voz
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-cyan-300" />
                  Escuchar Frase de Prueba
                </>
              )}
            </button>
          </div>
        )}

        {/* TAB 2: MÚSICA AMBIENTAL DE CONCURSO */}
        {activeTab === 'music' && (
          <div className="flex flex-col gap-3.5">
            {/* Toggle Música */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    musicEnabled
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">Música de Fondo</span>
                  <span className="text-xs text-slate-400 block">
                    {musicEnabled
                      ? 'Atmósfera moderna de concurso de televisión'
                      : 'Música ambiental desactivada'}
                  </span>
                </div>
              </div>

              <button
                id="modal-toggle-music-btn"
                type="button"
                onClick={() => ambientMusic.toggleMusic()}
                className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${
                  musicEnabled
                    ? 'bg-purple-400 text-slate-950 shadow-md shadow-purple-500/20'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {musicEnabled ? 'ACTIVADA' : 'DESACTIVADA'}
              </button>
            </div>

            {/* Slider de Volumen Música */}
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-purple-400" />
                  Volumen de Música de Fondo
                </span>
                <span className="text-xs font-black text-purple-300">
                  {Math.round(musicVolume * 100)}%
                </span>
              </div>
              <input
                id="music-volume-range"
                type="range"
                min="0"
                max="0.5"
                step="0.02"
                value={musicVolume}
                onChange={(e) => ambientMusic.setVolume(parseFloat(e.target.value))}
                disabled={!musicEnabled}
                className="w-full accent-purple-400 cursor-pointer disabled:opacity-40"
              />
              <span className="text-[11px] text-slate-400">
                Sintetizada en tiempo real con Web Audio API: acordes cálidos y pulso a 106 BPM sin saturar la pantalla.
              </span>
            </div>

            {/* Botón de Escuchar / Detener Música */}
            <button
              type="button"
              onClick={() => {
                if (ambientMusic.isCurrentlyPlaying()) {
                  ambientMusic.stop();
                } else {
                  ambientMusic.start();
                }
              }}
              disabled={!musicEnabled}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-purple-500/20 border border-purple-400/50 text-purple-200 hover:bg-purple-500/30 transition-all disabled:opacity-40"
            >
              {ambientMusic.isCurrentlyPlaying() ? (
                <>
                  <Square className="w-4 h-4 fill-purple-300" />
                  Pausar Música de Fondo
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-purple-300" />
                  Probar Música Ambiental
                </>
              )}
            </button>
          </div>
        )}

        {/* TAB 3: EFECTOS DE SONIDO (SFX) */}
        {activeTab === 'sfx' && (
          <div className="flex flex-col gap-3.5">
            {/* Toggle Sonido */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    soundEnabled
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">Efectos de Sonido</span>
                  <span className="text-xs text-slate-400 block">
                    {soundEnabled
                      ? 'Sonidos breves para aciertos, rachas y selecciones'
                      : 'Efectos sonoros desactivados'}
                  </span>
                </div>
              </div>

              <button
                id="modal-toggle-sound-btn"
                type="button"
                onClick={() => soundFx.toggleSound()}
                className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${
                  soundEnabled
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {soundEnabled ? 'ACTIVADOS' : 'DESACTIVADOS'}
              </button>
            </div>

            {/* Test Buttons for Sound Effects */}
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-300">
                Probar Efectos Sintetizados:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => soundFx.playCorrect()}
                  disabled={!soundEnabled}
                  className="py-2 px-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold hover:bg-emerald-500/30 disabled:opacity-40 text-left flex items-center justify-between"
                >
                  <span>Respuesta Correcta</span>
                  <Play className="w-3.5 h-3.5 fill-emerald-300" />
                </button>

                <button
                  type="button"
                  onClick={() => soundFx.playLevelUp()}
                  disabled={!soundEnabled}
                  className="py-2 px-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/30 disabled:opacity-40 text-left flex items-center justify-between"
                >
                  <span>Subir de Nivel / Racha</span>
                  <Play className="w-3.5 h-3.5 fill-amber-300" />
                </button>

                <button
                  type="button"
                  onClick={() => soundFx.playWrong()}
                  disabled={!soundEnabled}
                  className="py-2 px-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold hover:bg-rose-500/30 disabled:opacity-40 text-left flex items-center justify-between"
                >
                  <span>Respuesta Incorrecta</span>
                  <Play className="w-3.5 h-3.5 fill-rose-300" />
                </button>

                <button
                  type="button"
                  onClick={() => soundFx.playTick()}
                  disabled={!soundEnabled}
                  className="py-2 px-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 disabled:opacity-40 text-left flex items-center justify-between"
                >
                  <span>Tic Tac Reloj (5s)</span>
                  <Play className="w-3.5 h-3.5 fill-cyan-300" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs hover:brightness-110 transition-all shadow-md shadow-amber-500/20"
          >
            Guardar y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
