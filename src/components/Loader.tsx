import React, { useState, useEffect } from 'react';
import { TwfikLogo } from './icons';

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!loading) {
      // Wait for the fade-out animation to complete before removing from DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-bg transition-opacity duration-500 ${!loading ? 'animate-fade-out' : 'opacity-100'}`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2 rtl:space-x-reverse animate-loader-glow">
            <TwfikLogo className="text-primary w-12 h-12"/>
            <span className="text-4xl font-bold text-white">TWFIK</span>
        </div>
        <div 
          className="mt-8 w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"
          role="status"
          aria-label="Loading..."
        ></div>
      </div>
    </div>
  );
};

export default Loader;