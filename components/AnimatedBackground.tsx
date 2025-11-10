import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Theme } from '../types';

const AnimatedBackground: React.FC = () => {
  const { theme } = useTheme();

  // In dark mode, background is #000000, we want light dots.
  // In light mode, background is #f9fafb, we want dark dots.
  const dotColor = theme === Theme.Dark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-[-1] animate-move-bg"
      style={{
        backgroundImage: `radial-gradient(circle at center, ${dotColor} 1px, transparent 1.5px)`,
        backgroundSize: '2rem 2rem', // 32px
      }}
    />
  );
};

export default AnimatedBackground;