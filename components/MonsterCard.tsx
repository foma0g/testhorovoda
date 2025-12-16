import React from 'react';
import { Monster } from '../types';

interface MonsterCardProps {
  monster: Monster;
  isActive: boolean;
  offset: number;
  onClick: () => void;
}

export const MonsterCard: React.FC<MonsterCardProps> = ({ monster, isActive, offset, onClick }) => {
  // 3D positioning logic
  const isVisible = Math.abs(offset) <= 1;
  
  let transformStyle = '';
  let zIndex = 0;
  let opacity = 0;
  let blur = '0px';

  if (offset === 0) {
    transformStyle = 'translateX(0%) scale(1) translateZ(0px)';
    zIndex = 30;
    opacity = 1;
  } else if (offset === -1) {
    transformStyle = 'translateX(-110%) scale(0.85) translateZ(-100px) rotateY(15deg)';
    zIndex = 20;
    opacity = 0.6;
    blur = '2px';
  } else if (offset === 1) {
    transformStyle = 'translateX(110%) scale(0.85) translateZ(-100px) rotateY(-15deg)';
    zIndex = 20;
    opacity = 0.6;
    blur = '2px';
  } else {
    transformStyle = `translateX(${offset * 100}%) scale(0.5)`;
    zIndex = 10;
    opacity = 0;
  }

  return (
    <div
      className={`absolute top-1/2 left-1/2 w-[300px] md:w-[400px] h-[500px] md:h-[600px] -ml-[150px] md:-ml-[200px] -mt-[250px] md:-mt-[300px] transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer`}
      style={{
        transform: transformStyle,
        zIndex: zIndex,
        opacity: opacity,
        filter: `blur(${blur})`,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      onClick={offset === 0 ? onClick : undefined}
    >
      <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-stone-600 bg-stone-900 group ${isActive ? 'ring-2 ring-amber-600' : ''}`}>
        
        <div className="absolute inset-0 bg-black">
          <img 
            src={monster.imageUrl} 
            alt={monster.name} 
            loading="lazy"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700 filter sepia-[0.1] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-90"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h2 className="mythos-font text-3xl md:text-5xl text-amber-500 mb-2 drop-shadow-md tracking-wider">
            {monster.name}
          </h2>
          <p className="text-stone-300 text-font text-lg italic mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {monster.role}
          </p>
          
          {isActive && (
             <div className="mt-4 inline-block px-4 py-2 border border-amber-500/50 rounded-full text-amber-200 text-sm tracking-widest uppercase hover:bg-amber-900/30 transition-colors animate-pulse">
               Нажми, чтобы узнать легенду
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
