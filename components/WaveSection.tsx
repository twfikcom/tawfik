import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

interface WaveSectionProps {
  children: React.ReactNode;
  className?: string;
  waveClass: string;
}

const WaveSection = forwardRef<HTMLDivElement, WaveSectionProps>(({ children, className = '', waveClass }, ref) => {
  const internalRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => internalRef.current!);

  // Fix: Changed ref type from SVGPathElement to SVGUseElement to match the <use> element.
  const path1Ref = useRef<SVGUseElement>(null);
  // Fix: Changed ref type from SVGPathElement to SVGUseElement to match the <use> element.
  const path2Ref = useRef<SVGUseElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
        if (!internalRef.current || !path1Ref.current || !path2Ref.current) return;

        const { top, height } = internalRef.current.getBoundingClientRect();
        const screenHeight = window.innerHeight;
        
        // Check if the section is in the viewport
        if (top < screenHeight && top + height > 0) {
            const scrollPercent = (screenHeight - top) / (screenHeight + height);
            const parallaxOffset1 = (scrollPercent - 0.5) * 100; // -50 to 50
            const parallaxOffset2 = (scrollPercent - 0.5) * -150; // 75 to -75
            
            path1Ref.current.style.transform = `translateX(${parallaxOffset1}px)`;
            path2Ref.current.style.transform = `translateX(${parallaxOffset2}px)`;
        }
    };

    const animationFrame = () => {
        handleScroll();
        requestAnimationFrame(animationFrame);
    };

    const animId = requestAnimationFrame(animationFrame);

    return () => {
        cancelAnimationFrame(animId);
    };

  }, []);

  return (
    <section ref={internalRef} className={`relative ${className}`}>
      {children}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 h-[100px] md:h-[150px]">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-[200%] left-[-50%] h-full">
            <defs>
                <path id="wavePath" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,176C960,171,1056,213,1152,224C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </defs>
            <g className={waveClass}>
                <use ref={path1Ref} href="#wavePath" x="50" y="3" opacity="0.5"></use>
                <use ref={path2Ref} href="#wavePath" x="50" y="5" opacity="0.3"></use>
                <use href="#wavePath" x="50" y="0"></use>
            </g>
        </svg>
      </div>
    </section>
  );
});

export default WaveSection;
