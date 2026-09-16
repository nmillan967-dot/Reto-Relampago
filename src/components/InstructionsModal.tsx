import React from 'react';
import { X, Clock, Zap, Flame, Lightbulb, ShieldCheck, Award } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartNow: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
  onStartNow,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              📖 Reglas e Instrucciones
            </h2>
            <p className="text-xs sm:text-sm text-cyan-400">
              ¡Aprende a dominar el Reto Relámpago!
            </p>
          </div>
          <button
            id="close-instructions-btn"
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
        <div className="overflow-y-auto my-4 pr-1 flex flex-col gap-3 text-sm text-slate-300">
          <div className="bg-slate-800/60 border border-slate-700/70 p-3.5 rounded-2xl flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block font-bold mb-0.5">15 Segundos por Pregunta</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cada partida consta de 10 preguntas. El reloj corre desde 15 segundos hacia abajo. Si se acaba el tiempo, se marca como tiempo agotado y verás la respuesta correcta.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/70 p-3.5 rounded-2xl flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block font-bold mb-0.5">Puntuación y Bono por Rapidez</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cada respuesta correcta te otorga <span className="text-amber-400 font-bold">100 puntos base</span>. Además, recibes <span className="text-amber-400 font-bold">+10 puntos extra</span> por cada segundo restante en el reloj. ¡Pensar rápido vale más!
              </p>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/70 p-3.5 rounded-2xl flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block font-bold mb-0.5">Rachas Imparables y Multiplicadores</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                Responde sin equivocarte para acumular racha. Obtienes un bono especial al alcanzar <span className="text-rose-400 font-bold">3 aciertos seguidos (+50 pts)</span> y una súper bonificación al llegar a <span className="text-rose-400 font-bold">5 aciertos seguidos (+100 pts)</span>.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/70 p-3.5 rounded-2xl flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block font-bold mb-0.5">Explicaciones Educativas Inmediatas</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tras cada pregunta, aprenderás el fundamento científico, histórico o práctico de la respuesta con una breve cápsula explicativa.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/70 p-3.5 rounded-2xl flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block font-bold mb-0.5">Rangos de Clasificación Final</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                Al terminar las 10 preguntas recibirás una evaluación de tu desempeño:
                <br />• 90% a 100%: <strong>¡MENTE BRILLANTE! ⚡🧠</strong>
                <br />• 70% a 89%: <strong>¡GRAN RETADOR! 🚀</strong>
                <br />• 50% a 69%: <strong>¡VAS POR BUEN CAMINO! ⭐</strong>
                <br />• Menos de 50%: <strong>¡SIGUE ENTRENANDO TU MENTE! 💪</strong>
              </p>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/70 p-3.5 rounded-2xl flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block font-bold mb-0.5">100% Seguro y Autónomo</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                No recopila datos personales, no requiere registro ni conexión a internet tras ser descargado.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex gap-2">
          <button
            id="modal-play-btn"
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
              onStartNow();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-colors text-center"
          >
            ¡ENTENDIDO, A JUGAR!
          </button>
          <button
            id="modal-close-btn"
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};
