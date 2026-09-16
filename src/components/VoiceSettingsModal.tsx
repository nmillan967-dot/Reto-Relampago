import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Play,
  Square,
  Sparkles,
  Check,
  RefreshCw,
  Sliders,
} from 'lucide-react';
import { speechEngine, VoiceOptionInfo } from '../utils/speech';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({ isOpen, onClose }) => {
  const [voiceEnabled, setVoiceEnabled] = useState(speechEngine.isEnabled());
  const [volume, setVolume] = useState(speechEngine.getVolume());
  const [speechRate, setSpeechRate] = useState(speechEngine.getSpeechRate());
  const [availableVoices, setAvailableVoices] = useState<VoiceOptionInfo[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | null>(speechEngine.getSelectedVoiceURI());
  const [isSpeaking, setIsSpeaking] = useState(speechEngine.isSpeaking());

  useEffect(() => {
    const unsubVoice = speechEngine.subscribe((en) => setVoiceEnabled(en));
    const unsubVol = speechEngine.subscribeVolume((vol) => setVolume(vol));
    const unsubSpeaking = speechEngine.subscribeSpeaking((sp) => setIsSpeaking(sp));
    const unsubChange = speechEngine.subscribeVoiceChange(() => {
      setAvailableVoices(speechEngine.getAvailableVoices());
      setSelectedVoiceURI(speechEngine.getSelectedVoiceURI());
    });

    setAvailableVoices(speechEngine.getAvailableVoices());
    setSelectedVoiceURI(speechEngine.getSelectedVoiceURI());

    return () => {
      unsubVoice();
      unsubVol();
      unsubSpeaking();
      unsubChange();
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
                Ajustes de Voz del Presentador
              </h2>
              <p className="text-xs text-slate-400">
                Personaliza la narración juvenil para la mejor experiencia auditiva
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

        {/* 1. Toggle Activación Principal */}
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
              <span className="text-sm font-bold text-white block">Narración por Voz</span>
              <span className="text-xs text-slate-400 block">
                {voiceEnabled
                  ? 'El presentador narrará preguntas y animará tus aciertos'
                  : 'Voz silenciada durante toda la partida'}
              </span>
            </div>
          </div>
          <button
            id="modal-toggle-voice-btn"
            onClick={handleToggleVoice}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all ${
              voiceEnabled
                ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20 hover:bg-cyan-300'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {voiceEnabled ? 'ACTIVADA' : 'DESACTIVADA'}
          </button>
        </div>

        {/* 2. Control de Volumen */}
        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Volume2 className="w-4 h-4" />
              Volumen de la Voz
            </span>
            <span className="text-white font-black">{Math.round(volume * 100)}%</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleVolumeChange(0)}
              className="text-slate-400 hover:text-white transition-colors"
              title="Silenciar voz"
            >
              <VolumeX className="w-4 h-4" />
            </button>
            <input
              id="voice-volume-slider"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              disabled={!voiceEnabled}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg cursor-pointer disabled:opacity-40"
            />
            <button
              onClick={() => handleVolumeChange(1.0)}
              className="text-slate-400 hover:text-white transition-colors"
              title="Volumen al máximo"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Presets rápidos de volumen */}
          <div className="flex items-center justify-between gap-1.5 pt-1">
            {[0.25, 0.5, 0.75, 1.0].map((preset) => (
              <button
                key={preset}
                onClick={() => handleVolumeChange(preset)}
                disabled={!voiceEnabled}
                className={`flex-1 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  Math.abs(volume - preset) < 0.05
                    ? 'bg-cyan-500/25 border border-cyan-400/50 text-cyan-200'
                    : 'bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-slate-200'
                } disabled:opacity-40`}
              >
                {Math.round(preset * 100)}%
              </button>
            ))}
          </div>
        </div>

        {/* 3. Ritmo de la Narración */}
        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col gap-2.5">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Ritmo de Presentador
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
                className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                  Math.abs(speechRate - item.rate) < 0.04
                    ? 'bg-amber-400/20 border-amber-400/60 text-amber-200 shadow-sm shadow-amber-400/10'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                } disabled:opacity-40`}
              >
                <span className="text-xs font-bold block">{item.label}</span>
                <span className="text-[10px] text-slate-400 block">{item.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Selector Inteligente de Voz en Español */}
        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Voces en Español Detectadas en tu Dispositivo:
            </span>
            <button
              onClick={handleResetBestVoice}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
              title="Restaurar mejor voz recomendada"
            >
              <RefreshCw className="w-3 h-3" />
              Auto-seleccionar mejor voz
            </button>
          </div>

          {availableVoices.length === 0 ? (
            <div className="p-3 bg-slate-900/60 rounded-xl text-center text-xs text-slate-400">
              Cargando voces del navegador... Si tarda, el navegador usará la voz nativa en español del sistema operativo.
            </div>
          ) : (
            <div className="flex flex-col gap-1.5 max-h-44 overflow-y-auto pr-1">
              {availableVoices.map((v, idx) => {
                const isSelected = selectedVoiceURI === v.voiceURI;
                const isTopRanked = idx === 0;

                return (
                  <button
                    key={v.voiceURI || idx}
                    type="button"
                    onClick={() => handleSelectVoice(v.voiceURI)}
                    disabled={!voiceEnabled}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400/60 text-white shadow-sm shadow-cyan-500/15'
                        : 'bg-slate-900/60 border-slate-700/70 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    } disabled:opacity-40`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                          isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isSelected ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold truncate block">{v.label}</span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <span>{v.lang}</span>
                          {isTopRanked && (
                            <span className="text-amber-300 bg-amber-400/20 px-1.5 py-0.2 rounded font-bold">
                              ★ Recomendada
                            </span>
                          )}
                          {v.isNatural && (
                            <span className="text-emerald-300 bg-emerald-400/20 px-1.5 py-0.2 rounded font-medium">
                              Natural / Neural
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 5. Botón de Prueba y Cierre */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            id="test-voice-btn"
            type="button"
            onClick={handleTestVoice}
            disabled={!voiceEnabled}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
              isSpeaking
                ? 'bg-rose-600/30 border border-rose-500 text-rose-200 hover:bg-rose-600/40'
                : 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/30'
            } disabled:opacity-40`}
          >
            {isSpeaking ? (
              <>
                <Square className="w-4 h-4 fill-rose-300" />
                Detener Prueba
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-cyan-300" />
                Probar Voz de Presentador
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white transition-colors"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
