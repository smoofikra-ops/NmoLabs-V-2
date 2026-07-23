import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Percent, ArrowDownRight } from 'lucide-react';

const stats = [
  { id: 1, num: '+300%', title: 'زيادة المبيعات', desc: 'بناء رحلة العميل بالكامل', icon: <TrendingUp className="w-5 h-5" /> },
  { id: 2, num: '8X-26X', title: 'نمو العائد', desc: 'قد يصل العائد لـ 26X', icon: <Percent className="w-5 h-5" /> },
  { id: 3, num: '-40%', title: 'تقليل المرتجعات', desc: 'تحليل دقيق وتوضيح صح', icon: <ArrowDownRight className="w-5 h-5" /> }
];

export const InteractiveStatsCard = () => {
  // A 2x2 grid has 4 positions: 0(top-left), 1(top-right), 2(bottom-left), 3(bottom-right)
  // We have 3 items. One spot is empty.
  // Initial state: positions of items 1, 2, 3 (indices 0, 1, 2)
  const [positions, setPositions] = useState([0, 1, 2]); // Empty is 3

  const getCoordinates = (pos: number) => {
    // Return relative coordinates in the container for absolute positioning
    // 0: top-left (or top-right in RTL, let's just use percentage from top/right)
    const isRtl = document.documentElement.dir !== 'ltr';
    const xPos = pos % 2 === 0 ? 0 : 50; // 0 or 50%
    const yPos = pos < 2 ? 0 : 50; // 0 or 50%
    
    return {
      top: `${yPos}%`,
      [isRtl ? 'right' : 'left']: `${xPos}%`,
    };
  };

  const handleHover = (index: number) => {
    const currentPos = positions[index];
    // Find the empty position
    const occupied = new Set(positions);
    let emptyPos = 0;
    for (let i = 0; i < 4; i++) {
      if (!occupied.has(i)) {
        emptyPos = i;
        break;
      }
    }

    // Move hovered item to empty position
    setPositions(prev => {
      const newPos = [...prev];
      newPos[index] = emptyPos;
      return newPos;
    });
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[450px] sm:h-[400px] md:h-[450px] bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl overflow-hidden glass-card p-4 sm:p-8">
      <div className="absolute top-4 right-6 sm:top-6 sm:right-8 z-0 opacity-20 pointer-events-none">
        <h3 className="text-4xl sm:text-6xl font-black text-[var(--color-primary)]">النتائج</h3>
      </div>
      
      {/* 2x2 Grid Container */}
      <div className="relative w-full h-[300px] sm:h-[320px] mt-12 mx-auto">
        {stats.map((stat, i) => {
          const coords = getCoordinates(positions[i]);
          return (
            <motion.div
              key={stat.id}
              animate={{ 
                top: coords.top, 
                right: coords.right,
                left: coords.left
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onMouseEnter={() => handleHover(i)}
              className="absolute w-[48%] h-[48%] p-3 sm:p-5 bg-[var(--surface-primary)] border border-[var(--border-hover)] rounded-2xl sm:rounded-3xl shadow-lg cursor-crosshair flex flex-col justify-center gap-1 sm:gap-2 group hover:shadow-[0_0_20px_rgba(79,142,247,0.3)] hover:border-[var(--color-primary)] transition-colors"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] font-english drop-shadow-sm">
                {stat.num}
              </div>
              <div className="font-bold text-[var(--text-primary)] text-sm sm:text-base leading-tight">
                {stat.title}
              </div>
              <div className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed hidden sm:block">
                {stat.desc}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-[var(--text-muted)] bg-[var(--surface-primary)]/80 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
        مرر الماوس للتفاعل
      </div>
    </div>
  );
};
