import React from 'react';
import { X, Trophy, Flame, Clock, Award, Trash2 } from 'lucide-react';
import { GameRecord } from '../types';
import { soundFx } from '../utils/audio';

interface RecordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: GameRecord[];
  onClearRecords: () => void;
}

export const RecordsModal: React.FC<RecordsModalProps> = ({
  isOpen,
  onClose,
  records,
  onClearRecords,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              🏆 Mejores Resultados
            </h2>
            <p className="text-xs sm:text-sm text-amber-400">
              Historial de partidas jugadas en este dispositivo
            </p>
          </div>
          <button
            id="close-records-btn"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto my-4 pr-1 flex flex-col gap-3">
          {records.length === 0 ? (
            <div className="text-center py-10 px-4 bg-slate-800/40 rounded-2xl border border-dashed border-slate-700">
              <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="font-bold text-slate-300 mb-1">Aún no hay partidas registradas</p>
              <p className="text-xs text-slate-500">
                ¡Juega tu primera partida de Reto Relámpago y pon a prueba tu rapidez mental!
              </p>
            </div>
          ) : (
            records.map((rec, index) => (
              <div
                key={rec.id || index}
                className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-3.5 sm:p-4 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black flex items-center justify-center border border-amber-400/30">
                      #{index + 1}
                    </span>
                    <span className="font-black text-lg text-amber-400">
                      {rec.score} pts
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                      {rec.level.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{rec.date}</span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-cyan-400" />
                    {rec.badgeTitle}
                  </span>
                  <span className="text-emerald-400 font-semibold">
                    {rec.accuracy}% ({rec.correctCount}/10)
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 border-t border-slate-700/50 pt-2 mt-1">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-rose-400" />
                    Racha máx: <strong className="text-white">{rec.maxStreak}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    Promedio: <strong className="text-white">{rec.avgTimeSeconds}s</strong>
                  </span>
                  <span className="text-slate-500 truncate ml-auto">
                    {rec.categoryName}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-between items-center gap-2">
          {records.length > 0 && (
            <button
              id="clear-records-btn"
              type="button"
              onClick={() => {
                soundFx.playClick();
                onClearRecords();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 border border-transparent hover:border-rose-900/50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Borrar historial
            </button>
          )}
          <button
            id="records-back-btn"
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="ml-auto py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};
