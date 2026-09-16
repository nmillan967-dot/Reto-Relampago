import React from 'react';
import { X, Check, Globe } from 'lucide-react';
import { Category } from '../types';
import { soundFx } from '../utils/audio';

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

export const CategoriesModal: React.FC<CategoriesModalProps> = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  if (!isOpen) return null;

  const handleSelect = (id: string) => {
    soundFx.playClick();
    onSelectCategory(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              🏷️ Categorías del Reto
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Elige tu tema favorito o juega con todas mezcladas
            </p>
          </div>
          <button
            id="close-categories-btn"
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

        {/* Categories List */}
        <div className="overflow-y-auto my-4 pr-1 flex flex-col gap-2.5">
          {/* Option: All categories */}
          <button
            id="cat-btn-all"
            type="button"
            onClick={() => handleSelect('all')}
            className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left ${
              selectedCategory === 'all'
                ? 'bg-amber-400/15 border-amber-400/50 text-white ring-1 ring-amber-400/40'
                : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shrink-0 text-xl shadow-md">
                <Globe className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <div className="font-bold text-base flex items-center gap-2">
                  Todas las categorías (Aleatorias)
                  {selectedCategory === 'all' && (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-bold">
                      Activa
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  Desafío supremo con preguntas combinadas de todas las disciplinas
                </p>
              </div>
            </div>
            {selectedCategory === 'all' && (
              <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center ml-2 shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            )}
          </button>

          {/* 8 Specific Categories */}
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                type="button"
                onClick={() => handleSelect(cat.id)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left ${
                  isSelected
                    ? 'bg-amber-400/15 border-amber-400/50 text-white ring-1 ring-amber-400/40'
                    : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shrink-0">
                    {cat.emoji}
                  </div>
                  <div>
                    <div className="font-bold text-base flex items-center gap-2">
                      {cat.name}
                      {isSelected && (
                        <span className="text-xs px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-bold">
                          Activa
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{cat.description}</p>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center ml-2 shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800 flex justify-end">
          <button
            id="close-cat-modal-btn"
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-slate-200 text-sm transition-colors text-center"
          >
            Listo, volver al menú
          </button>
        </div>
      </div>
    </div>
  );
};
