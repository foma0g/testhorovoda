import React from 'react';
import { Monster } from '../types';

interface DetailModalProps {
  monster: Monster | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ monster, isOpen, onClose }) => {
  if (!isOpen || !monster) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>

      <div className="relative z-10 w-full max-w-2xl bg-stone-900 border border-stone-600 rounded-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-[fadeIn_0.3s_ease-out]">
        
        <div className="p-6 border-b border-stone-700 flex justify-between items-center bg-stone-950">
          <div>
            <h2 className="mythos-font text-3xl text-amber-500">{monster.name}</h2>
            <p className="text-stone-400 text-sm uppercase tracking-widest mt-1">{monster.element} • {monster.role}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar text-font text-lg md:text-xl leading-relaxed text-stone-200">
          
          <div className="mb-8 p-4 bg-stone-800/50 rounded border-l-4 border-amber-700 italic">
            {monster.shortDescription}
          </div>

          <div className="prose prose-invert prose-amber max-w-none">
            {monster.legend.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-justify">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-stone-800 bg-stone-950 text-center text-xs text-stone-500">
          Легенда из архивов Фомушки
        </div>
      </div>
    </div>
  );
};
