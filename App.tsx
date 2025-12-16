import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MONSTERS } from './constants';
import { MonsterCard } from './components/MonsterCard';
import { DetailModal } from './components/DetailModal';
import { Monster } from './types';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  
  // Ref for debounce/throttle
  const lastScrollTime = useRef(0);
  const scrollCooldown = 500; // ms

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % MONSTERS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + MONSTERS.length) % MONSTERS.length);
  }, []);

  // Wheel event handler
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < scrollCooldown) return;

      // Detect prominent scroll direction
      if (Math.abs(e.deltaY) > 20) {
        if (e.deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        lastScrollTime.current = now;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleNext, handlePrev]);

  // Handle Clicking a card
  const handleCardClick = (monster: Monster) => {
    setSelectedMonster(monster);
  };

  const handleCloseModal = () => {
    setSelectedMonster(null);
  };

  return (
    <div className="relative w-full h-screen bg-stone-950 text-stone-100 overflow-hidden selection:bg-amber-900 selection:text-white">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-900 via-stone-950 to-black opacity-80"></div>
        {/* Fog effect using simple CSS pattern */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/foggy-birds.png')] mix-blend-overlay"></div>
      </div>

      {/* Main UI Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between py-8">
        
        {/* Header */}
        <header className="text-center pt-8 animate-[fadeInDown_1s_ease-out]">
          <h1 className="mythos-font text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-amber-400 to-amber-800 drop-shadow-lg tracking-widest uppercase">
            Славянский Хоровод
          </h1>
          <p className="text-font text-stone-400 mt-2 text-lg">
            Крутите колесо, чтобы призвать чудовищ
          </p>
        </header>

        {/* Carousel Container */}
        <main className="flex-1 relative flex items-center justify-center perspective-[1200px] overflow-hidden">
          <div className="relative w-full h-full max-w-6xl flex items-center justify-center transform-style-3d">
            {MONSTERS.map((monster, index) => {
              // Calculate offset relative to current index handling array wrap-around
              let offset = index - currentIndex;
              
              // Adjust offset for infinite loop illusion
              const len = MONSTERS.length;
              if (offset > len / 2) offset -= len;
              if (offset < -len / 2) offset += len;

              return (
                <MonsterCard
                  key={monster.id}
                  monster={monster}
                  isActive={offset === 0}
                  offset={offset}
                  onClick={() => handleCardClick(monster)}
                />
              );
            })}
          </div>
        </main>

        {/* Controls / Footer */}
        <footer className="text-center pb-8 z-20">
           <div className="flex justify-center gap-8 text-stone-500 text-sm uppercase tracking-widest">
             <button onClick={handlePrev} className="hover:text-amber-500 transition-colors flex items-center gap-2 group">
               <span className="group-hover:-translate-x-1 transition-transform">←</span> Назад
             </button>
             <span className="opacity-30">|</span>
             <button onClick={handleNext} className="hover:text-amber-500 transition-colors flex items-center gap-2 group">
               Вперед <span className="group-hover:translate-x-1 transition-transform">→</span>
             </button>
           </div>
        </footer>
      </div>

      {/* Details Modal */}
      <DetailModal 
        monster={selectedMonster}
        isOpen={!!selectedMonster}
        onClose={handleCloseModal}
      />
      
    </div>
  );
};

export default App;